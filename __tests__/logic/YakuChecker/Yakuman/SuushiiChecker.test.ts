import { YAKU_LIST } from "@/const/YAKU_LIST";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { SuushiiChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyParsedHand } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

describe('SuushiiChecker', () => {
  let checker: SuushiiChecker;

  beforeEach(() => {
    checker = new SuushiiChecker();
  });

  describe('checkDaisuushii：大四喜を正しく判定できる', () => {
    it('⭕️ 成立：4つの風牌刻子の場合', () => {
      const mentsuList = [
        new Mentsu('koutsu', ['ton', 'ton', 'ton'], false),
        new Mentsu('koutsu', ['nan', 'nan', 'nan'], true),
        new Mentsu('koutsu', ['sha', 'sha', 'sha'], false),
        new Mentsu('koutsu', ['pei', 'pei', 'pei'], true),
      ];
      const dummyParsedHand = createDummyParsedHand({ mentsuList, janto: ['1m', '1m'] });

      const result = checker.checkDaisuushi(dummyParsedHand);

      expect(result).toEqual(YAKU_LIST.DAISUUSHI);
    });

    it('❌ 不成立：小四喜の場合（雀頭が風牌）', () => {
      const mentsuList = [
        new Mentsu('koutsu', ['ton', 'ton', 'ton'], false),
        new Mentsu('koutsu', ['nan', 'nan', 'nan'], true),
        new Mentsu('koutsu', ['sha', 'sha', 'sha'], false),
        new Mentsu('shuntsu', ['1m', '2m', '3m'], true),
      ];
      const dummyParsedHand = createDummyParsedHand({ mentsuList, janto: ['pei', 'pei'] });

      const result = checker.checkDaisuushi(dummyParsedHand);

      expect(result).toBeNull();
    });
  });

  describe('checkShousuushi：小四喜を正しく判定できる', () => {
    it('⭕️ 成立：3つの風牌刻子 + 1つの風牌雀頭の場合', () => {
      const mentsuList = [
        new Mentsu('koutsu', ['ton', 'ton', 'ton'], false),
        new Mentsu('koutsu', ['nan', 'nan', 'nan'], true),
        new Mentsu('koutsu', ['sha', 'sha', 'sha'], false),
        new Mentsu('shuntsu', ['1m', '2m', '3m'], true),
      ];
      const dummyParsedHand = createDummyParsedHand({ mentsuList, janto: ['pei', 'pei'] });

      const result = checker.checkShousuushi(dummyParsedHand);

      expect(result).toEqual(YAKU_LIST.SHOUSUUSHI);
    });

    it('❌ 不成立：雀頭が風牌ではない場合', () => {
      const mentsuList = [
        new Mentsu('koutsu', ['ton', 'ton', 'ton'], false),
        new Mentsu('koutsu', ['nan', 'nan', 'nan'], true),
        new Mentsu('koutsu', ['sha', 'sha', 'sha'], false),
        new Mentsu('shuntsu', ['1m', '2m', '3m'], true),
      ];
      const dummyParsedHand = createDummyParsedHand({ mentsuList, janto: ['1m', '1m'] });

      const result = checker.checkShousuushi(dummyParsedHand);

      expect(result).toBeNull();
    });
  });
});