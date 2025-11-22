import { beforeEach, describe, expect, it } from "vitest";
import { YAKU_LIST } from "@/const/YAKU_LIST";
import { RyuuiisouChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyHand } from "@/utils/vitest/helper";

describe("RyuuiisouChecker", () => {
	let checker: RyuuiisouChecker;

	beforeEach(() => {
		checker = new RyuuiisouChecker();
	});

	describe("緑一色を正しく判定できる", () => {
		it("⭕️ 成立：緑一色 の場合 (發あり、ソーズのみ)", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"2s",
					"2s",
					"2s",
					"3s",
					"4s",
					"6s",
					"6s",
					"6s",
					"8s",
					"8s",
					"hatsu",
					"hatsu",
					"hatsu",
					"4s",
				],
			});

			const result = checker.check(dummyHand);

			expect(result).toEqual(YAKU_LIST.RYUUIISOU);
		});

		it("⭕️ 成立：緑一色 の場合 (發なし、ソーズのみ)", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"2s",
					"2s",
					"2s",
					"3s",
					"4s",
					"6s",
					"6s",
					"6s",
					"8s",
					"8s",
					"8s",
					"4s",
					"3s",
					"4s",
				],
			});

			const result = checker.check(dummyHand);

			expect(result).toEqual(YAKU_LIST.RYUUIISOU);
		});

		it("❌ 不成立：緑以外のソーズ (5s) が混ざっている場合", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"2s",
					"2s",
					"2s",
					"3s",
					"4s",
					"5s",
					"6s",
					"6s",
					"8s",
					"8s",
					"hatsu",
					"hatsu",
					"hatsu",
					"4s",
				],
			});

			const result = checker.check(dummyHand);

			expect(result).toBeNull();
		});

		it("❌ 不成立：他の色 (1m) が混ざっている場合", () => {
			const dummyHand = createDummyHand({
				tehai: [
					"1m",
					"2s",
					"2s",
					"3s",
					"4s",
					"6s",
					"6s",
					"8s",
					"8s",
					"hatsu",
					"hatsu",
					"hatsu",
					"4s",
					"3s",
				],
			});

			const result = checker.check(dummyHand);

			expect(result).toBeNull();
		});
	});
});
