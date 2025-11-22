import { FuCalculator } from "@/logic/FuCalculator/FuCalculator";
import { Hand } from "@/logic/Hand/Hand";
import { HandParser } from "@/logic/HandParser/HandParser";
import {
	PointCalculator,
	type PointResult,
} from "@/logic/PointCalculator/PointCalculator";
import { YakuJudger } from "@/logic/YakuJudger/YakuJudger";
import type { CalculateRequestDto } from "@/types";

export class MahjongScoreService {
	private readonly handParser: HandParser;
	private readonly yakuJudger: YakuJudger;
	private readonly fuCalculator: FuCalculator;
	private readonly pointCalculator: PointCalculator;

	constructor() {
		this.handParser = new HandParser();
		this.yakuJudger = new YakuJudger();
		this.fuCalculator = new FuCalculator();
		this.pointCalculator = new PointCalculator();
	}

	public calculateScore(requestDto: CalculateRequestDto): PointResult | Error {
		try {
			const hand = new Hand(requestDto);

			const parsedHand = this.handParser.parse(hand);
			if (parsedHand instanceof Error) throw parsedHand;

			const yakuResult = this.yakuJudger.judge(parsedHand, hand);

			const fu = this.fuCalculator.calculate(parsedHand, hand, yakuResult);

			const pointResult = this.pointCalculator.calculate(yakuResult, fu, hand);

			return this.applyBonus(pointResult, hand);
		} catch (e: unknown) {
			return e as Error;
		}
	}

	private applyBonus(pointResult: PointResult, hand: Hand): PointResult {
		pointResult = this.applyRiichiStickBonus(pointResult, hand);
		pointResult = this.applyHonbaBonus(pointResult, hand);

		return pointResult;
	}

	private applyRiichiStickBonus(
		pointResult: PointResult,
		hand: Hand,
	): PointResult {
		const riichiSticks = hand.status.riichiSticks || 0;
		if (riichiSticks === 0) return pointResult;

		pointResult.total += riichiSticks * 1000;

		return pointResult;
	}

	private applyHonbaBonus(pointResult: PointResult, hand: Hand): PointResult {
		const honba = hand.status.honba || 0;
		if (honba === 0) return pointResult;

		if (hand.isTsumo) {
			const honbaBonus = honba * 100;
			pointResult.total += honbaBonus * 3;

			if (hand.isOya) {
				pointResult.ko += honbaBonus;
			} else {
				pointResult.oya += honbaBonus;
				pointResult.ko += honbaBonus;
			}
		} else {
			const honbaBonus = honba * 300;
			pointResult.total += honbaBonus;
		}

		return pointResult;
	}
}
