import { YAKU_LIST } from "@/const/YAKU_LIST";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { SuukantsuChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyParsedHand } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

describe('SuukantsuChecker', () => {
  let checker: SuukantsuChecker;

  beforeEach(() => {
    checker = new SuukantsuChecker();
  });
  
  describe("四槓子を正しく判定できる", () => {
      it('⭕️ 成立：4つの槓子がある場合 (明槓・暗槓混合)', () => {
        const mentsuList = [
          new Mentsu('kantsu', ['1m', '1m', '1m', '1m'], true),
          new Mentsu('kantsu', ['2p', '2p', '2p', '2p'], false),
          new Mentsu('kantsu', ['3s', '3s', '3s', '3s'], true),
          new Mentsu('kantsu', ['4m', '4m', '4m', '4m'], false),
        ];
        const dummyParsedHand = createDummyParsedHand({ mentsuList });
    
        const result = checker.check(dummyParsedHand);
    
        expect(result).toEqual(YAKU_LIST.SUUKANTSU);
      });
    
      it('❌ 不成立：三槓子の場合 (刻子が1つ混ざっている)', () => {
        const mentsuList = [
          new Mentsu('kantsu', ['1m', '1m', '1m', '1m'], true),
          new Mentsu('kantsu', ['2p', '2p', '2p', '2p'], false),
          new Mentsu('kantsu', ['3s', '3s', '3s', '3s'], true),
          new Mentsu('koutsu', ['4m', '4m', '4m'], false),
        ];
        const dummyParsedHand = createDummyParsedHand({ mentsuList });
    
        const result = checker.check(dummyParsedHand);
    
        expect(result).toBeNull();
      });
    
      it('❌ 不成立：スタンダード形ではない場合 (七対子)', () => {
        const dummyParsedHand = createDummyParsedHand({ agariForm: "chiitoitsu" });
    
        const result = checker.check(dummyParsedHand);
    
        expect(result).toBeNull();
      });
    
      it('❌ 不成立：スタンダード形ではない場合 (国士無双)', () => {
        const dummyParsedHand = createDummyParsedHand({ agariForm: "kokushi" });
    
        const result = checker.check(dummyParsedHand);
    
        expect(result).toBeNull();
      });
  });
});