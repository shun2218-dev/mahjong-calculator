import { SANGENPAI_SET, YAOCHUHAI_SET } from "@/const/TILE_TYPE";
import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { Hand } from "@/logic/Hand/Hand";
import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import type { Tile, Yaku, YakuCheckResult } from "@/types";

export class FormYakuChecker {
    private readonly SANGENPAI_DATA: [Tile, Yaku][] = [
        ["haku", YAKU_LIST.YAKUHAI_HAKU],
        ["hatsu", YAKU_LIST.YAKUHAI_HATSU],
        ["chun", YAKU_LIST.YAKUHAI_CHUN]
    ]
    private readonly SANGENPAI_MAP: Map<Tile,  Yaku> = new Map(this.SANGENPAI_DATA);

    public checkTanyao(hand: Hand): YakuCheckResult {
        const hasYaochuuhai = hand.allTiles.some(tile => YAOCHUHAI_SET.has(tile))
        if (hasYaochuuhai) return null;

        return YAKU_LIST.TANYAOCHUU;
    }

    public checkYakuhai(parsedHand: ParsedHand, hand: Hand): Yaku[] {
        const yakuList: Yaku[] = [];

        const jikaze = hand.status.jikaze;
        const bakaze = hand.status.bakaze;
        const allKoutsu = parsedHand.mentsuList.filter(mentsu => mentsu.type === "koutsu" || mentsu.type === "kantsu");        

        for (const koutsu of allKoutsu) {
            const tile = koutsu.tiles[0];

            if (this.SANGENPAI_MAP.has(tile)) {
                yakuList.push(this.SANGENPAI_MAP.get(tile)!);
                continue;
            }
            
            if (tile === bakaze) {
                yakuList.push(YAKU_LIST.YAKUHAI_BAKAZE);
            }

            if (tile === jikaze) {
                yakuList.push(YAKU_LIST.YAKUHAI_JIKAZE);
            }
        }

        return yakuList
    }

    public checkToitoi(parsedHand: ParsedHand): YakuCheckResult {
        const koutsuCount = parsedHand.mentsuList.filter(mentsu => mentsu.type === "koutsu" || mentsu.type === "kantsu").length;
        
        return koutsuCount === 4 ? YAKU_LIST.TOITOIHOU : null;
    }

    public checkSanankou(parsedHand: ParsedHand): YakuCheckResult {
        const ankouCount = parsedHand.mentsuList.filter(mentsu => (mentsu.type === "koutsu" || mentsu.type === "kantsu") && mentsu.isAnkou).length;

        return ankouCount === 3 ? YAKU_LIST.SANANKOU : null;    
    }

    public checkShousangen(parsedHand: ParsedHand): YakuCheckResult {
        const janto = parsedHand.janto[0];

        if (!SANGENPAI_SET.has(janto)) return null;

        const sangenKoutsuCount = parsedHand.mentsuList.filter(mentsu => {
            const tile = mentsu.tiles[0];
            return (
                (mentsu.type === "koutsu" || mentsu.type === "kantsu") &&
                SANGENPAI_SET.has(tile)
            )
        }).length;

        return sangenKoutsuCount === 2 ? YAKU_LIST.SHOUSANGEN : null;
    }
}