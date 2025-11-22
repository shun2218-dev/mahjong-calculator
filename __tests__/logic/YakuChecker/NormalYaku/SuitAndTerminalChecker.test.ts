import { beforeEach, describe, expect, it } from "vitest";
import { YAKU_LIST } from "@/const/YAKU_LIST";
import { SuitAndTerminalChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyHand } from "@/utils/vitest/helper";

describe("SuitAndTerminalChecker", () => {
	let checker: SuitAndTerminalChecker;

	beforeEach(() => {
		checker = new SuitAndTerminalChecker();
	});

	describe("checkHonitsu：混一色を正しく判定できる", () => {
		it("⭕️ 成立：マンズ + 字牌の場合", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1m",
					"2m",
					"3m",
					"4m",
					"5m",
					"6m",
					"7m",
					"8m",
					"9m",
					"ton",
					"ton",
					"ton",
					"haku",
					"haku",
				],
			});
			const result = checker.checkHonitsu(dummyHand);
			expect(result).toEqual(YAKU_LIST.HONITSU);
		});

		it("❌ 不成立：清一色の場合 (マンズのみ)", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1m",
					"2m",
					"3m",
					"4m",
					"5m",
					"6m",
					"7m",
					"8m",
					"9m",
					"1m",
					"1m",
					"2m",
					"3m",
					"4m",
				],
			});
			const result = checker.checkHonitsu(dummyHand);
			expect(result).toBeNull();
		});

		it("❌ 不成立：2色の場合 (マンズ + ピンズ)+ 字牌", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1m",
					"2m",
					"3m",
					"4m",
					"5m",
					"6m",
					"7m",
					"8m",
					"1p",
					"1p",
					"ton",
					"ton",
					"haku",
					"haku",
				],
			});
			const result = checker.checkHonitsu(dummyHand);
			expect(result).toBeNull();
		});
	});

	describe("checkChinitsu", () => {
		it("⭕️ 成立：ピンズのみの場合", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1p",
					"1p",
					"1p",
					"2p",
					"3p",
					"4p",
					"5p",
					"6p",
					"7p",
					"8p",
					"9p",
					"9p",
					"9p",
					"5p",
				],
			});
			const result = checker.checkChinitsu(dummyHand);
			expect(result).toEqual(YAKU_LIST.CHINITSU);
		});

		it("❌ 不成立：混一色の場合 (ピンズ + 字牌)", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1p",
					"1p",
					"1p",
					"2p",
					"3p",
					"4p",
					"5p",
					"6p",
					"7p",
					"8p",
					"9p",
					"ton",
					"ton",
					"ton",
				],
			});
			const result = checker.checkChinitsu(dummyHand);
			expect(result).toBeNull();
		});
	});

	describe("checkHonroutou", () => {
		it("⭕️ 成立：老頭牌の場合 (1, 9) + 字牌", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1m",
					"1m",
					"1m",
					"9m",
					"9m",
					"9m",
					"1p",
					"1p",
					"1p",
					"ton",
					"ton",
					"ton",
					"haku",
					"haku",
				],
			});
			const result = checker.checkHonroutou(dummyHand);
			expect(result).toEqual(YAKU_LIST.HONROUTOU);
		});

		it("❌ 不成立：清老頭の場合 (老頭牌のみ、字牌なし)", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1m",
					"1m",
					"1m",
					"9m",
					"9m",
					"9m",
					"1p",
					"1p",
					"1p",
					"9s",
					"9s",
					"9s",
					"1s",
					"1s",
				],
			});
			const result = checker.checkHonroutou(dummyHand);
			expect(result).toBeNull(); // 混老頭ではない（清老頭）
		});

		it("❌ 不成立：字一色の場合 (字牌のみ、老頭牌なし)", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"ton",
					"ton",
					"ton",
					"nan",
					"nan",
					"nan",
					"sha",
					"sha",
					"sha",
					"pei",
					"pei",
					"pei",
					"haku",
					"haku",
				],
			});
			const result = checker.checkHonroutou(dummyHand);
			expect(result).toBeNull(); // 混老頭ではない（字一色）
		});

		it("❌ 不成立：チャンタの場合 (中張牌の順子を含む)", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1m",
					"2m",
					"3m",
					"9p",
					"9p",
					"9p",
					"1s",
					"1s",
					"1s",
					"ton",
					"ton",
					"ton",
					"hatsu",
					"hatsu",
				],
			});
			const result = checker.checkHonroutou(dummyHand);
			expect(result).toBeNull();
		});
	});
});
