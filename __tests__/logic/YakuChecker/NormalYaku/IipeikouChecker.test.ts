import { YAKU_LIST } from "@/const/YAKU_LIST";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { IipeikouChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyHand, createDummyParsedHand } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

describe("IipeikouChecker", () => {
    let checker: IipeikouChecker;

    beforeEach(() => {
        checker = new IipeikouChecker();
    });

    describe("一盃口を正しく判定できる", () => {
        it("⭕️ 成立：門前かつ同じ順子が1組ある場合", () => {
            const mentsuList = [            
                new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
                new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
                new Mentsu("shuntsu", ["4p", "5p", "6p"], true),
                new Mentsu("koutsu", ["1s", "1s", "1s"], true),
            ]
            const dummyParsedHand = createDummyParsedHand({ mentsuList });
            const dummyHand = createDummyHand();

            const result = checker.check(dummyParsedHand, dummyHand);

            expect(result).toEqual(YAKU_LIST.IIPEIKOU);
        });

        it("⭕️ 成立：門前かつ同じ順子が2組ある場合(二盃口)", () => {
            const mentsuList = [            
                new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
                new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
                new Mentsu("shuntsu", ["4p", "5p", "6p"], true),
                new Mentsu("shuntsu", ["4s", "5s", "6s"], true),
            ]
            const dummyParsedHand = createDummyParsedHand({ mentsuList });
            const dummyHand = createDummyHand();

            const result = checker.check(dummyParsedHand, dummyHand);

            expect(result).toEqual(YAKU_LIST.IIPEIKOU);
        });
        it("❌ 不成立：鳴いている場合(門前ではない)", () => {
            const mentsuList = [            
                new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
                new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
                new Mentsu("shuntsu", ["4p", "5p", "6p"], true),
                new Mentsu("koutsu", ["1s", "1s", "1s"], true),
            ];
            const dummyParsedHand = createDummyParsedHand({ mentsuList });
            const dummyHand = createDummyHand({ fuuro: [{ type: "pon", tiles: ["1p", "1p", "1p"] }] });
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：アガリ形が七対子の場合 (スタンダード形ではない)", () => {
            const dummyParsedHand = createDummyParsedHand({ agariForm: "chitoitsu" });
            const dummyHand = createDummyHand();
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：アガリ形が国士無双の場合 (スタンダード形ではない)", () => {
            const dummyParsedHand = createDummyParsedHand({ agariForm: "kokushi" });
            const dummyHand = createDummyHand();
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：同じ順子ではない場合", () => {
            const mentsuList = [
                new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
                new Mentsu("shuntsu", ["4m", "5m", "6m"], true),
                new Mentsu("shuntsu", ["4p", "5p", "6p"], true),
                new Mentsu("koutsu", ["1s", "1s", "1s"], true),
            ];
            const dummyParsedHand = createDummyParsedHand({ mentsuList });
            const dummyHand = createDummyHand();
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    });
});