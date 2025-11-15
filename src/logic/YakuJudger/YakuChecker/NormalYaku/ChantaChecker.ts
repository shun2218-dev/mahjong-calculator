import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { Mentsu } from "@/logic/Mentsu/Mentsu";
import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import type { YakuCheckResult } from "@/types";
import { isRoutouhai, isYaochuuhai } from "@/utils/helper";

export class ChantaChecker {
    public checkChanta(parsedHand: ParsedHand): YakuCheckResult {
        if (!isYaochuuhai(parsedHand.janto[0])) return null;

        const allMentsuHasYaochuuhai = parsedHand.mentsuList.every(mentsu => this.mentsuHasYaochuuhai(mentsu));
        if (!allMentsuHasYaochuuhai) return null;

        const hasShuntsu = parsedHand.mentsuList.some(mentsu => mentsu.type === "shuntsu");
        if (!hasShuntsu) return null;

        return YAKU_LIST.HONCHANTAIYAOCHUU;
    }

    public checkJyunchan(parsedHand: ParsedHand): YakuCheckResult {
        if (!isRoutouhai(parsedHand.janto[0])) return null;

        const allMentsuHasRoutouhai = parsedHand.mentsuList.every(mentsu => this.mentsuHasRoutouhai(mentsu));
        if (!allMentsuHasRoutouhai) return null;

        const hasShuntsu = parsedHand.mentsuList.some(mentsu => mentsu.type === "shuntsu");
        if (!hasShuntsu) return null;

        return YAKU_LIST.JYUNCHANTAIYAOCHUU;
    }

    private mentsuHasYaochuuhai(mentsu: Mentsu): boolean {
        const tile = mentsu.tiles[0];

        if (mentsu.type !== "shuntsu") {
            return isYaochuuhai(tile);
        }

        const rank = tile.charAt(0);
        return rank === "1" || rank === "7";
    }

    private mentsuHasRoutouhai(mentsu: Mentsu): boolean {        
        const tile = mentsu.tiles[0];

        if (mentsu.type !== "shuntsu") {
            return isRoutouhai(tile);
        }

        const rank = tile.charAt(0);
        return rank === "1" || rank === "7";
    }
}