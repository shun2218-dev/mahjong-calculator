import { beforeEach, describe, expect, it } from "vitest";
import { YAKU_LIST } from "@/const/YAKU_LIST";
import { PointCalculator } from "@/logic/PointCalculator/PointCalculator";
import { createDummyHand, createDummyYakuResult } from "@/utils/vitest/helper";

describe("PointCalculator", () => {
	let calculator: PointCalculator;

	beforeEach(() => {
		calculator = new PointCalculator();
	});

	describe("役満", () => {
		it("⭕️ 成立：役満（大三元）・子・ロン (32000点)", () => {
			const yakuList = [YAKU_LIST.DAISANGEN];
			const yakuResult = createDummyYakuResult(yakuList);
			const fu = 0;
			const dummyHand = createDummyHand(
				{ agariType: "ron" },
				{ jikaze: "nan" },
			);

			const result = calculator.calculate(yakuResult, fu, dummyHand);

			expect(result.total).toBe(32000);
			expect(result.name).toBe("大三元");
		});

		it("⭕️ 成立：ダブル役満（四暗刻単騎）・親・ツモ (16000点オール)", () => {
			const yakuList = [YAKU_LIST.SUUANKOUTANKI];
			const yakuResult = createDummyYakuResult(yakuList);
			const fu = 0;
			const dummyHand = createDummyHand(
				{ agariType: "tsumo" },
				{ jikaze: "ton" },
			);

			const result = calculator.calculate(yakuResult, fu, dummyHand);

			expect(result.total).toBe(96000);
			expect(result.oya).toBe(0);
			expect(result.ko).toBe(32000);
			expect(result.name).toBe("四暗刻単騎待ち");
		});

		it("⭕️ 成立：数え役満 (13翻)・子・ロン (32000点)", () => {
			// 役満ではない役で 13翻
			const yakuList = [
				YAKU_LIST.CHINITSU,
				YAKU_LIST.RYANPEIKOU,
				YAKU_LIST.TANYAOCHUU,
				YAKU_LIST.RIICHI,
			];
			const yakuResult = createDummyYakuResult(yakuList, 2);
			const fu = 40;
			const dummyHand = createDummyHand(
				{ agariType: "ron" },
				{ jikaze: "nan" },
			);

			const result = calculator.calculate(yakuResult, fu, dummyHand);

			expect(result.total).toBe(32000);
			expect(result.name).toBe("数え役満");
		});
	});

	describe("満貫〜三倍満", () => {
		it("⭕️ 成立：跳満 (6翻)・親・ロン (18000点)", () => {
			const yakuResult = createDummyYakuResult([
				YAKU_LIST.CHINITSU,
				YAKU_LIST.TANYAOCHUU,
			]);
			const fu = 30;
			const dummyHand = createDummyHand(
				{ agariType: "ron" },
				{ jikaze: "ton" },
			);

			const result = calculator.calculate(yakuResult, fu, dummyHand);

			expect(result.total).toBe(18000);
			expect(result.name).toBe("跳満");
		});

		it("⭕️ 成立：倍満 (8翻)・子・ツモ (4000/8000点)", () => {
			const yakuResult = createDummyYakuResult([], 8);
			const fu = 30;
			const dummyHand = createDummyHand(
				{ agariType: "tsumo" },
				{ jikaze: "nan" },
			);

			const result = calculator.calculate(yakuResult, fu, dummyHand);

			expect(result.total).toBe(16000);
			expect(result.oya).toBe(8000);
			expect(result.ko).toBe(4000);
			expect(result.name).toBe("倍満");
		});
	});

	describe("満貫未満", () => {
		it("⭕️ 成立：3翻30符・子・ロン (3900点)", () => {
			// (kihonten = 30 * 2^(3+2) = 30 * 32 = 960)
			const yakuResult = createDummyYakuResult([
				YAKU_LIST.RIICHI,
				YAKU_LIST.TANYAOCHUU,
				YAKU_LIST.PINFU,
			]);
			const fu = 30;
			const dummyHand = createDummyHand(
				{ agariType: "ron" },
				{ jikaze: "nan" },
			); // 子・ロン

			// 960 * 4 = 3840 -> 3900
			const result = calculator.calculate(yakuResult, fu, dummyHand);

			expect(result.total).toBe(3900);
			expect(result.name).toBe("30符3翻");
		});

		it("⭕️ 成立：2翻40符・子・ツモ (700/1300点)", () => {
			// (kihonten = 40 * 2^(2+2) = 40 * 16 = 640)
			const yakuResult = createDummyYakuResult([
				YAKU_LIST.TANYAOCHUU,
				YAKU_LIST.YAKUHAI_HAKU,
			]);
			const fu = 40;
			const dummyHand = createDummyHand(
				{ agariType: "tsumo" },
				{ jikaze: "nan" },
			); // 子・ツモ

			// Oya: 640 * 2 = 1280 -> 1300
			// Ko: 640 * 1 = 640 -> 700
			const result = calculator.calculate(yakuResult, fu, dummyHand);

			expect(result.total).toBe(2700); // 1300 + 700*2
			expect(result.oya).toBe(1300);
			expect(result.ko).toBe(700);
			expect(result.name).toBe("40符2翻");
		});

		it("⭕️ 成立：4翻25符 (七対子)・親・ロン (9600点)", () => {
			// (kihonten = 25 * 2^(4+2) = 25 * 64 = 1600)
			const yakuResult = createDummyYakuResult([
				YAKU_LIST.CHIITOITSU,
				YAKU_LIST.HONITSU,
			]);
			const fu = 25;
			const dummyHand = createDummyHand(
				{ agariType: "ron" },
				{ jikaze: "ton" },
			); // 親・ロン

			// 1600 * 6 = 9600
			const result = calculator.calculate(yakuResult, fu, dummyHand);

			expect(result.total).toBe(12000);
			expect(result.name).toBe("満貫");
		});

		it("⭕️ 成立：切り上げ満貫 (3翻70符)・子・ロン (8000点)", () => {
			// (kihonten = 70 * 2^(3+2) = 70 * 32 = 2240)
			const yakuResult = createDummyYakuResult([
				YAKU_LIST.TOITOIHOU,
				YAKU_LIST.YAKUHAI_HAKU,
			]);
			const fu = 70;
			const dummyHand = createDummyHand(
				{ agariType: "ron" },
				{ jikaze: "nan" },
			); // 子・ロン

			// 2240 > 2000 kihonten = 2000 (満貫)
			// 2000 * 4 = 8000
			const result = calculator.calculate(yakuResult, fu, dummyHand);

			expect(result.total).toBe(8000);
			expect(result.name).toBe("満貫");
		});
	});
});
