import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { Hand } from "@/logic/Hand/Hand";
import type { YakuCheckResult } from "@/types";
import { isJihai } from "@/utils/helper";

export class TsuuiisouChecker {
    public check(hand: Hand): YakuCheckResult {
        return hand.allTiles.every(tile => isJihai(tile)) ? YAKU_LIST.TSUUIISOU : null;
    }
}