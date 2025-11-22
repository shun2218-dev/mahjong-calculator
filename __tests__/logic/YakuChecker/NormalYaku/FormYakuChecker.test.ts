import { beforeEach, describe, expect, it } from "vitest";
import { YAKU_LIST } from "@/const/YAKU_LIST";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { FormYakuChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyHand, createDummyParsedHand } from "@/utils/vitest/helper";

describe("FormYakuChecker", () => {
	let checker: FormYakuChecker;

	beforeEach(() => {
		checker = new FormYakuChecker();
	});

	describe("形による役を正しく判定できる", () => {
		describe("checkTanyao：断么九 を正しく判定できる", () => {
			it("⭕️ 成立：么九牌 が1つもない場合", () => {
				const dummyHand = createDummyHand({
					tehai: [
						"2m",
						"3m",
						"4m",
						"5p",
						"5p",
						"6s",
						"7s",
						"8s",
						"2p",
						"3p",
						"4p",
					],
					fuuro: [{ type: "pon", tiles: ["5s", "5s", "5s"] }],
					agariHai: "4p",
					agariType: "ron",
				});

				const result = checker.checkTanyao(dummyHand);

				expect(result).toEqual(YAKU_LIST.TANYAOCHUU);
			});

			it("❌ 不成立：1が含まれている場合", () => {
				const dummyHand = createDummyHand({
					tehai: [
						"1m",
						"2m",
						"3m",
						"5p",
						"5p",
						"6s",
						"7s",
						"8s",
						"2p",
						"3p",
						"4p",
					],
					fuuro: [{ type: "pon", tiles: ["5s", "5s", "5s"] }],
					agariHai: "4p",
					agariType: "ron",
				});

				const result = checker.checkTanyao(dummyHand);

				expect(result).toBeNull();
			});

			it("❌ 不成立：9が含まれている場合", () => {
				const dummyHand = createDummyHand({
					tehai: [
						"2m",
						"3m",
						"4m",
						"5p",
						"5p",
						"7s",
						"8s",
						"9s",
						"2p",
						"3p",
						"4p",
					],
					fuuro: [{ type: "pon", tiles: ["5s", "5s", "5s"] }],
					agariHai: "4p",
					agariType: "ron",
				});

				const result = checker.checkTanyao(dummyHand);

				expect(result).toBeNull();
			});

			it("❌ 不成立：字牌が含まれている場合", () => {
				const dummyHand = createDummyHand({
					tehai: [
						"1m",
						"2m",
						"3m",
						"6s",
						"7s",
						"8s",
						"2p",
						"3p",
						"4p",
						"haku",
						"haku",
					],
					fuuro: [{ type: "pon", tiles: ["5s", "5s", "5s"] }],
					agariHai: "4p",
					agariType: "ron",
				});

				const result = checker.checkTanyao(dummyHand);

				expect(result).toBeNull();
			});
		});

		describe("checkYakuhai：役牌 を正しく判定できる", () => {
			it("⭕️ 成立：三元牌 (白・發・中) がある場合", () => {
				const mentsuList = [
					new Mentsu("koutsu", ["haku", "haku", "haku"], false),
					new Mentsu("koutsu", ["hatsu", "hatsu", "hatsu"], true),
					new Mentsu("koutsu", ["chun", "chun", "chun"], false),
					new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
				];
				const dummyParsedHand = createDummyParsedHand({ mentsuList });
				const dummyHand = createDummyHand();

				const result = checker.checkYakuhai(dummyParsedHand, dummyHand);

				expect(result).toHaveLength(3);
				expect(result).toContain(YAKU_LIST.YAKUHAI_HAKU);
				expect(result).toContain(YAKU_LIST.YAKUHAI_HATSU);
				expect(result).toContain(YAKU_LIST.YAKUHAI_CHUN);
			});

			it("⭕️ 成立：場風役 の場合", () => {
				const mentsuList = [
					new Mentsu("shuntsu", ["1p", "2p", "3p"], false),
					new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
					new Mentsu("shuntsu", ["5s", "6s", "7s"], true),
					new Mentsu("koutsu", ["ton", "ton", "ton"], false),
				];
				const dummyParsedHand = createDummyParsedHand({ mentsuList });
				const dummyHand = createDummyHand({}, { bakaze: "ton", jikaze: "nan" });

				const result = checker.checkYakuhai(dummyParsedHand, dummyHand);

				expect(result).toHaveLength(1);
				expect(result).toContain(YAKU_LIST.YAKUHAI_BAKAZE);
			});

			it("⭕️ 成立：自風役の場合", () => {
				const mentsuList = [
					new Mentsu("shuntsu", ["1p", "2p", "3p"], false),
					new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
					new Mentsu("shuntsu", ["5s", "6s", "7s"], true),
					new Mentsu("koutsu", ["ton", "ton", "ton"], false),
				];
				const dummyParsedHand = createDummyParsedHand({ mentsuList });
				const dummyHand = createDummyHand({}, { bakaze: "nan", jikaze: "ton" });

				const result = checker.checkYakuhai(dummyParsedHand, dummyHand);

				expect(result).toHaveLength(1);
				expect(result).toContain(YAKU_LIST.YAKUHAI_JIKAZE);
			});

			it("⭕️ 成立：場風役と自風役の複合している場合", () => {
				const mentsuList = [
					new Mentsu("shuntsu", ["1p", "2p", "3p"], false),
					new Mentsu("shuntsu", ["1m", "2m", "3m"], true),
					new Mentsu("shuntsu", ["5s", "6s", "7s"], true),
					new Mentsu("koutsu", ["ton", "ton", "ton"], false),
				];
				const dummyParsedHand = createDummyParsedHand({ mentsuList });
				const dummyHand = createDummyHand({}, { bakaze: "ton", jikaze: "ton" });

				const result = checker.checkYakuhai(dummyParsedHand, dummyHand);

				expect(result).toHaveLength(2);
				expect(result).toContain(YAKU_LIST.YAKUHAI_BAKAZE);
				expect(result).toContain(YAKU_LIST.YAKUHAI_JIKAZE);
			});

			it("❌ 不成立：役牌が雀頭の場合", () => {
				const dummyParsedHand = createDummyParsedHand({
					janto: ["haku", "haku"],
				});
				const dummyHand = createDummyHand();

				const result = checker.checkYakuhai(dummyParsedHand, dummyHand);

				expect(result).toHaveLength(0);
			});
		});

		describe("checkSanankou：三暗刻 を正しく判定できる", () => {
			it("⭕️ 成立：暗刻 (暗槓) が3つの場合", () => {
				const mentsuList = [
					new Mentsu("koutsu", ["1m", "1m", "1m"], true),
					new Mentsu("koutsu", ["2p", "2p", "2p"], true),
					new Mentsu("kantsu", ["5p", "5p", "5p", "5p"], true),
					new Mentsu("koutsu", ["1s", "1s", "1s"], false),
				];
				const dummyParsedHand = createDummyParsedHand({ mentsuList });

				const result = checker.checkSanankou(dummyParsedHand);

				expect(result).toEqual(YAKU_LIST.SANANKOU);
			});

			it("❌ 不成立：暗刻2つ・明刻が1つの場合", () => {
				const mentsuList = [
					new Mentsu("koutsu", ["1m", "1m", "1m"], true),
					new Mentsu("koutsu", ["2p", "2p", "2p"], false),
					new Mentsu("kantsu", ["5p", "5p", "5p"], true),
					new Mentsu("shuntsu", ["1s", "2s", "3s"], true),
				];
				const dummyParsedHand = createDummyParsedHand({ mentsuList });

				const result = checker.checkSanankou(dummyParsedHand);

				expect(result).toBeNull();
			});
		});

		describe("checkShousangen：小三元 を正しく判定できる", () => {
			it("⭕️ 成立：雀頭が三元牌かつ三元牌の刻子が2つの場合", () => {
				const mentsuList = [
					new Mentsu("koutsu", ["haku", "haku", "haku"], true),
					new Mentsu("koutsu", ["chun", "chun", "chun"], true),
					new Mentsu("kantsu", ["5p", "5p", "5p"], true),
					new Mentsu("koutsu", ["1s", "1s", "1s"], true),
				];
				const dummyParsedHand = createDummyParsedHand({
					mentsuList,
					janto: ["hatsu", "hatsu"],
				});

				const result = checker.checkShousangen(dummyParsedHand);

				expect(result).toEqual(YAKU_LIST.SHOUSANGEN);
			});

			it("❌ 不成立：雀頭が三元牌ではない場合", () => {
				const mentsuList = [
					new Mentsu("koutsu", ["haku", "haku", "haku"], true),
					new Mentsu("koutsu", ["chun", "chun", "chun"], true),
					new Mentsu("kantsu", ["5p", "5p", "5p", "5p"], true),
					new Mentsu("koutsu", ["1s", "1s", "1s"], true),
				];
				const dummyParsedHand = createDummyParsedHand({
					mentsuList,
					janto: ["1p", "1p"],
				});

				const result = checker.checkShousangen(dummyParsedHand);

				expect(result).toBeNull();
			});

			it("❌ 不成立：三元牌の刻子が1つしかない場合", () => {
				const mentsuList = [
					new Mentsu("koutsu", ["haku", "haku", "haku"], true),
					new Mentsu("koutsu", ["4m", "4m", "4m"], true),
					new Mentsu("kantsu", ["5p", "5p", "5p"], true),
					new Mentsu("koutsu", ["1s", "1s", "1s"], true),
				];
				const dummyParsedHand = createDummyParsedHand({
					mentsuList,
					janto: ["hatsu", "hatsu"],
				});

				const result = checker.checkShousangen(dummyParsedHand);

				expect(result).toBeNull();
			});
		});
	});
});
