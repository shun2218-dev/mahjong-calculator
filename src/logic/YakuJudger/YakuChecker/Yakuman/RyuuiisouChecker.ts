import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { Hand } from "@/logic/Hand/Hand";
import type { YakuCheckResult } from "@/types";

export class RyuuiisouChecker {
    public check(hand: Hand): YakuCheckResult {       
        const greenTiles = new Set(["2s", "3s", "4s", "6s", "8s", "hatsu"]);

        return hand.allTiles.every(tile => greenTiles.has(tile)) ? YAKU_LIST.RYUUIISOU : null;
    }
}