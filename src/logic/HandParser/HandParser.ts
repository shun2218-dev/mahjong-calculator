import { type FuuroMeld, type MachiType, type TehaiCounts, type Tile } from "@/types";
import type { Hand } from "@/logic/Hand/Hand";
import { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { YAOCHUHAI } from "@/const/TILE_TYPE";

type KokushiCheckResult = {
    isKokushi: boolean;
    is13MenMachi: boolean;
}

type ChitoitsuCheckResult = {
    isChitoitsu: boolean;
    pairs?: Tile[][];
}

type StandardCheckResult = {
    mentsuList: Mentsu[];
    janto: Tile[];
}

export class HandParser {
    public parse(hand: Hand): ParsedHand | Error {
        const tehai = hand.tehai;
        const agariHai = hand.agariHai;
        
        const tehaiCounts = this.convertHandToCounts(tehai);
        const allTiles = this.convertHandToCounts(hand.allTiles);
        
        const kokushiResult = this.checkKokushi(allTiles, agariHai);
        if (kokushiResult.isKokushi) {
            return ParsedHand.createKokushi(kokushiResult.is13MenMachi)
        }

        const chitoitsuResult = this.checkChitoitsu(tehaiCounts, agariHai);
        if (chitoitsuResult.isChitoitsu && chitoitsuResult.pairs) {
            return ParsedHand.createChitoitsu(chitoitsuResult.pairs);
        }

        const menzenCounts = hand.tehaiCounts
        if (hand.agariType === "ron") {
            menzenCounts.set(agariHai, (menzenCounts.get(agariHai) ?? 0) + 1);
        }

        const standardResult = this.checkStandard(menzenCounts, hand.fuuro);
        if (standardResult !== null) {
            const fuuroAsMentsu = hand.fuuro.map(meld => {
                const type = meld.type === "chi"
                    ? "shuntsu"
                    : (meld.type === "ankan" || meld.type === "minkan" ? "kantsu" : "koutsu");

                return new Mentsu(type, meld.tiles, meld.type === "ankan");
            });

            const allMentsu = [...standardResult.mentsuList, ...fuuroAsMentsu];

            allMentsu.sort((a, b) => {
                if (a.tiles[0] < b.tiles[0]) return -1;
                if (a.tiles[0] > b.tiles[0]) return 1;
                return 0;
            });

            const machiType = this.determineMachiType(standardResult, hand.fuuro, agariHai)

            return ParsedHand.createStandard(
                allMentsu,
                standardResult.janto,
                machiType
            );
        }

        return new Error("アガリ形ではありません");
    }

    private convertHandToCounts(tehai: Tile[]): TehaiCounts {
        const counts = new Map<Tile, number>();
        for (const tile of tehai) {
            counts.set(tile, (counts.get(tile) ?? 0) + 1);
        }
        return counts;    
    }

    private checkKokushi(allTileCounts: TehaiCounts, agariHai: Tile): KokushiCheckResult {
        const kokushiTiles: Tile[] = [...YAOCHUHAI];

        // Check if any tile not in kokushiTiles is present
        const kokushiTileSet = new Set<Readonly<Tile>>(YAOCHUHAI);
        for (const [tile, count] of allTileCounts.entries()) {
            if (count > 0 && !kokushiTileSet.has(tile)) {
                return { isKokushi: false, is13MenMachi: false };
            }
        }

        let pairTile: Tile | null = null;
        for (const tile of kokushiTiles) {
            const count = allTileCounts.get(tile) ?? 0;

            if (count === 0) {
                return { isKokushi: false, is13MenMachi: false };            
            }

            if (count > 2) {
                return { isKokushi: false, is13MenMachi: false };
            }

            if (count === 2) {
                if (pairTile !== null) {
                    return { isKokushi: false, is13MenMachi: false };                
                }
                pairTile = tile;
            }
        }

        if (pairTile === null) {
            return { isKokushi: false, is13MenMachi: false };
        }

        const is13Men = (pairTile === agariHai);
        
        return { isKokushi: true, is13MenMachi: is13Men };
    }

    private checkChitoitsu(tehaiCounts: TehaiCounts, agariHai: Tile): ChitoitsuCheckResult {
        let pairCount = 0;
        const pairs: Tile[][] = [];
        for (const [tile, count] of tehaiCounts.entries()) {
            if (count === 2) {
                pairCount++;
                pairs.push([tile, tile]);
                continue;
            }
            if (count === 1 && tile === agariHai) {
                pairCount++;
                pairs.push([tile, tile]);
            }

            return { isChitoitsu: false, pairs: undefined  };
        }

        return { isChitoitsu: pairCount === 7, pairs };
    }

    private checkStandard(tehaiCounts: TehaiCounts, fuuroList: FuuroMeld[]): StandardCheckResult | null {
        const jantoCandidates: Tile[] = [];        

        for (const [tile, count] of tehaiCounts.entries()) {
            if (count >= 2) {
                jantoCandidates.push(tile);
            }
        }

        for (const candidate of jantoCandidates) {
            const countsCopy = new Map(tehaiCounts);
            countsCopy.set(candidate, (countsCopy.get(candidate) ?? 0) - 2);


            const mentsuResult = this.findMentsuRecursive(countsCopy, 4 - fuuroList.length);

            if (mentsuResult !== null) {
                return {
                    mentsuList: mentsuResult,
                    janto: [candidate, candidate]
                };
            }
        }

        return null;
    }

    private findMentsuRecursive(tehaiCounts: TehaiCounts, mentsuNeeded: number): Mentsu[] | null {
        // Base case: all mentsu found
        if (mentsuNeeded === 0) {
            for (const count of tehaiCounts.values()) {
                if (count !== 0) {
                    return null;
                }
            }
            return [];
        }
        
        // Find the first tile with a count greater than 0
        let firstTile: Tile | null = null;
        for (const [tile, count] of tehaiCounts.entries()) {
            if (count > 0) {
                firstTile = tile;
                break;
            }
        }
        if (!firstTile) {
            return null;
        }

        // Try to form a mentsu
        // Try to create kotsu
        const koutsuCount = tehaiCounts.get(firstTile) ?? 0;
        if (koutsuCount >= 3) {
            tehaiCounts.set(firstTile, koutsuCount - 3);
            const kotsu = new Mentsu("koutsu", [firstTile, firstTile, firstTile], true);
            const result = this.findMentsuRecursive(tehaiCounts, mentsuNeeded - 1)
            if (result !== null) {
                return [kotsu, ...result];
            }
            // Backtrack
            const countAfterTry = tehaiCounts.get(firstTile) ?? 0;            
            tehaiCounts.set(firstTile, countAfterTry + 3);
        }
        // Try to create shuntsu        
        const suit = firstTile.charAt(1);
        if (suit === "m" || suit === "p" || suit === "s") {
            const rank = parseInt(firstTile.charAt(0));
            if (rank > 7) {
                return null;                
            }
            const secondTile = `${rank + 1}${suit}` as Tile;
            const thirdTile = `${rank + 2}${suit}` as Tile;
            if (tehaiCounts.get(secondTile) !== undefined && tehaiCounts.get(thirdTile) !== undefined) {
                const secondCount = tehaiCounts.get(secondTile) ?? 0;
                const thirdCount = tehaiCounts.get(thirdTile) ?? 0;
                if ((tehaiCounts.get(firstTile) ?? 0) > 0 && secondCount > 0 && thirdCount > 0) {
                    // Form a shuntsu
                    tehaiCounts.set(firstTile, (tehaiCounts.get(firstTile) ?? 0) - 1);
                    tehaiCounts.set(secondTile, secondCount - 1);
                    tehaiCounts.set(thirdTile, thirdCount - 1);
                    const result = this.findMentsuRecursive(tehaiCounts, mentsuNeeded - 1);
                    if (result !== null) {
                        return [new Mentsu("shuntsu", [firstTile, secondTile, thirdTile], true), ...result];
                    }
                    // Backtrack
                    tehaiCounts.set(firstTile, (tehaiCounts.get(firstTile) ?? 0) + 1);
                    tehaiCounts.set(secondTile, (tehaiCounts.get(secondTile) ?? 0) + 1);
                    tehaiCounts.set(thirdTile, (tehaiCounts.get(thirdTile) ?? 0) + 1);
                }
            }
        }
        return null;
    }

    // Determine machi type based on mentsuList and janto
    private determineMachiType(standardResult: StandardCheckResult, fuuroList: FuuroMeld[], agariHai: Tile): MachiType {
        try {            
            const allMentsu = [...standardResult.mentsuList];
            for (const fuuro of fuuroList) {
                allMentsu.push(new Mentsu(
                    fuuro.type === "chi" ? "shuntsu" : (fuuro.tiles.length === 4 ? "kantsu" : "koutsu"),
                    fuuro.tiles,
                    fuuro.type === "ankan"
                ));
            }
            // Check for tanki
            const janto = standardResult.janto;
            if (agariHai === janto[0]) {
                return "tanki";
            }

            // Check for shanpon
            const koutsuMentsu = allMentsu.filter(mentsu => mentsu.type === "koutsu" || mentsu.type === "kantsu");
            const agariKoutsu = koutsuMentsu.find(mentsu => mentsu.tiles.includes(agariHai));
            if (agariKoutsu) {
                return "shanpon";
            }

            // Logic for shuntsu
            const shuntsuMentsu = allMentsu.filter(mentsu => mentsu.type === "shuntsu");
            const agariShuntsu = shuntsuMentsu.find(mentsu => mentsu.tiles.includes(agariHai));
            if (agariShuntsu === undefined) throw new Error("待ちタイプが正しくないです");

            // Sublogic for determining where Shuntsu wins

            // Check for kanchan
            const agariNum = parseInt(agariHai.charAt(0));
            const firstTile = agariShuntsu.tiles[0];
            const firstNum = parseInt(firstTile.charAt(0));
            if (agariNum === (firstNum + 1)) return "kanchan";

            // Check for penchan
            if (firstNum === 1 && agariNum === 3) return "penchan";
            if (firstNum === 7 && agariNum === 7) return "penchan";

            // Check for ryanmen
            return "ryanmen";
        } catch(e: unknown) {
            throw new Error("待ちタイプが正しくないです");
        }
    }
}