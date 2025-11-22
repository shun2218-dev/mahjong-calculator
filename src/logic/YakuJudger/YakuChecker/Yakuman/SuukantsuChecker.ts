import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import type { YakuCheckResult } from "@/types";

export class SuukantsuChecker {
	public check(parsedHand: ParsedHand): YakuCheckResult {
		if (parsedHand.agariForm !== "standard") return null;

		const kantsuCount = parsedHand.mentsuList.filter(
			(mentsu) => mentsu.type === "kantsu",
		);

		return kantsuCount.length === 4 ? YAKU_LIST.SUUKANTSU : null;
	}
}
