import { YAKU_LIST } from "@/const/YAKU_LIST";
import { FuCalculator } from "@/logic/FuCalculator/FuCalculator";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { createDummyHand, createDummyParsedHand, createDummyYakuResult } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

describe("FuCalculator", () => {
    let calculator : FuCalculator;

    beforeEach(() => {
        calculator = new FuCalculator();
    });

    it("⭕️ 特殊計算：七対子 (chiitoitsu) は 25符 を返す", () => {
        const dummyParsedHand = createDummyParsedHand({ agariForm: "chiitoitsu" });
        const dummyHand = createDummyHand();
        const yakuResult = createDummyYakuResult([YAKU_LIST.CHIITOITSU]);

        const fu = calculator.calculate(dummyParsedHand, dummyHand, yakuResult);

        expect(fu).toBe(25);
    });

    it("⭕️ 特殊計算：平和 (pinfu)・ツモ は 20符 を返す", () => {
        const dummyParsedHand = createDummyParsedHand();
        const dummyHand = createDummyHand({ agariType: "tsumo" });
        const yakuResult = createDummyYakuResult([YAKU_LIST.PINFU, YAKU_LIST.MENZENCHINTSUMOHOU]);

        const fu = calculator.calculate(dummyParsedHand, dummyHand, yakuResult);

        expect(fu).toBe(20);
    });

    it("⭕️ 特殊計算：平和 (pinfu)・ロン は 30符 を返す", () => {
        const dummyParsedHand = createDummyParsedHand();
        const dummyHand = createDummyHand({ agariType: "ron" });
        const yakuResult = createDummyYakuResult([YAKU_LIST.PINFU]);

        const fu = calculator.calculate(dummyParsedHand, dummyHand, yakuResult);

        expect(fu).toBe(30);
    });

    it("⭕️ 通常計算：メンゼン・ツモ (2符) のみ (20 + 2 = 22 -> 30符)", () => {
        const dummyParsedHand = createDummyParsedHand({
            agariForm: "standard",
            machiType: "ryanmen",
            janto: ["1m", "1m"],
            mentsuList: [
                new Mentsu("shuntsu", ["2m", "3m", "4m"], true),
            ]
        });
        const dummyHand = createDummyHand({ agariType: "tsumo", fuuro: [] });
        const yakuResult = createDummyYakuResult([YAKU_LIST.MENZENCHINTSUMOHOU]);

        // Base(20) + Agari(2) + Mentsu(0) + Janto(0) + Machi(0) = 22
        // roundUp(22) = 30
        const fu = calculator.calculate(dummyParsedHand, dummyHand, yakuResult);
        
        expect(fu).toBe(30);
    });
    it('⭕️ 通常計算：メンゼン・ロン (10符) のみ (20 + 10 = 30符)', () => {
    const dummyParsedHand = createDummyParsedHand();
    const dummyHand = createDummyHand({ agariType: 'ron', fuuro: [] });
    const yakuResult = createDummyYakuResult([YAKU_LIST.TANYAOCHUU]);

    // Base(20) + Agari(10) + Mentsu(0) + Janto(0) + Machi(0) = 30
    // roundUp(30) = 30
    const fu = calculator.calculate(dummyParsedHand, dummyHand, yakuResult);

    expect(fu).toBe(30);
  });

  it('❌ 通常計算：鳴き・ロン (0符) のみ (20 + 0 = 20符)', () => {
    const dummyParsedHand = createDummyParsedHand(); // 符がつかない形
    const dummyHand = createDummyHand({ 
      agariType: 'ron', 
      fuuro: [{ type: 'pon', tiles: ['1p', '1p', '1p'] }]
    });
    const yakuResult = createDummyYakuResult([YAKU_LIST.TANYAOCHUU]);

    // Base(20) + Agari(0) + Mentsu(0) + Janto(0) + Machi(0) = 20
    // roundUp(20) = 20
    const fu = calculator.calculate(dummyParsedHand, dummyHand, yakuResult);

    expect(fu).toBe(20);
  });

  it('⭕️ 通常計算：複雑なケース（切り上げあり）', () => {
    // [2m, 2m] [東(ポン)] [111p(暗刻)] [789s] [6s(単騎)]
    const mentsuList = [
      new Mentsu('koutsu', ['ton', 'ton', 'ton'], false),
      new Mentsu('koutsu', ['1p', '1p', '1p'], true),
      new Mentsu('shuntsu', ['7s', '8s', '9s'], true),
    ];
    const dummyParsedHand = createDummyParsedHand({
      mentsuList: mentsuList,
      janto: ['2m', '2m'],
      machiType: 'tanki',
    });
    const dummyHand = createDummyHand(
      {
        agariType: 'ron',
        fuuro: [{ type: 'pon', tiles: ['ton', 'ton', 'ton'] }],
      },
      {
        bakaze: 'ton',
        jikaze: 'nan',
      }
    );
    const yakuResult = createDummyYakuResult([YAKU_LIST.YAKUHAI_BAKAZE]);

    // Base(20)
    // + Agari(0)
    // + Mentsu( [ton(明刻,么九)]: 4 + [1p(暗刻,么九)]: 8 + [789s(順子)]: 0 ) = 12
    // + Janto(0)
    // + Machi(2)
    // = 34
    // roundUp(34) = 40
    const fu = calculator.calculate(dummyParsedHand, dummyHand, yakuResult);

    expect(fu).toBe(40);
  });

  it('⭕️ 通常計算：ダブ東雀頭 (4符)', () => {
    const dummyParsedHand = createDummyParsedHand({
      janto: ['ton', 'ton'],
      machiType: 'kanchan',
    });
    const dummyHand = createDummyHand(
      { agariType: 'tsumo', fuuro: [] },
      { bakaze: 'ton', jikaze: 'ton' }
    );
    const yakuResult = createDummyYakuResult([YAKU_LIST.MENZENCHINTSUMOHOU]);

    // Base(20) + Agari(2) + Mentsu(0) + Janto(場風2 + 自風2 = 4) + Machi(2) = 28
    // roundUp(28) = 30
    const fu = calculator.calculate(dummyParsedHand, dummyHand, yakuResult);

    expect(fu).toBe(30);
  });

  it('⭕️ 通常計算：暗槓 (32符)', () => {
    const mentsuList = [
      new Mentsu('kantsu', ['1p', '1p', '1p', '1p'], true),
    ];
    const dummyParsedHand = createDummyParsedHand({ mentsuList: mentsuList });
    const dummyHand = createDummyHand({ agariType: 'ron', fuuro: [] });
    const yakuResult = createDummyYakuResult([YAKU_LIST.RIICHI]);
    
    // Base(20) + Agari(10) + Mentsu(32) + Janto(0) + Machi(0) = 62
    // roundUp(62) = 70
    const fu = calculator.calculate(dummyParsedHand, dummyHand, yakuResult);

    expect(fu).toBe(70);
  });

  it('⭕️ 特殊計算：役満の場合は 0符 を返す', () => {
    const dummyParsedHand = createDummyParsedHand();
    const dummyHand = createDummyHand();
    const yakuResult = createDummyYakuResult([YAKU_LIST.DAISANGEN]);

    const fu = calculator.calculate(dummyParsedHand, dummyHand, yakuResult);

    expect(fu).toBe(0);
  });

  it('⭕️ 通常計算：明槓（ミンカン）の符 (16符)', () => {
    const mentsuList = [
      new Mentsu('kantsu', ['1m', '1m', '1m', '1m'], false), 
    ];
    const dummyParsedHand = createDummyParsedHand({ 
      mentsuList: mentsuList,
      machiType: 'ryanmen',
      janto: ['2p', '2p'],
    });
    const dummyHand = createDummyHand(
      {
        agariType: 'ron',
        fuuro: [{ type: 'minkan', tiles: ['1m', '1m', '1m', '1m'] }],
      }
    );
    const yakuResult = createDummyYakuResult([]);

    // Base(20)
    // + Agari(0) (鳴きロン)
    // + Mentsu( [1m(明槓,么九)]: 32 / 2 = 16符 ) 
    // + Janto(0)
    // + Machi(0)
    // = 36
    // roundUp(36) = 40
    const fu = calculator.calculate(dummyParsedHand, dummyHand, yakuResult);

    expect(fu).toBe(40);
  });

  it('⭕️ 通常計算：雀頭が三元牌 (白) の符 (2符)', () => {
    const dummyParsedHand = createDummyParsedHand({
      mentsuList: [],
      janto: ['haku', 'haku'],
      machiType: 'ryanmen',
    });
    const dummyHand = createDummyHand(
      { agariType: 'tsumo', fuuro: [] },
      { bakaze: 'ton', jikaze: 'nan' }
    );

    const yakuResult = createDummyYakuResult([YAKU_LIST.YAKUHAI_HAKU]); 

    // Base(20)
    // + Agari(2) (ツモ)
    // + Mentsu(0)
    // + Janto( ['haku']: 2符 )
    // + Machi(0)
    // = 22
    // roundUp(22) = 30
    const fu = calculator.calculate(dummyParsedHand, dummyHand, yakuResult);

    expect(fu).toBe(30);
  });
});