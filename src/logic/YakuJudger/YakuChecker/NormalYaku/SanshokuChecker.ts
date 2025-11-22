import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import type { Suit } from "@/types";
import { isJihai } from "@/utils/helper";

export class SanshokuChecker {
	public checkDoujyun(parsedHand: ParsedHand) {
		const shuntsuList = parsedHand.mentsuList.filter(
			(mentsu) => mentsu.type === "shuntsu",
		);
		if (shuntsuList.length < 3) return null;

		const shuntsuMap = new Map<string, Set<string>>();

		for (const shuntsu of shuntsuList) {
			const tile = shuntsu.tiles[0];
			const rank = tile.charAt(0);
			const suit = tile.charAt(1) as Suit;

			if (!shuntsuMap.has(rank)) {
				shuntsuMap.set(rank, new Set());
			}
			shuntsuMap.get(rank)?.add(suit);
		}

		for (const suits of shuntsuMap.values()) {
			if (suits.size === 3) {
				return YAKU_LIST.SANSHOKUDOUJYUN;
			}
		}

		return null;
	}

	public checkDoukou(parsedHand: ParsedHand) {
		const koutsuList = parsedHand.mentsuList.filter(
			(mentsu) => mentsu.type === "koutsu" || mentsu.type === "kantsu",
		);
		if (koutsuList.length < 3) return null;

		const koutsuMap = new Map<string, Set<string>>();

		for (const koutsu of koutsuList) {
			const tile = koutsu.tiles[0];
			if (isJihai(tile)) continue;

			const rank = tile.charAt(0);
			const suit = tile.charAt(1) as Suit;

			if (!koutsuMap.has(rank)) {
				koutsuMap.set(rank, new Set());
			}
			koutsuMap.get(rank)?.add(suit);
		}

		for (const suits of koutsuMap.values()) {
			if (suits.size === 3) {
				return YAKU_LIST.SANSHOKUDOUKOU;
			}
		}

		return null;
	}
}
