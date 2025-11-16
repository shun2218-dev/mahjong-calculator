import { YAKU_LIST } from "@/const/YAKU_LIST";
import { ChinroutouChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyHand } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

describe('ChinroutouChecker', () => {
  let checker: ChinroutouChecker;

  beforeEach(() => {
    checker = new ChinroutouChecker();
  });

  describe("清老頭を正しく判定できる", () => {    
    it('⭕️ 成立：すべてが老頭牌 (1, 9) のみの場合 (鳴き含む)', () => {
        const dummyHand = createDummyHand({
            tehai: ['1m', '1m', '1m', '9m', '9m', '9m', '1p', '1p', '1p', '9s', '9s', '9s', '1s', '1s']
        });

        const result = checker.check(dummyHand);

        expect(result).toEqual(YAKU_LIST.CHINROUTOU);
    });

    it('❌ 不成立：混老頭 の場合 (字牌が混ざっている)', () => {
        const dummyHand = createDummyHand({
            tehai: ['1m', '1m', '1m', '9m', '9m', '9m', '1p', '1p', '1p', '9s', '9s', '9s', 'ton', 'ton']
        });

        const result = checker.check(dummyHand);

        expect(result).toBeNull();
    });

    it('❌ 不成立：純全帯么九 の場合 (中張牌の順子を含む)', () => {
        const dummyHand = createDummyHand({
            tehai: ['1m', '2m', '3m', '9m', '9m', '9m', '1p', '1p', '1p', '9s', '9s', '9s', '1s', '1s']
        });

        const result = checker.check(dummyHand);

        expect(result).toBeNull();
    });
  });
});