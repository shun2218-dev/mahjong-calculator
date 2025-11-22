import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { Hand } from "@/logic/Hand/Hand";
import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import type { YakuCheckResult } from "@/types";
import { countShuntsu } from "@/utils/helper";

export class RyanpeikouChecker {
	public check(parsedHand: ParsedHand, hand: Hand): YakuCheckResult {
		if (!hand.isMenzen) return null;

		if (parsedHand.agariForm !== "standard") return null;

		const shuntsuCounts = countShuntsu(parsedHand.mentsuList);

		const pairs = Array.from(shuntsuCounts.values()).filter(
			(count) => count >= 2,
		);

		if (pairs.length === 2 && pairs.every((pair) => pair === 2))
			return YAKU_LIST.RYANPEIKOU;

		return null;
	}
}
