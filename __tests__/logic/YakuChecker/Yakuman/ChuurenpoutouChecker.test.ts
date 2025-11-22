import { beforeEach, describe, expect, it } from "vitest";
import { ChuurenpoutouChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyHand } from "@/utils/vitest/helper";

describe("ChuurenpoutouChecker", () => {
	let checker: ChuurenpoutouChecker;

	beforeEach(() => {
		checker = new ChuurenpoutouChecker();
	});

	describe("九蓮宝燈を正しく判定できる", () => {
		it("⭕️ 成立：純正九蓮宝燈 の場合 (9面待ち)", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1m",
					"1m",
					"1m",
					"2m",
					"3m",
					"4m",
					"5m",
					"5m",
					"6m",
					"7m",
					"8m",
					"9m",
					"9m",
					"9m",
				],
				agariHai: "5m",
			});

			const result = checker.check(dummyHand);

			expect(result.isChuurenpoutou).toBe(true);
			expect(result.isJyunsei).toBe(true);
		});

		it("⭕️ 成立：通常九蓮宝燈 の場合 (1面待ち)", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1m",
					"1m",
					"1m",
					"1m",
					"2m",
					"3m",
					"4m",
					"5m",
					"6m",
					"7m",
					"8m",
					"9m",
					"9m",
					"9m",
				],
				agariHai: "5m",
			});

			const result = checker.check(dummyHand);

			expect(result.isChuurenpoutou).toBe(true);
			expect(result.isJyunsei).toBe(false);
		});

		it("❌ 不成立：鳴いている場合（門前ではない）", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1m",
					"1m",
					"1m",
					"2m",
					"3m",
					"4m",
					"5m",
					"5m",
					"6m",
					"7m",
					"8m",
					"9m",
					"9m",
					"9m",
				],
				agariHai: "5m",
				fuuro: [{ type: "pon", tiles: ["5m", "5m", "5m"] }],
			});

			const result = checker.check(dummyHand);

			expect(result.isChuurenpoutou).toBe(false);
		});

		it("❌ 不成立：清一色だが形が違う場合（七対子）", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1m",
					"1m",
					"2m",
					"2m",
					"3m",
					"3m",
					"4m",
					"4m",
					"5m",
					"5m",
					"6m",
					"6m",
					"7m",
					"7m",
				],
				agariHai: "7m",
			});

			const result = checker.check(dummyHand);

			expect(result.isChuurenpoutou).toBe(false);
		});
	});
});
