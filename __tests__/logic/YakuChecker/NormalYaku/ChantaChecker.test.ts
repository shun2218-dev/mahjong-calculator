import { beforeEach, describe, expect, it } from "vitest";
import { YAKU_LIST } from "@/const/YAKU_LIST";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { ChantaChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyParsedHand } from "@/utils/vitest/helper";

describe("ChantaChecker", () => {
	let checker: ChantaChecker;

	beforeEach(() => {
		checker = new ChantaChecker();
	});

	describe("混全帯么九を正しく判定できる", () => {
		it("⭕️ 成立：鳴いている場合", () => {
			const mentsuList = [
				new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
				new Mentsu("shuntsu", ["7p", "8p", "9p"], true),
				new Mentsu("koutsu", ["1s", "1s", "1s"], true),
				new Mentsu("koutsu", ["9s", "9s", "9s"], false),
			];
			const dummyParsedHand = createDummyParsedHand({
				mentsuList,
				janto: ["ton", "ton"],
			});

			const result = checker.checkChanta(dummyParsedHand);

			expect(result).toEqual(YAKU_LIST.HONCHANTAIYAOCHUU);
		});

		it("❌ 不成立：断么九の場合 (1,9,字牌を含まない) ", () => {
			const mentsuList = [
				new Mentsu("shuntsu", ["2m", "3m", "4m"], true),
				new Mentsu("shuntsu", ["6m", "7m", "8m"], true),
				new Mentsu("koutsu", ["2s", "2s", "2s"], true),
				new Mentsu("koutsu", ["6s", "6s", "6s"], false),
			];
			const dummyParsedHand = createDummyParsedHand({
				mentsuList,
				janto: ["5s", "5s"],
			});

			const result = checker.checkChanta(dummyParsedHand);

			expect(result).toBeNull();
		});

		it("❌ 不成立：清老頭の場合 (順子を含まない) ", () => {
			const mentsuList = [
				new Mentsu("shuntsu", ["1m", "1m", "1m"], true),
				new Mentsu("shuntsu", ["9p", "9p", "9p"], true),
				new Mentsu("koutsu", ["1s", "1s", "1s"], true),
				new Mentsu("koutsu", ["ton", "ton", "ton"], false),
			];
			const dummyParsedHand = createDummyParsedHand({
				mentsuList,
				janto: ["hatsu", "hatsu"],
			});

			const result = checker.checkChanta(dummyParsedHand);

			expect(result).toBeNull();
		});
	});

	describe("純全帯么九を正しく判定できる", () => {
		it("⭕️ 成立：鳴いている場合", () => {
			const mentsuList = [
				new Mentsu("shuntsu", ["1p", "2p", "3p"], true),
				new Mentsu("shuntsu", ["7s", "8s", "9s"], true),
				new Mentsu("koutsu", ["1s", "1s", "1s"], true),
				new Mentsu("koutsu", ["9m", "9m", "9m"], false),
			];
			const dummyParsedHand = createDummyParsedHand({
				mentsuList,
				janto: ["1m", "1m"],
			});

			const result = checker.checkJyunchan(dummyParsedHand);

			expect(result).toEqual(YAKU_LIST.JYUNCHANTAIYAOCHUU);
		});

		it("❌ 不成立：混全帯么九の場合 (1,9,字牌を含まない) ", () => {
			const mentsuList = [
				new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
				new Mentsu("shuntsu", ["7p", "8p", "9p"], true),
				new Mentsu("koutsu", ["1s", "1s", "1s"], true),
				new Mentsu("koutsu", ["9m", "9m", "9m"], false),
			];
			const dummyParsedHand = createDummyParsedHand({
				mentsuList,
				janto: ["ton", "ton"],
			});

			const result = checker.checkJyunchan(dummyParsedHand);

			expect(result).toBeNull();
		});

		it("❌ 不成立：混老頭の場合 (順子を含まない) ", () => {
			const mentsuList = [
				new Mentsu("shuntsu", ["1m", "1m", "1m"], true),
				new Mentsu("shuntsu", ["9p", "9p", "9p"], true),
				new Mentsu("koutsu", ["1s", "1s", "1s"], true),
				new Mentsu("koutsu", ["ton", "ton", "ton"], false),
			];
			const dummyParsedHand = createDummyParsedHand({
				mentsuList,
				janto: ["hatsu", "hatsu"],
			});

			const result = checker.checkJyunchan(dummyParsedHand);

			expect(result).toBeNull();
		});
	});
});
