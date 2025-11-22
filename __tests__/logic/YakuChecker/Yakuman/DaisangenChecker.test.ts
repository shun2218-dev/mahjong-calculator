import { beforeEach, describe, expect, it } from "vitest";
import { YAKU_LIST } from "@/const/YAKU_LIST";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { DaisangenChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyParsedHand } from "@/utils/vitest/helper";

describe("DaisangenChecker", () => {
	let checker: DaisangenChecker;

	beforeEach(() => {
		checker = new DaisangenChecker();
	});

	describe("大三元を正しく判定できる", () => {
		it("⭕️ 成立：白・發・中の刻子（槓子）が揃っている場合（鳴き含む）", () => {
			const mentsuList = [
				new Mentsu("koutsu", ["haku", "haku", "haku"], false), // 👈 ポン
				new Mentsu("koutsu", ["hatsu", "hatsu", "hatsu"], true), // 👈 暗刻
				new Mentsu("kantsu", ["chun", "chun", "chun", "chun"], false), // 👈 明槓
				new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
			];
			const dummyParsedHand = createDummyParsedHand({ mentsuList });

			const result = checker.check(dummyParsedHand);

			expect(result).toEqual(YAKU_LIST.DAISANGEN);
		});

		it("❌ 不成立：小三元（雀頭が白）の場合", () => {
			const mentsuList = [
				// (白の刻子がない)
				new Mentsu("koutsu", ["hatsu", "hatsu", "hatsu"], true),
				new Mentsu("koutsu", ["chun", "chun", "chun"], true),
				new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
				new Mentsu("shuntsu", ["4m", "5m", "6m"], true),
			];
			const dummyParsedHand = createDummyParsedHand({
				agariForm: "standard",
				mentsuList: mentsuList,
				janto: ["haku", "haku"],
			});

			const result = checker.check(dummyParsedHand);

			expect(result).toBeNull();
		});
	});
});
