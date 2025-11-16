import { YAKU_LIST } from "@/const/YAKU_LIST";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { IkkitsuukanChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyParsedHand } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

describe('IkkitsuukanChecker', () => {
  let checker: IkkitsuukanChecker;

  beforeEach(() => {
    checker = new IkkitsuukanChecker();
  });

  describe('check', () => {
    it('⭕️ 成立：マンズの123, 456, 789 が揃っている場合', () => {
      const mentsuList = [
        new Mentsu('shuntsu', ['1m', '2m', '3m'], true),
        new Mentsu('shuntsu', ['4m', '5m', '6m'], false),
        new Mentsu('shuntsu', ['7m', '8m', '9m'], true),
        new Mentsu('koutsu', ['1p', '1p', '1p'], true),
      ];
      const dummyParsedHand = createDummyParsedHand({ mentsuList });

      const result = checker.check(dummyParsedHand);

      expect(result).toEqual(YAKU_LIST.IKKITSUUKAN);
    });

    it('❌ 不成立：色が揃っていない場合 (123m, 456p, 789s)', () => {
      const mentsuList = [
        new Mentsu('shuntsu', ['1m', '2m', '3m'], true),
        new Mentsu('shuntsu', ['4p', '5p', '6p'], false),
        new Mentsu('shuntsu', ['7s', '8s', '9s'], true),
        new Mentsu('koutsu', ['1p', '1p', '1p'], true),
      ];
      const dummyParsedHand = createDummyParsedHand({ mentsuList });

      const result = checker.check(dummyParsedHand);



      expect(result).toBeNull();
    });

    it('❌ 不成立：数字が揃っていない場合 (123m, 123m, 456m)', () => {
      const mentsuList = [
        new Mentsu('shuntsu', ['1m', '2m', '3m'], true),
        new Mentsu('shuntsu', ['1m', '2m', '3m'], true),
        new Mentsu('shuntsu', ['4m', '5m', '6m'], false),
        new Mentsu('koutsu', ['1p', '1p', '1p'], true),
      ];
      const dummyParsedHand = createDummyParsedHand({ mentsuList });

      const result = checker.check(dummyParsedHand);



      expect(result).toBeNull();
    });

    it('❌ 不成立：スタンダード形ではない場合（七対子）', () => {
      const dummyParsedHand = createDummyParsedHand({ agariForm: "chiitoitsu" });

      const result = checker.check(dummyParsedHand);

      expect(result).toBeNull();
    });

    it('❌ 不成立：スタンダード形ではない場合（国士無双）', () => {
      const dummyParsedHand = createDummyParsedHand({ agariForm: "kokushi" });

      const result = checker.check(dummyParsedHand);

      expect(result).toBeNull();
    });
  });
});