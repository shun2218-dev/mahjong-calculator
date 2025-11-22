import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import type { YakuCheckResult } from "@/types";
import { isKazehai } from "@/utils/helper";

export class SuushiiChecker {
	public checkDaisuushi(parsedHand: ParsedHand): YakuCheckResult {
		if (parsedHand.agariForm !== "standard") return null;

		const kazeKoutsu = parsedHand.mentsuList.filter(
			(mentsu) =>
				(mentsu.type === "koutsu" || mentsu.type === "kantsu") &&
				isKazehai(mentsu.tiles[0]),
		);

		return kazeKoutsu.length === 4 ? YAKU_LIST.DAISUUSHI : null;
	}

	public checkShousuushi(parsedHand: ParsedHand): YakuCheckResult {
		if (parsedHand.agariForm !== "standard") return null;

		if (!isKazehai(parsedHand.janto[0])) {
			return null;
		}

		const kazeKoutsu = parsedHand.mentsuList.filter(
			(mentsu) =>
				(mentsu.type === "koutsu" || mentsu.type === "kantsu") &&
				isKazehai(mentsu.tiles[0]),
		);

		return kazeKoutsu.length === 3 ? YAKU_LIST.SHOUSUUSHI : null;
	}
}
