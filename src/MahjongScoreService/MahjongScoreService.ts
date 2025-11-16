import { HandParser } from "@/logic/HandParser/HandParser";
import { YakuJudger } from "@/logic/YakuJudger/YakuJudger";
import { FuCalculator } from "@/logic/FuCalculator/FuCalculator";
import { PointCalculator, type PointResult } from "@/logic/PointCalculator/PointCalculator";
import type { CalculateRequestDto } from "@/types";
import { Hand } from "@/logic/Hand/Hand";

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

            return pointResult;
        } catch(e: unknown) {
            return e as Error;
        }
    }
}