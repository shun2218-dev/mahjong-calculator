import type { Hand } from "@/logic/Hand/Hand";
import type { Suit, Tile } from "@/types";
import { isJihai } from "@/utils/helper";

interface ChuurenpoutouResult {
    isChuurenpoutou: boolean;
    isJyunsei: boolean;
}

export class ChuurenpoutouChecker {
    public check(hand: Hand): ChuurenpoutouResult {
        const fail = { isChuurenpoutou: false, isJyunsei: false };

        if (!hand.isMenzen) return fail;

        const tiles = hand.allTiles;
        const firstTile = tiles[0];
        if (isJihai(firstTile)) return fail;

        const suit = firstTile.charAt(1) as Suit;
        if (!tiles.every(tile => !isJihai(tile) && tile.charAt(1) === suit)) return fail;

        const counts = this.getCountForSuit(tiles, suit);

        const isChuurenShape = 
            (counts[1] >= 3) &&
            (counts[9] >= 3) &&
            (counts[2] >= 1) &&        
            (counts[3] >= 1) &&        
            (counts[4] >= 1) &&        
            (counts[5] >= 1) &&        
            (counts[6] >= 1) &&        
            (counts[7] >= 1) &&        
            (counts[8] >= 1);
        
        if (!isChuurenShape) return fail;
        
        const agariNum = parseInt(hand.agariHai.charAt(0));

        counts[agariNum]--;

        const isJyunsei = this.isJyunseiChuurenShape(counts);

        return { isChuurenpoutou: true, isJyunsei }
    }    
    
    private getCountForSuit(tiles: Tile[], suit: Suit): number[] {
        const counts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (const tile of tiles) {
            if (tile.charAt(1) === suit) {
                const num = parseInt(tile.charAt(0));
                counts[num]++;
            }
        }
        return counts;
    }
    
    private isJyunseiChuurenShape(counts: number[]): boolean {
        return (
            (counts[1] === 3) && (counts[9] === 3) &&
            (counts[2] === 1) && (counts[3] === 1) && (counts[4] === 1) &&
            (counts[5] === 1) && (counts[6] === 1) && (counts[7] === 1) &&
            (counts[8] === 1)
        )
    }
}