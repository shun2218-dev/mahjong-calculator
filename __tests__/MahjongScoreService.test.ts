import type { PointResult } from "@/logic/PointCalculator/PointCalculator";
import { MahjongScoreService } from "@/MahjongScoreService/MahjongScoreService";
import type { CalculateRequestDto } from "@/types";
import { describe, expect, it } from "vitest";

describe('MahjongScoreService Integration Test', () => {
  const service = new MahjongScoreService();

  it('⭕️ 統合テスト：メンゼン・ピンフ・ツモ・ドラ1 の手', () => {
    const dto: CalculateRequestDto = {
      tehai: ['1m', '2m', '3m', '4m', '5m', '6m', '7p', '8p', '9p', '1s', '1s', '2s', '3s', '4s'],
      agariHai: '4s',
      agariType: 'tsumo',
      fuuro: [],
      status: {
        bakaze: "ton",
        jikaze: "nan",
        isRiichi: false,
        dora: ['2s'],
        uradora: []
      }
    };

    const result = service.calculateScore(dto);

    expect(result).not.toBeInstanceOf(Error);
    const point = result as PointResult;

    // ピンフ(1) + ツモ(1) + ドラ(1) = 3翻
    // 符は 20符 (ピンフツモ)
    // kihonten = 30 * 2^(3+2) ... ではなく、
    // YakuResult(3翻) + Fu(20) -> PointCalculator へ
    
    expect(point.name).toBe('20符3翻');
    expect(point.total).toBe(2700); // 1300 + 700*2
    expect(point.oya).toBe(1300);
    expect(point.ko).toBe(700);
  });

  it('⭕️ 統合テスト：符計算（通常）の場合（鳴き・役牌・カンチャン）', () => {
    const dto: CalculateRequestDto = {
      tehai: ['3m', '5m', '1p', '1p', '2s', '3s', '4s', '7p', '8p', '9p'],
      agariHai: '4m',
      agariType: 'ron',
      fuuro: [
        { type: 'pon', tiles: ['ton', 'ton', 'ton'] }
      ],
      status: {
        bakaze: 'ton',
        jikaze: 'nan',
        isRiichi: false,
        dora: [],
        uradora: []
      }
    };

    const result = service.calculateScore(dto);

    expect(result).not.toBeInstanceOf(Error);
    const point = result as PointResult;

    // 役: 役牌: 場風 (1翻)
    // 符: 
    //   Base(20)
    // + Agari(0) (鳴きロン)
    // + Mentsu( [ton(明刻,么九)]: 4符 )
    // + Janto(0) (1p)
    // + Machi(2) (カンチャン)
    // = 26符 -> 切り上げ 30符
    //
    // 点数: 30符1翻・子・ロン
    // kihonten = 30 * 2^(1+2) = 240
    // 240 * 4 = 960 -> 1000点
    expect(point.name).toBe('30符1翻');
    expect(point.total).toBe(1000);
  });

  it('⭕️ 統合テスト：七対子・ドラ2 の場合', () => {
    const dto: CalculateRequestDto = {
      tehai: ['1m', '1m', '2m', '2m', '3p', '3p', '4s', '4s', '5s', '5s', '6m', '6m', 'ton', 'ton'],
      agariHai: 'ton',
      agariType: 'tsumo',
      fuuro: [],
      status: {
        bakaze: "ton",
        jikaze: "nan",
        isRiichi: false,
        dora: ['1m', '2m'],
        uradora: []
      }
    };
    
    const result = service.calculateScore(dto);
    
    expect(result).not.toBeInstanceOf(Error);
    const point = result as PointResult;    


    // 役: 七対子(2) + ドラ(2) = 4翻
    // 符: 25符 (固定)
    // 点数: 満貫・子・ツモ
    // kihonten = 2000
    // Oya: 2000 * 2 = 4000
    // Ko: 2000 * 1 = 2000
    // Total: 8000 (3200 + 1600*2)
    expect(point.name).toBe('満貫');
    expect(point.total).toBe(8000);
    expect(point.oya).toBe(4000);
    expect(point.ko).toBe(2000);
  });

  it('⭕️ 統合テスト：国士無双 (13面待ち) の場合', () => {
    // Arrange: 国士13面待ち
    const dto: CalculateRequestDto = {
      tehai: ['1m', '9m', '1s', '9s', '1p', '9p', 'ton', 'nan', 'sha', 'pei', 'haku', 'hatsu', 'chun'],
      agariHai: 'ton', // 14枚目
      agariType: 'ron',
      fuuro: [],
      status: {
        bakaze: 'ton',
        jikaze: 'nan',
        dora: [],
        uradora: []
      }
    };
    
    const result = service.calculateScore(dto);
    
    expect(result).not.toBeInstanceOf(Error);
    const point = result as PointResult;

    // 役: 国士無双13面待ち (ダブル役満)
    // 点数: 子・ロン (64000点)
    expect(point.total).toBe(64000);
    expect(point.name).toBe('国士無双13面待ち');
  });

  it('❌ エラー：アガリ形ではない場合', () => {
    const dto: CalculateRequestDto = {
      tehai: ['1m', '1m', '2p', '3p', '4p', '5s', '6s', '7s', '8p', '8p'],
      agariHai: '9p',
      agariType: 'ron',
      fuuro: [
        { type: 'chi', tiles: ['1s', '2s', '3s'] }
      ],
      status: {        
        bakaze: 'ton',
        jikaze: 'nan',
        dora: [],
        uradora: []
      }
    };
    
    const result = service.calculateScore(dto);
    
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('アガリ形ではありません');
  });

  it('❌ エラー：役なし の場合', () => {
    const dto: CalculateRequestDto = {
      tehai: ['1m', '1m', '2p', '3p', '4p', '5s', '6s', '7s', '7p', '8p'],
      agariHai: '9p',
      agariType: 'ron',
      fuuro: [
        { type: 'chi', tiles: ['1s', '2s', '3s'] }
      ],
      status: {        
        bakaze: 'ton',
        jikaze: 'nan',
        dora: [],
        uradora: []
      }
    };
    
    const result = service.calculateScore(dto);
    
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('役がありません');
  });
});