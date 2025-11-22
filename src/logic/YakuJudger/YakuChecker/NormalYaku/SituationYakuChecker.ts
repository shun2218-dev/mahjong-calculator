import { YAKU_LIST } from "@/const/YAKU_LIST";
import type { Hand } from "@/logic/Hand/Hand";
import type { Yaku, YakuCheckResult } from "@/types";

export class SituationYakuChecker {
	public check(hand: Hand): Yaku[] {
		const result: Yaku[] = [];

		const riichiResult = this.checkRiichi(hand);
		if (riichiResult) result.push(riichiResult);

		const tsumoResult = this.checkTsumo(hand);
		if (tsumoResult) result.push(tsumoResult);

		const ippatsuResult = this.checkIppatsu(hand);
		if (ippatsuResult) result.push(ippatsuResult);

		const doubleRiichiResult = this.checkDoubleRiichi(hand);
		if (doubleRiichiResult) result.push(doubleRiichiResult);

		const haiteiResult = this.checkHaitei(hand);
		if (haiteiResult) result.push(haiteiResult);

		const houteiResult = this.checkHoutei(hand);
		if (houteiResult) result.push(houteiResult);

		const chankanResult = this.checkChankan(hand);
		if (chankanResult) result.push(chankanResult);

		const rinshanResult = this.checkRinshan(hand);
		if (rinshanResult) result.push(rinshanResult);

		return result;
	}

	private checkRiichi(hand: Hand): YakuCheckResult {
		return hand.isRiichi && !hand.isDoubleRiichi ? YAKU_LIST.RIICHI : null;
	}

	private checkTsumo(hand: Hand): YakuCheckResult {
		return hand.isMenzen && hand.isTsumo ? YAKU_LIST.MENZENCHINTSUMOHOU : null;
	}

	private checkIppatsu(hand: Hand): YakuCheckResult {
		return hand.isIppatsu ? YAKU_LIST.IPPATSU : null;
	}

	private checkDoubleRiichi(hand: Hand): YakuCheckResult {
		return hand.isDoubleRiichi ? YAKU_LIST.DOUBLERIICHI : null;
	}

	private checkHaitei(hand: Hand): YakuCheckResult {
		return hand.isHaitei && hand.isTsumo ? YAKU_LIST.HAITEIRAOYUE : null;
	}

	private checkHoutei(hand: Hand): YakuCheckResult {
		return hand.isHaitei && !hand.isTsumo ? YAKU_LIST.HOUTEIRAOYUI : null;
	}

	private checkRinshan(hand: Hand): YakuCheckResult {
		return hand.isRinshan ? YAKU_LIST.RINSHANKAIHOU : null;
	}

	private checkChankan(hand: Hand): YakuCheckResult {
		return hand.isChankan ? YAKU_LIST.CHANKAN : null;
	}

	public checkTenhou(hand: Hand): YakuCheckResult {
		return hand.isTenhou ? YAKU_LIST.TENHOU : null;
	}

	public checkChiihou(hand: Hand): YakuCheckResult {
		return hand.isChiihou ? YAKU_LIST.CHIIHOU : null;
	}
}
