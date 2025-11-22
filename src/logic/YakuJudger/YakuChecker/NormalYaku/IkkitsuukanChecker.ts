import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import type { Suit, YakuCheckResult } from "@/types";

export class IkkitsuukanChecker {
	public check(parsedHand: ParsedHand): YakuCheckResult {
		const shuntsuList = parsedHand.mentsuList.filter(
			(mentsu) => mentsu.type === "shuntsu",
		);
		if (shuntsuList.length < 3) return null;

		const suitMap = new Map<string, Set<string>>();

		for (const shuntsu of shuntsuList) {
			const tile = shuntsu.tiles[0];
			const rank = tile.charAt(0);
			const suit = tile.charAt(1) as Suit;

			if (!suitMap.has(suit)) {
				suitMap.set(suit, new Set());
			}
			suitMap.get(suit)?.add(rank);
		}

		for (const ranks of suitMap.values()) {
			if (ranks.has("1") && ranks.has("4") && ranks.has("7")) {
				return YAKU_LIST.IKKITSUUKAN;
			}
		}

		return null;
	}
}
