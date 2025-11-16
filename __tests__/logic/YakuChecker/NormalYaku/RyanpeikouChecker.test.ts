import { YAKU_LIST } from "@/const/YAKU_LIST";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { RyanpeikouChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyHand, createDummyParsedHand } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

const defaultMentsuList = [        
    new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
    new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
    new Mentsu("shuntsu", ["4p", "5p", "6p"], true),
    new Mentsu("shuntsu", ["4p", "5p", "6p"], true),
];

describe("RyanpeikouChecker", () => {
    let checker: RyanpeikouChecker;

    beforeEach(() => {
        checker = new RyanpeikouChecker();
    });

    describe("二盃口を正しく判定できる", () => {
        it("⭕️ 成立：門前かつ同じ順子が2組ある場合", () => {
            const dummyParsedHand = createDummyParsedHand({ mentsuList: defaultMentsuList });
            const dummyHand = createDummyHand();

            const result = checker.check(dummyParsedHand, dummyHand);

            expect(result).toEqual(YAKU_LIST.RYANPEIKOU);
        });

        it("❌ 不成立：鳴いている場合 (門前ではない) ", () => {
            const mentsuList = [            
                new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
                new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
                new Mentsu("shuntsu", ["4p", "5p", "6p"], true),
                new Mentsu("koutsu", ["1s", "1s", "1s"], true),
            ];
            const dummyParsedHand = createDummyParsedHand({ mentsuList });
            const dummyHand = createDummyHand();
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：アガリ形が七対子の場合 (スタンダード形ではない) ", () => {
            const dummyParsedHand = createDummyParsedHand({ agariForm: "chitoitsu" });
            const dummyHand = createDummyHand();
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：アガリ形が国士無双の場合 (スタンダード形ではない) ", () => {
            const dummyParsedHand = createDummyParsedHand({ agariForm: "kokushi" });
            const dummyHand = createDummyHand();
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：同じ順子が1組しかない場合 (一盃口) ", () => {
            const mentsuList = [            
                new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
                new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
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