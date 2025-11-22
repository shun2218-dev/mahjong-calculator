import { describe, expect, it } from "vitest";
import { Hand } from "@/logic/Hand/Hand";

describe("Hand", () => {
	it("isMenzenが正しく判定できるか", () => {
		const dummyHandMenzen = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHandMenzen.isMenzen).toBe(true);

		const dummyHandNaki = new Hand({
			tehai: ["2m", "3m", "4m", "5m", "6m", "7m", "8m", "8m", "8m", "9m", "9m"],
			fuuro: [{ type: "pon", tiles: ["1m", "1m", "1m"] }],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHandNaki.isMenzen).toBe(false);
	});

	it("isTsumoが正しく判定できるか", () => {
		const dummyHandTsumo = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHandTsumo.isTsumo).toBe(true);

		const dummyHandRon = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "ron",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHandRon.isTsumo).toBe(false);
	});

	it("isOyaが正しく判定できるか", () => {
		const dummyHandOya = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "ton",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHandOya.isOya).toBe(true);

		const dummyHandKo = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHandKo.isOya).toBe(false);
	});

	it("isRiichiが正しく判定できるか", () => {
		const dummyHandRiichi = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
				isRiichi: true,
			},
		});

		expect(dummyHandRiichi.isRiichi).toBe(true);

		const dummyHand = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHand.isRiichi).toBe(false);
	});

	it("isIppatsuが正しく判定できるか", () => {
		const dummyHandIppatsu = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
				isIppatsu: true,
			},
		});

		expect(dummyHandIppatsu.isIppatsu).toBe(true);

		const dummyHand = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHand.isIppatsu).toBe(false);
	});

	it("isHaiteiが正しく判定できるか", () => {
		const dummyHandHaitei = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
				isHaitei: true,
			},
		});

		expect(dummyHandHaitei.isHaitei).toBe(true);

		const dummyHand = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHand.isHaitei).toBe(false);
	});

	it("isRinshanが正しく判定できるか", () => {
		const dummyHandRinshan = new Hand({
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [{ type: "ankan", tiles: ["1m", "1m", "1m", "1m"] }],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
				isRinshan: true,
			},
		});

		expect(dummyHandRinshan.isRinshan).toBe(true);

		const dummyHand = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHand.isRinshan).toBe(false);
	});

	it("isChankanが正しく判定できるか", () => {
		const dummyHandChankan = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "ron",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
				isChankan: true,
			},
		});

		expect(dummyHandChankan.isChankan).toBe(true);

		const dummyHand = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHand.isChankan).toBe(false);
	});

	it("isDoubleRiichiが正しく判定できるか", () => {
		const dummyHandDoubleRiichi = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "ron",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
				isDoubleRiichi: true,
			},
		});

		expect(dummyHandDoubleRiichi.isDoubleRiichi).toBe(true);

		const dummyHand = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHand.isDoubleRiichi).toBe(false);
	});

	it("isTenhouが正しく判定できるか", () => {
		const dummyHandTenhou = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
				isTenhou: true,
			},
		});

		expect(dummyHandTenhou.isTenhou).toBe(true);

		const dummyHand = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHand.isTenhou).toBe(false);
	});

	it("isChiihouが正しく判定できるか", () => {
		const dummyHandChiihou = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "ron",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
				isChiihou: true,
			},
		});

		expect(dummyHandChiihou.isChiihou).toBe(true);

		const dummyHand = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHand.isChiihou).toBe(false);
	});

	it("allTilesが正しく取得できるか", () => {
		const dummyHandTsumo = new Hand({
			tehai: [
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
				"8m",
				"8m",
				"9m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "tsumo",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHandTsumo.allTiles).toEqual([
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
			"8m",
			"8m",
			"9m",
			"9m",
		]);

		const dummyHandRon = new Hand({
			tehai: [
				"1s",
				"1s",
				"1s",
				"2m",
				"3m",
				"4m",
				"5m",
				"6m",
				"7m",
				"8m",
				"8m",
				"8m",
				"9m",
			],
			fuuro: [],
			agariHai: "9m",
			agariType: "ron",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHandRon.allTiles).toEqual([
			"1s",
			"1s",
			"1s",
			"2m",
			"3m",
			"4m",
			"5m",
			"6m",
			"7m",
			"8m",
			"8m",
			"8m",
			"9m",
			"9m",
		]);

		const dummyHandNaki = new Hand({
			tehai: ["3m", "3m", "3m", "4m", "4m", "4m", "9m"],
			fuuro: [
				{ type: "pon", tiles: ["1s", "1s", "1s"] },
				{ type: "pon", tiles: ["8m", "8m", "8m"] },
			],
			agariHai: "9m",
			agariType: "ron",
			status: {
				bakaze: "ton",
				jikaze: "nan",
				dora: [],
				uradora: [],
			},
		});

		expect(dummyHandNaki.allTiles).toEqual([
			"1s",
			"1s",
			"1s",
			"3m",
			"3m",
			"3m",
			"4m",
			"4m",
			"4m",
			"8m",
			"8m",
			"8m",
			"9m",
			"9m",
		]);
	});

	describe("tehaiCountsが正しく取得できるか", () => {
		it("tehai 配列を正しく Map<Tile, number> にカウントアップできるか", () => {
			const dummyHand = new Hand({
				tehai: ["1m", "1m", "1m", "5p", "5p", "9s"],
				fuuro: [],
				agariHai: "9s",
				agariType: "tsumo",
				status: {
					bakaze: "ton",
					jikaze: "nan",
					dora: [],
					uradora: [],
				},
			});

			const resultCounts = dummyHand.tehaiCounts;

			expect(resultCounts.get("1m")).toBe(3);
			expect(resultCounts.get("5p")).toBe(2);
			expect(resultCounts.get("9s")).toBe(1);

			expect(resultCounts.get("8m")).toBe(0);
			expect(resultCounts.get("ton")).toBe(0);
		});

		it("tehai が空配列の場合は、すべてのカウントが 0 になるか", () => {
			const dummyHand = new Hand({
				tehai: [],
				fuuro: [],
				agariHai: "5p",
				agariType: "ron",
				status: {
					bakaze: "ton",
					jikaze: "nan",
					dora: [],
					uradora: [],
				},
			});

			const resultCounts = dummyHand.tehaiCounts;

			expect(resultCounts.get("1m")).toBe(0);
			expect(resultCounts.get("5p")).toBe(0);
			expect(resultCounts.size).toBe(34);
		});
	});
});
