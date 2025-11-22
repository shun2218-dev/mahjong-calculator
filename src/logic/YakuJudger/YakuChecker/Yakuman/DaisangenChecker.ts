import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import type { YakuCheckResult } from "@/types";
import { isKoutsuOf } from "@/utils/helper";

export class DaisangenChecker {
	public check(parsedHand: ParsedHand): YakuCheckResult {
		if (parsedHand.agariForm !== "standard") return null;

		const allMentsu = parsedHand.mentsuList;
		const hasHaku = allMentsu.some((mentsu) => isKoutsuOf(mentsu, "haku"));
		const hasHatsu = allMentsu.some((mentsu) => isKoutsuOf(mentsu, "hatsu"));
		const hasChun = allMentsu.some((mentsu) => isKoutsuOf(mentsu, "chun"));

		return hasHaku && hasHatsu && hasChun ? YAKU_LIST.DAISANGEN : null;
	}
}
