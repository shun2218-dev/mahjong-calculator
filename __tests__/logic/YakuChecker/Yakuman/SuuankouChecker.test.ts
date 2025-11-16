import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { SuuankouChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyHand, createDummyParsedHand } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

describe('SuuankouChecker', () => {
  let checker: SuuankouChecker;

  beforeEach(() => {
    checker = new SuuankouChecker();
  });

  describe("四暗刻を正しく判定できる", () => {    
    it('⭕️ 成立：四暗刻 (ロンアガリ) の場合', () => {
        const mentsuList = [
            new Mentsu('koutsu', ['1m', '1m', '1m'], true),
            new Mentsu('koutsu', ['2p', '2p', '2p'], true),
            new Mentsu('koutsu', ['3s', '3s', '3s'], true),
            new Mentsu('koutsu', ['4m', '4m', '4m'], true),
        ];
        
        const dummyParsedHand = createDummyParsedHand({ mentsuList, machiType: 'shanpon'});
        const dummyHand = createDummyHand();

        const result = checker.check(dummyParsedHand, dummyHand);

        expect(result.isSuuankou).toBe(true);
        expect(result.isTanki).toBe(false);
    });

    it('⭕️ 成立：四暗刻単騎 (ダブル役満) の場合', () => {
        const mentsuList = [
            new Mentsu('koutsu', ['1m', '1m', '1m'], true),
            new Mentsu('koutsu', ['2p', '2p', '2p'], true),
            new Mentsu('koutsu', ['3s', '3s', '3s'], true),
            new Mentsu('koutsu', ['4m', '4m', '4m'], true),
        ];
        const dummyParsedHand = createDummyParsedHand({ mentsuList, machiType: 'tanki' });
        const dummyHand = createDummyHand();

        const result = checker.check(dummyParsedHand, dummyHand);

        expect(result.isSuuankou).toBe(true);
        expect(result.isTanki).toBe(true);
    });

    it('❌ 不成立：三暗刻 の場合 (明刻が1つ)', () => {
        const mentsuList = [
            new Mentsu('koutsu', ['1m', '1m', '1m'], true),
            new Mentsu('koutsu', ['2p', '2p', '2p'], true),
            new Mentsu('koutsu', ['3s', '3s', '3s'], true),
            new Mentsu('koutsu', ['4m', '4m', '4m'], false),
        ];
        const dummyParsedHand = createDummyParsedHand({ mentsuList, machiType: 'shanpon' });
        const dummyHand = createDummyHand({ fuuro: [{ type: "pon", tiles: ["4m", "4m", "4m"] }] });

        const result = checker.check(dummyParsedHand, dummyHand);

        expect(result.isSuuankou).toBe(false);
    });
  });
});