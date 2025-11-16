import { YAKU_LIST } from "@/const/YAKU_LIST";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { PinfuChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyHand, createDummyParsedHand } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

describe("PinfuChecker", () => {
    let checker: PinfuChecker;

    beforeEach(() => {
        checker = new PinfuChecker();
    });

    describe("平和を正しく判定できる", () => {
        it("⭕️ 成立：門前・4つの面子がすべて順子・雀頭が役牌ではない・待ちが両面 の場合", () => {
            const dummyParsedHand = createDummyParsedHand({                
                agariForm: "standard",
                machiType: "ryanmen",
                janto: ["1m", "1m"],
                mentsuList: [
                    new Mentsu("shuntsu", ["2m", "3m", "4m"], true),
                    new Mentsu("shuntsu", ["5m", "6m", "7m"], true),
                    new Mentsu("shuntsu", ["1p", "2p", "3p"], true),
                    new Mentsu("shuntsu", ["4p", "5p", "6p"], true),
                ]
            });
            const dummyHand = createDummyHand({                
                tehai: ["1m", "1m", "2m", "3m", "4m", "5m", "6m", "7m", "1p", "2p", "3p", "4p", "5p", "6p"],
                agariHai: "2m",
                fuuro: [],
            });
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toEqual(YAKU_LIST.PINFU);
        });

        it("❌ 不成立：鳴いている場合 (面前ではない)", () => {
            const dummyParsedHand = createDummyParsedHand();
            const dummyHand = createDummyHand({
                tehai: ["1m", "1m", "2m", "3m", "4m", "1p", "2p", "3p", "4p", "5p", "6p"],
                fuuro: [
                    { type: "chi", tiles: ["5m", "6m", "7m"] }
                ]
            });
    
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
    
        it("❌ 不成立：カンチャン待ちの場合 (両面ではない)", () => {
            const dummyParsedHand = createDummyParsedHand({ machiType: "kanchan" });
            const dummyHand = createDummyHand();
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：ペンチャン待ちの場合 (両面ではない)", () => {
            const dummyParsedHand = createDummyParsedHand({ machiType: "penchan" });
            const dummyHand = createDummyHand();
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：単騎待ちの場合 (両面ではない)", () => {
            const dummyParsedHand = createDummyParsedHand({ machiType: "tanki" });
            const dummyHand = createDummyHand();
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：単騎待ちの場合 (両面ではない)", () => {
            const dummyParsedHand = createDummyParsedHand({ machiType: "tanki" });
            const dummyHand = createDummyHand();
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：刻子が1つ以上含まれている場合", () => {
            const koutsu = new Mentsu("koutsu", ["1s", "1s", "1s"]);
            const dummyParsedHand = createDummyParsedHand({
                mentsuList: [
                    new Mentsu("shuntsu", ["2m", "3m", "4m"], true),
                    new Mentsu("shuntsu", ["5m", "6m", "7m"], true),
                    new Mentsu("shuntsu", ["1p", "2p", "3p"], true),
                    koutsu
                ]
            });
            const dummyHand = createDummyHand();
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：雀頭が三元牌の場合", () => {
            const dummyParsedHand = createDummyParsedHand({ janto: ["haku", "haku"] });
            const dummyHand = createDummyHand();
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：雀頭が場風 (東)", () => {
            const dummyParsedHand = createDummyParsedHand({ janto: ["ton", "ton"] });
            const dummyHand = createDummyHand({}, {            
                bakaze: "ton",
                jikaze: "nan",
                dora: ["1p"],
                uradora: []
            });
    
            const result = checker.check(dummyParsedHand, dummyHand);
    
            expect(result).toBeNull();
        });
    });
});