import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { Hand } from "@/logic/Hand/Hand";
import type { YakuCheckResult } from "@/types";
import { isRoutouhai } from "@/utils/helper";

export class ChinroutouChecker {
    public check(hand: Hand): YakuCheckResult {
        return hand.allTiles.every(tile => isRoutouhai(tile)) ? YAKU_LIST.CHINROUTOU : null;
    }    
}