import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { Hand } from "@/logic/Hand/Hand";
import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import type { Kazehai, Tile, Yaku } from "@/types";
import { isJihai, isKazehai } from "@/utils/helper";

export class PinfuChecker {
    public check(parsedHand: ParsedHand, hand: Hand): YakuCheckResult {
        if (!hand.isMenzen) return null;
        
        if (parsedHand.agariForm !== "standard") return null;

        if (parsedHand.machiType !== "ryanmen") return null;

        const isAllShuntsu = parsedHand.mentsuList.every(mentsu => mentsu.type === "shuntsu");
        if (!isAllShuntsu) return null;

        const jantoTile = parsedHand.janto[0];
        if (
            this.isJantoYakuhai(
                jantoTile,
                hand.status.bakaze,
                hand.status.jikaze
            )
        ) {
            return null;
        }

        return YAKU_LIST.PINFU;
    }

    private isJantoYakuhai(jantoTile: Tile, bakaze: Kazehai, jikaze: Kazehai) {
        if (isJihai(jantoTile) && !isKazehai(jantoTile)) return true;

        if (jantoTile === bakaze || jantoTile === jikaze) return true;

        return false;
    }
}