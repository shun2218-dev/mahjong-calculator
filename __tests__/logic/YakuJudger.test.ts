import { YAKU_LIST } from "@/const/YAKU_LIST";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { YakuJudger } from "@/logic/YakuJudger/YakuJudger";
import { createDummyHand, createDummyParsedHand } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

describe('YakuJudger', () => {
  let judger: YakuJudger;

  beforeEach(() => {
    judger = new YakuJudger();
  });

  it('⭕️ 成立：リーチ・ツモ・ピンフ・タンヤオ・ドラ1・裏ドラ1・赤3 の複合', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['3m', '4m', '5mr', '5sr', '6s', '7s', '2p', '3p', '4p', '5pr', '6p', '8p', '8p'],
        agariHai: '7p',
        agariType: 'tsumo',
        fuuro: [],
      },
      {
        isRiichi: true,
        dora: ['2m'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({
      agariForm: 'standard',
      machiType: 'ryanmen',
      janto: ['8p', '8p'],
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(4);
    expect(result.doraHan).toBe(5);
    expect(result.totalHan).toBe(9);
    expect(result.yakuList).toHaveLength(4);
    expect(result.yakuList).toContain(YAKU_LIST.RIICHI);
    expect(result.yakuList).toContain(YAKU_LIST.MENZENCHINTSUMOHOU);
    expect(result.yakuList).toContain(YAKU_LIST.PINFU);
    expect(result.yakuList).toContain(YAKU_LIST.TANYAOCHUU);
  });

  it('⭕️ 成立：ドラ表示牌が9の時ドラが1になる', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['1m', '2m', '3m', '5s', '6s', '7s', '2p', '3p', '4p', '5p', '6p', '7p', '8p'],
        agariHai: '8p',
        agariType: 'tsumo',
        fuuro: [],
      },
      {
        dora: ['9m'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({
      agariForm: 'standard',
      machiType: 'tanki',
      janto: ['8p', '8p'],
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(1);
    expect(result.doraHan).toBe(1);
    expect(result.totalHan).toBe(2);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.MENZENCHINTSUMOHOU);
  });

  it('⭕️ 成立：ドラ表示牌が東の時ドラが南になる', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['1m', '2m', '3m', '5s', '6s', '7s', '2p', '3p', '4p', '5p', '6p', '7p', 'nan', 'nan'],
        agariHai: 'nan',
        agariType: 'tsumo',
        fuuro: [],
      },
      {
        dora: ['ton'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({
      agariForm: 'standard',
      machiType: 'tanki',
      janto: ['nan', 'nan'],
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(1);
    expect(result.doraHan).toBe(2);
    expect(result.totalHan).toBe(3);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.MENZENCHINTSUMOHOU); 
  });

  it('⭕️ 成立：ドラ表示牌が南の時ドラが西になる', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['1m', '2m', '3m', '5s', '6s', '7s', '2p', '3p', '4p', '5p', '6p', '7p', 'sha', 'sha'],
        agariHai: 'sha',
        agariType: 'tsumo',
        fuuro: [],
      },
      {
        dora: ['nan'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({
      agariForm: 'standard',
      machiType: 'tanki',
      janto: ['sha', 'sha'],
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(1);
    expect(result.doraHan).toBe(2);
    expect(result.totalHan).toBe(3);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.MENZENCHINTSUMOHOU); 
  });

  it('⭕️ 成立：ドラ表示牌が西の時ドラが北になる', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['1m', '2m', '3m', '5s', '6s', '7s', '2p', '3p', '4p', '5p', '6p', '7p', 'pei', 'pei'],
        agariHai: 'pei',
        agariType: 'tsumo',
        fuuro: [],
      },
      {
        dora: ['sha'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({
      agariForm: 'standard',
      machiType: 'tanki',
      janto: ['pei', 'pei'],
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(1);
    expect(result.doraHan).toBe(2);
    expect(result.totalHan).toBe(3);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.MENZENCHINTSUMOHOU); 
  });
  it('⭕️ 成立：ドラ表示牌が北の時ドラが東になる', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['1m', '2m', '3m', '5s', '6s', '7s', '2p', '3p', '4p', '5p', '6p', '7p', 'ton', 'ton'],
        agariHai: 'ton',
        agariType: 'tsumo',
        fuuro: [],
      },
      {
        dora: ['pei'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({
      agariForm: 'standard',
      machiType: 'tanki',
      janto: ['ton', 'ton'],
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(1);
    expect(result.doraHan).toBe(2);
    expect(result.totalHan).toBe(3);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.MENZENCHINTSUMOHOU); 
  });

  it('⭕️ 成立：ドラ表示牌が白の時ドラが發になる', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['1m', '2m', '3m', '5s', '6s', '7s', '2p', '3p', '4p', '5p', '6p', '7p', 'hatsu', 'hatsu'],
        agariHai: 'hatsu',
        agariType: 'tsumo',
        fuuro: [],
      },
      {
        dora: ['haku'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({
      agariForm: 'standard',
      machiType: 'tanki',
      janto: ['nan', 'nan'],
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(1);
    expect(result.doraHan).toBe(2);
    expect(result.totalHan).toBe(3);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.MENZENCHINTSUMOHOU); 
  });

  it('⭕️ 成立：ドラ表示牌が發の時ドラが中になる', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['1m', '2m', '3m', '5s', '6s', '7s', '2p', '3p', '4p', '5p', '6p', '7p', 'chun', 'chun'],
        agariHai: 'chun',
        agariType: 'tsumo',
        fuuro: [],
      },
      {
        dora: ['hatsu'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({
      agariForm: 'standard',
      machiType: 'tanki',
      janto: ['chun', 'chun'],
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(1);
    expect(result.doraHan).toBe(2);
    expect(result.totalHan).toBe(3);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.MENZENCHINTSUMOHOU); 
  });

  it('⭕️ 成立：ドラ表示牌が中の時ドラが白になる', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['1m', '2m', '3m', '5s', '6s', '7s', '2p', '3p', '4p', '5p', '6p', '7p', 'haku', 'haku'],
        agariHai: 'chun',
        agariType: 'tsumo',
        fuuro: [],
      },
      {
        dora: ['chun'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({
      agariForm: 'standard',
      machiType: 'tanki',
      janto: ['chun', 'chun'],
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(1);
    expect(result.doraHan).toBe(2);
    expect(result.totalHan).toBe(3);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.MENZENCHINTSUMOHOU); 
  });

  it('⭕️ 成立：国士無双', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['1m', '9m', '1p', '9p', '1s', '9s', 'ton', 'nan', 'sha', 'pei', 'haku', 'hatsu', 'chun', 'chun'],
        agariHai: 'chun',
        agariType: 'ron',
        fuuro: [],
      },
      {
        dora: ['1m'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({ agariForm: 'kokushi' });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(13);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.KOKUSHIMUSOU);
  });

  it('⭕️ 成立：国士無双13面待ち', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ["1m", "9m", "1s", "9s", "1p", "9p", "ton", "ton", "nan", "sha", "pei", "haku", "hatsu", "chun"],
        agariHai: 'ton',
        agariType: 'tsumo',
        fuuro: [],
      },
      {
        dora: ['1m'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({ agariForm: 'kokushi', is13MenMachi: true });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(26);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.KOKUSHIMUSOU13MEN);
  });

  it('⭕️ 成立：天和', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['2m', '3m', '4m', '5m', '6m', '7m', '2p', '3p', '4p', '5p', '6p', '7p', '5mr'],
        agariHai: '8p',
        agariType: 'tsumo',
        fuuro: [],        
      },
      {
        isRiichi: true,
        dora: ['1m'],
        uradora: ['4p'],
        isTenhou: true,
      },
    );

    const dummyParsedHand = createDummyParsedHand({ agariForm: 'standard' });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(13);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.TENHOU);
  });

  it('⭕️ 成立：地和', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['2m', '3m', '4m', '5m', '6m', '7m', '2p', '3p', '4p', '5p', '6p', '7p', '5mr'],
        agariHai: '8p',
        agariType: 'ron',
        fuuro: [],
      },
      {
        isRiichi: true,
        dora: ['1m'],
        uradora: ['4p'],
        isChiihou: true
      },
    );

    const dummyParsedHand = createDummyParsedHand({ agariForm: 'standard' });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(13);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.CHIIHOU);
  });

  it('⭕️ 成立：四暗刻単騎', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['1m', '1m', '1m', '2m', '2m', '2m', '5p', '5p', '5p', '6p', '6p', '6p', '8p'],
        agariHai: '8p',
        agariType: 'tsumo',
        fuuro: [],
      },
      {
        dora: ['1m'],
        uradora: ['4p'],
        isRiichi: true,
      },
    );

    const dummyParsedHand = createDummyParsedHand({
        mentsuList: [
            new Mentsu("koutsu", ["1m", "1m", "1m"], true),
            new Mentsu("koutsu", ["2m", "2m", "2m"], true),
            new Mentsu("koutsu", ["5p", "5p", "5p"], true),
            new Mentsu("koutsu", ["6p", "6p", "6p"], true),
        ],
        janto: ["8p", "8p"],
        agariForm: 'standard',
        machiType: "tanki" 
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(26);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.SUUANKOUTANKI);
  });

  it('⭕️ 成立：四暗刻', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['1m', '1m', '1m', '2m', '2m', '2m', '5p', '5p', '5p', '6p', '6p', '6p', '8p', '8p'],
        agariHai: '8p',
        agariType: 'ron',
        fuuro: [],
      },
      {
        dora: ['1m'],
        uradora: ['4p'],
        isRiichi: true,
      },
    );

    const dummyParsedHand = createDummyParsedHand({
        mentsuList: [
            new Mentsu("koutsu", ["1m", "1m", "1m"], true),
            new Mentsu("koutsu", ["2m", "2m", "2m"], true),
            new Mentsu("koutsu", ["5p", "5p", "5p"], true),
            new Mentsu("koutsu", ["6p", "6p", "6p"], true),
        ],
        janto: ["8p", "8p"],
        agariForm: 'standard',
        machiType: "shanpon" 
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(13);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.SUUANKOU);
  });

  it('⭕️ 成立：大四喜', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['2m', '2m', 'ton', 'ton', 'ton', 'nan', 'nan', 'nan', 'sha', 'sha', 'sha', 'pei', 'pei', 'pei'],
        agariHai: 'ton',
        agariType: 'ron',
        fuuro: [],
      },
      {
        isRiichi: true,
        dora: ['1m'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({ 
        mentsuList: [
            new Mentsu("koutsu", ["ton", "ton", "ton"], false),
            new Mentsu("koutsu", ["nan", "nan", "nan"], true),
            new Mentsu("koutsu", ["sha", "sha", "sha"], true),
            new Mentsu("koutsu", ["pei", "pei", "pei"], true),
        ],
        janto: ["2m", "2m"],
        agariForm: 'standard'
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(26);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.DAISUUSHI);
  });

  it('⭕️ 成立：小四喜', () => {
    const dummyHand = createDummyHand(
      {
        tehai: ['2m', '2m', '2m', 'ton', 'ton', 'ton', 'nan', 'nan', 'nan', 'sha', 'sha', 'sha', 'pei', 'pei'],
        agariHai: 'ton',
        agariType: 'ron',
        fuuro: [],
      },
      {
        isRiichi: true,
        dora: ['1m'],
        uradora: ['4p'],
      },
    );

    const dummyParsedHand = createDummyParsedHand({ 
        mentsuList: [
            new Mentsu("koutsu", ["ton", "ton", "ton"], false),
            new Mentsu("koutsu", ["nan", "nan", "nan"], true),
            new Mentsu("koutsu", ["sha", "sha", "sha"], true),
            new Mentsu("koutsu", ["2m", "2m", "2m"], true),
        ],
        janto: ["pei", "pei"],
        agariForm: 'standard'
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(13);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.SHOUSUUSHI);
  });

  it('⭕️ 成立：四槓子', () => {
    const dummyHand = createDummyHand();

    const dummyParsedHand = createDummyParsedHand({ 
        mentsuList: [
            new Mentsu("kantsu", ["ton", "ton", "ton", "ton"], false),
            new Mentsu("kantsu", ["1p", "1p", "1p", "1p"], true),
            new Mentsu("kantsu", ["sha", "sha", "sha", "sha"], true),
            new Mentsu("kantsu", ["2m", "2m", "2m", "2m"], true),
        ],
        janto: ["pei", "pei"],
        agariForm: 'standard'
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(13);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.SUUKANTSU);
  });

  it('⭕️ 成立：清老頭', () => {
    const dummyHand = createDummyHand({
        tehai: ["1m", "1m", "1m", "1p", "1p", "1p", "9p", "9p", "1s", "1s", "1s", "9s", "9s", "9s"],
        agariType: "ron",
        agariHai: "9s",
    });

    const dummyParsedHand = createDummyParsedHand({ 
        mentsuList: [
            new Mentsu("koutsu", ["9s", "9s", "9s"], false),
            new Mentsu("koutsu", ["1p", "1p", "1p"], true),
            new Mentsu("koutsu", ["1s", "1s", "1s"], true),
            new Mentsu("koutsu", ["1m", "1m", "1m"], true),
        ],
        janto: ["9p", "9p"],
        agariForm: 'standard'
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(13);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.CHINROUTOU);
  });

  it('⭕️ 成立：字一色', () => {
    const dummyHand = createDummyHand({
        tehai: ['ton', 'ton', 'ton', 'nan', 'nan', 'nan', 'pei', 'pei', 'haku', 'haku', 'haku', 'hatsu', 'hatsu', 'hatsu'],
        agariType: "ron",
        agariHai: "haku",
    });

    const dummyParsedHand = createDummyParsedHand({ 
        mentsuList: [
            new Mentsu("koutsu", ["ton", "ton", "ton"], false),
            new Mentsu("koutsu", ["nan", "nan", "nan"], true),
            new Mentsu("koutsu", ['haku', 'haku', 'haku'], true),
            new Mentsu("koutsu", ["hatsu", "hatsu", "hatsu"], true),
        ],
        janto: ["pei", "pei"],
        agariForm: 'standard'
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(13);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.TSUUIISOU);
  });

  it('⭕️ 成立：緑一色', () => {
    const dummyHand = createDummyHand({
        tehai: ["2s", "2s", "2s", "3s", "3s", "3s", "4s", "4s", "4s", "6s", "6s", "hatsu", "hatsu", "hatsu"],
        agariType: "ron",
        agariHai: "hatsu",
    });

    const dummyParsedHand = createDummyParsedHand({ 
        mentsuList: [
            new Mentsu("koutsu", ["2s", "2s", "2s"], false),
            new Mentsu("koutsu", ["3s", "3s", "1p"], true),
            new Mentsu("koutsu", ["4s", "4s", "1s"], true),
            new Mentsu("koutsu", ["hatsu", "hatsu", "hatsu"], true),
        ],
        janto: ["6s", "6s"],
        agariForm: 'standard'
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(13);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.RYUUIISOU);
  });

  it('⭕️ 成立：純正九蓮宝燈', () => {
    const dummyHand = createDummyHand({
        tehai: ['1m', '1m', '1m', '2m', '3m', '4m', '5m', '5m', '6m', '7m', '8m', '9m', '9m', '9m'],
        agariType: "tsumo",
        agariHai: "5m",
    });

    const dummyParsedHand = createDummyParsedHand({ agariForm: 'standard' });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(26);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.JYUNSEICHUURENPOUTOU);
  });

  it('⭕️ 成立：九蓮宝燈', () => {
    const dummyHand = createDummyHand({
        tehai: ['1m', '1m', '1m', '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', '9m', '9m'],
        agariType: "ron",
        agariHai: "5m",
    });

    const dummyParsedHand = createDummyParsedHand({ agariForm: 'standard' });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(13);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.CHUURENPOUTOU);
  });

  it('⭕️ 成立：七対子', () => {
    const dummyHand = createDummyHand({
        tehai: ["2s", "2s", "3s", "3s", "4s", "4s", "6p", "6p", "hatsu", "hatsu", "ton", "ton", "chun", "chun"],
        agariType: "ron",
        agariHai: "hatsu",
    });

    const dummyParsedHand = createDummyParsedHand({ agariForm: "chitoitsu" });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(2);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.CHIITOITSU);
  });

  it('🛡️ 競合処理：二盃口（リャンペーコー）が成立した場合、一盃口（イーペーコー）は除外する', () => {
    const dummyHand = createDummyHand({ // 門前
      tehai: ['1m', '2m', '3m', '1m', '2m', '3m', '4p', '5p', '6p', '4p', '5p', '6p', '9s', '9s'],
      agariHai: '9s',
      agariType: 'ron',
    });
    const dummyParsedHand = createDummyParsedHand({
      janto: ['9s', '9s'],
      mentsuList: [
        new Mentsu('shuntsu', ['1m', '2m', '3m'], true),
        new Mentsu('shuntsu', ['1m', '2m', '3m'], true),
        new Mentsu('shuntsu', ['4p', '5p', '6p'], true),
        new Mentsu('shuntsu', ['4p', '5p', '6p'], true),
      ],
      machiType: "tanki"
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(3);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.RYANPEIKOU);
    expect(result.yakuList).not.toContain(YAKU_LIST.IIPEIKOU);
  });

  it('🛡️ 競合処理：清一色（チンイツ）が成立した場合、混一色（ホンイツ）は除外する', () => {
    const dummyHand = createDummyHand({ // 門前
      tehai: ['1m', '1m', '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '7m', '8m', '9m'],
      agariHai: '1m',
      agariType: 'ron',
    });
    const dummyParsedHand = createDummyParsedHand({
      janto: ['1m', '1m'],
      mentsuList: [
        new Mentsu('koutsu', ['1m', '1m', '1m'], true),
        new Mentsu('shuntsu', ['2m', '3m', '4m'], true),
        new Mentsu('shuntsu', ['5m', '6m', '7m'], true),
        new Mentsu('shuntsu', ['7m', '8m', '9m'], true),
      ],
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(6);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.CHINITSU);
    expect(result.yakuList).not.toContain(YAKU_LIST.HONITSU);
  });

  it('👑 役満優先：大三元が成立した場合、役牌やドラは無視する', () => {
    const dummyHand = createDummyHand(
      {
        fuuro: [{ type: 'pon', tiles: ['haku', 'haku', 'haku'] }],
        tehai: ['2m', '3m', '4m', '5m', '5m', 'hatsu', 'hatsu', 'hatsu', 'chun', 'chun'],
        agariHai: 'chun',
        agariType: 'ron',
      },
      {
        dora: ['2m'],
      },
    );
    const dummyParsedHand = createDummyParsedHand({
      janto: ['5m', '5m'],
      mentsuList: [
        new Mentsu('koutsu', ['haku', 'haku', 'haku'], false),
        new Mentsu('koutsu', ['hatsu', 'hatsu', 'hatsu'], true),
        new Mentsu('koutsu', ['chun', 'chun', 'chun'], false),
        new Mentsu('shuntsu', ['2m', '3m', '4m'], true),
      ],
    });

    const result = judger.judge(dummyParsedHand, dummyHand);

    expect(result.yakuHan).toBe(13); // 大三元(13)
    expect(result.doraHan).toBe(0); // 👈 ドラは 0
    expect(result.totalHan).toBe(13);
    expect(result.yakuList).toHaveLength(1);
    expect(result.yakuList).toContain(YAKU_LIST.DAISANGEN);
    // 役牌（白・發・中）はYakuJudgerが役満と判断したらリストに入れない
    expect(result.yakuList).not.toContain(YAKU_LIST.YAKUHAI_HAKU); 
  });

  it('❌ 役なし：役がない場合は Error を投げる', () => {
    const dummyHand = createDummyHand(
      {
        fuuro: [{ type: 'chi', tiles: ['2m', '3m', '4m'] }],
        tehai: ['1m', '1m', '5m', '6m', '7m', '2p', '3p', '4p', '5s', '6s'],
        agariHai: '7s',
        agariType: 'ron',
      },
      { isRiichi: false },
    );

    const dummyParsedHand = createDummyParsedHand({
      janto: ['1m', '1m'],
      mentsuList: [
        new Mentsu('shuntsu', ['2m', '3m', '4m'], false),
        new Mentsu('shuntsu', ['5m', '6m', '7m'], true),
        new Mentsu('shuntsu', ['2p', '3p', '4p'], true),
        new Mentsu('shuntsu', ['5s', '6s', '7s'], true),
      ],
    });

    expect(() => judger.judge(dummyParsedHand, dummyHand))
      .toThrow('役がありません');
  });



//   it('🐉 ドラを正しく認識できる', () => {
//     const dummyHand = createDummyHand({}, {
//         dora: ["ton"]        
//     });

//     const dummyParsedHand = createDummyParsedHand();

//     expect(() => judger.judge(dummyParsedHand, dummyHand))
//       .toThrow('役がありません');
//   });
});