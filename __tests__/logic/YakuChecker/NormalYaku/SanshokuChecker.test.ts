import { YAKU_LIST } from "@/const/YAKU_LIST";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { SanshokuChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyParsedHand } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

describe("SanshokuChecker", () => {
    let checker: SanshokuChecker;

    beforeEach(() => {
        checker = new SanshokuChecker();
    });

    describe("checkDoujyun：三色同順を正しく判定できる", () => {
        it("⭕️ 成立：123のm,p,sがある場合", () => {
            const mentsuList = [
                new Mentsu('shuntsu', ['1m', '2m', '3m'], true),
                new Mentsu('shuntsu', ['1p', '2p', '3p'], true),
                new Mentsu('shuntsu', ['1s', '2s', '3s'], true),
                new Mentsu('koutsu', ['9m', '9m', '9m'], true),
            ];
            const dummyParsedHand = createDummyParsedHand({ mentsuList });

            const result = checker.checkDoujyun(dummyParsedHand);

            expect(result).toEqual(YAKU_LIST.SANSHOKUDOUJYUN);
        });

        it("❌ 不成立：2色しかない場合  ", () => {
            const mentsuList = [
                new Mentsu('shuntsu', ['1m', '2m', '3m'], true),
                new Mentsu('shuntsu', ['1p', '2p', '3p'], true),
                new Mentsu("shuntsu", ["4p", "5p", "6p"], true),
                new Mentsu('koutsu', ['9m', '9m', '9m'], true),
            ];
            const dummyParsedHand = createDummyParsedHand({ mentsuList });
    
            const result = checker.checkDoujyun(dummyParsedHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：数字が違う場合 (123m, 456p, 789s) ", () => {
            const mentsuList = [
                new Mentsu('shuntsu', ['1m', '2m', '3m'], true),
                new Mentsu('shuntsu', ['4p', '5p', '6p'], true),
                new Mentsu("shuntsu", ["7p", "8p", "9p"], true),
                new Mentsu('koutsu', ['9m', '9m', '9m'], true),
            ];
            const dummyParsedHand = createDummyParsedHand({ mentsuList });
    
            const result = checker.checkDoujyun(dummyParsedHand);
    
            expect(result).toBeNull();
        });
    });

    describe("checkDoukou：三色同刻を正しく判定できる", () => {
        it("⭕️ 成立：222のm,p,sがある場合", () => {
            const mentsuList = [
                new Mentsu('koutsu', ['2m', '2m', '2m'], true),
                new Mentsu('koutsu', ['2p', '2p', '2p'], true),
                new Mentsu('koutsu', ['2s', '2s', '2s'], true),
                new Mentsu('koutsu', ['9m', '9m', '9m'], true),
            ];
            const dummyParsedHand = createDummyParsedHand({ mentsuList });

            const result = checker.checkDoukou(dummyParsedHand);

            expect(result).toEqual(YAKU_LIST.SANSHOKUDOUKOU);
        });

        it("❌ 不成立：2色しかない場合 (222m, 222p, 333m)", () => {
            const mentsuList = [
                new Mentsu('koutsu', ['2m', '2m', '2m'], true),
                new Mentsu('koutsu', ['2p', '2p', '2p'], true),
                new Mentsu('koutsu', ['3s', '3s', '3s'], true),
                new Mentsu('koutsu', ['9m', '9m', '9m'], true),
            ];
            const dummyParsedHand = createDummyParsedHand({ mentsuList });
    
            const result = checker.checkDoukou(dummyParsedHand);
    
            expect(result).toBeNull();
        });
    
        it("❌ 不成立：字牌は対象外 ", () => {
            const mentsuList = [
                new Mentsu('koutsu', ['ton', 'ton', 'ton'], true),
                new Mentsu('koutsu', ['nan', 'nan', 'nan'], true),
                new Mentsu("koutsu", ["sha", "sha", "sha"], true),
                new Mentsu('koutsu', ['pei', 'pei', 'pei'], true),
            ];
            const dummyParsedHand = createDummyParsedHand({ mentsuList });
    
            const result = checker.checkDoukou(dummyParsedHand);
    
            expect(result).toBeNull();
        });
    });
});