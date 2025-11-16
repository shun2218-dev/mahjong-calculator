import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { Hand } from "@/logic/Hand/Hand";
import type { Suit, YakuCheckResult } from "@/types"
import { isJihai, isRoutouhai, isYaochuuhai } from "@/utils/helper";

type SuitAnalysis = {
    suits: Set<Suit>;
    hasJihai: boolean;
}

export class SuitAndTerminalChecker {
    public checkHonitsu(hand: Hand): YakuCheckResult {
        const analysis = this.analyzeSuits(hand);
        if (analysis.hasJihai && analysis.suits.size === 1) return YAKU_LIST.HONITSU;

        return null;
    }

    public checkChinitsu(hand: Hand): YakuCheckResult {
        const analysis = this.analyzeSuits(hand);
        if (!analysis.hasJihai && analysis.suits.size === 1) return YAKU_LIST.CHINITSU;

        return null;
    }

    public checkHonroutou(hand: Hand): YakuCheckResult {
        const tiles = hand.allTiles;

        const isAllYaochuuhai = tiles.every(tile => isYaochuuhai(tile));
        if (!isAllYaochuuhai) return null;

        const hasJihai = tiles.some(tile => isJihai(tile));

        const hasRoutouhai = tiles.some(tile => isRoutouhai(tile));

        if (hasJihai && hasRoutouhai) return YAKU_LIST.HONROUTOU;

        return null;
    }

    private analyzeSuits(hand: Hand): SuitAnalysis {
        const suits = new Set<Suit>();
        let hasJihai = false;

        for (const tile of hand.allTiles) {
            if (isJihai(tile)) {
                hasJihai = true;
            } else {
                suits.add(tile.charAt(1) as Suit);
            }
        }

        return { suits, hasJihai }
    }
}