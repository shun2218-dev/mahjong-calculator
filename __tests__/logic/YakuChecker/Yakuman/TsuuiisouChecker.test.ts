import { YAKU_LIST } from "@/const/YAKU_LIST";
import { TsuuiisouChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyHand } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

describe('TsuuiisouChecker', () => {
  let checker: TsuuiisouChecker;

  beforeEach(() => {
    checker = new TsuuiisouChecker(); 
  });
  
  describe("字一色を正しく判定できる", () => {
      it('⭕️ 成立：すべて字牌の場合 (七対子)', () => {
        const dummyHand = createDummyHand({
            tehai: ['ton', 'ton', 'nan', 'nan', 'sha', 'sha', 'pei', 'pei', 'haku', 'haku', 'hatsu', 'hatsu', 'chun', 'chun']
        });
    
        const result = checker.check(dummyHand);
    
        expect(result).toEqual(YAKU_LIST.TSUUIISOU);
      });
    
      it('❌ 不成立：混一色 の場合 (数牌が混ざっている)', () => {
        const dummyHand = createDummyHand({
            tehai: ['1m', '1m', '1m', 'ton', 'ton', 'nan', 'nan', 'sha', 'sha', 'pei', 'pei', 'haku', 'haku', 'hatsu']
        });
    
        const result = checker.check(dummyHand);
    
        expect(result).toBeNull();
      });
  });
});