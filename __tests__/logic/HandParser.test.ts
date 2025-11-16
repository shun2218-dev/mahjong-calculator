import { Hand } from "@/logic/Hand/Hand";
import { HandParser } from "@/logic/HandParser/HandParser";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import { beforeEach, describe, expect, it } from "vitest";

describe("HandParser", () => {
    let parser: HandParser;
    beforeEach(() => {
        parser = new HandParser
    });

    describe("スタンダード形", () => {    
        it('面前4面子1雀頭(スタンダード形)を正しく解析できるか', () => {
            const dummyHand = new Hand({
                tehai: ["1m", "1m", "1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "8m", "8m", "9m", "9m"],
                fuuro: [],
                agariHai: "9m",
                agariType: "tsumo",
                status: {
                    bakaze: "ton",
                    jikaze: "nan",
                    dora: ["1p"],
                    uradora: [],
                }
            });

            const result = parser.parse(dummyHand);

            const expectedJanto = ["9m", "9m"];
            const expectedMentsuList = [
                new Mentsu("koutsu", ["1m", "1m", "1m"], true),
                new Mentsu("shuntsu", ["2m", "3m", "4m"], true),
                new Mentsu("shuntsu", ["5m", "6m", "7m"], true),
                new Mentsu("koutsu", ["8m", "8m", "8m"], true)
            ];

            expect(result).not.toBeInstanceOf(Error);

            expect(result).toBeInstanceOf(ParsedHand);
            
            expect((result as ParsedHand).agariForm).toBe("standard");

            expect((result as ParsedHand).janto).toEqual(expectedJanto);
            expect((result as ParsedHand).mentsuList).toEqual(expectedMentsuList);    
        });

        it('鳴き(pon)4面子1雀頭(スタンダード形)を正しく解析できるか', () => {
            const dummyHand = new Hand({
                tehai: ["2m", "3m", "4m", "5m", "6m", "7m", "8m", "8m", "8m", "9m", "9m"],
                fuuro: [{ type: "pon", tiles: ["1m", "1m", "1m"] }],
                agariHai: "9m",
                agariType: "tsumo",
                status: {
                    bakaze: "ton",
                    jikaze: "nan",
                    dora: ["1p"],
                    uradora: [],
                }
            });

            const result = parser.parse(dummyHand);

            const expectedJanto = ["9m", "9m"];
            const expectedMentsuList = [
                new Mentsu("koutsu", ["1m", "1m", "1m"], false),
                new Mentsu("shuntsu", ["2m", "3m", "4m"], true),
                new Mentsu("shuntsu", ["5m", "6m", "7m"], true),
                new Mentsu("koutsu", ["8m", "8m", "8m"], true)
            ];

            expect(result).not.toBeInstanceOf(Error);

            expect(result).toBeInstanceOf(ParsedHand);
            
            expect((result as ParsedHand).agariForm).toBe("standard");

            expect((result as ParsedHand).janto).toEqual(expectedJanto);
            expect((result as ParsedHand).mentsuList).toEqual(expectedMentsuList);    
        });

        it('鳴き(chi)4面子1雀頭(スタンダード形)を正しく解析できるか', () => {
            const dummyHand = new Hand({
                tehai: ["1m", "1m", "1m", "5m", "6m", "7m", "8m", "8m", "8m", "9m", "9m"],
                fuuro: [{ type: "chi", tiles: ["2m", "3m", "4m"] }],
                agariHai: "9m",
                agariType: "tsumo",
                status: {
                    bakaze: "ton",
                    jikaze: "nan",
                    dora: ["1p"],
                    uradora: [],
                }
            });

            const result = parser.parse(dummyHand);

            const expectedJanto = ["9m", "9m"];
            const expectedMentsuList = [
                new Mentsu("koutsu", ["1m", "1m", "1m"], true),
                new Mentsu("shuntsu", ["2m", "3m", "4m"], false),
                new Mentsu("shuntsu", ["5m", "6m", "7m"], true),
                new Mentsu("koutsu", ["8m", "8m", "8m"], true)
            ];

            expect(result).not.toBeInstanceOf(Error);

            expect(result).toBeInstanceOf(ParsedHand);
            
            expect((result as ParsedHand).agariForm).toBe("standard");

            expect((result as ParsedHand).janto).toEqual(expectedJanto);
            expect((result as ParsedHand).mentsuList).toEqual(expectedMentsuList);    
        });

        it('鳴き(kantsu)4面子1雀頭(スタンダード形)を正しく解析できるか', () => {
            const dummyHand = new Hand({
                tehai: ["2m", "3m", "4m", "5m", "6m", "7m", "8m", "8m", "8m", "9m", "9m"],
                fuuro: [{ type: "minkan", tiles: ["1m", "1m", "1m", "1m"] }],
                agariHai: "9m",
                agariType: "tsumo",
                status: {
                    bakaze: "ton",
                    jikaze: "nan",
                    dora: ["1p"],
                    uradora: [],
                }
            });

            const result = parser.parse(dummyHand);

            const expectedJanto = ["9m", "9m"];
            const expectedMentsuList = [
                new Mentsu("kantsu", ["1m", "1m", "1m", "1m"], false),
                new Mentsu("shuntsu", ["2m", "3m", "4m"], true),
                new Mentsu("shuntsu", ["5m", "6m", "7m"], true),
                new Mentsu("koutsu", ["8m", "8m", "8m"], true)
            ];

            expect(result).not.toBeInstanceOf(Error);

            expect(result).toBeInstanceOf(ParsedHand);
            
            expect((result as ParsedHand).agariForm).toBe("standard");

            expect((result as ParsedHand).janto).toEqual(expectedJanto);
            expect((result as ParsedHand).mentsuList).toEqual(expectedMentsuList);    
        });

        describe("待ちタイプ", () => {
            it("単騎(tanki)待ちを正しく判定できる", () => {                
                const dummyHand = new Hand({
                    tehai: ["1m", "1m", "1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "8m", "8m", "9m", "9m"],
                    fuuro: [],
                    agariHai: "9m",
                    agariType: "tsumo",
                    status: {
                        bakaze: "ton",
                        jikaze: "nan",
                        dora: ["1p"],
                        uradora: [],
                    }
                });

                const result = parser.parse(dummyHand);
                expect((result as ParsedHand).machiType).toBe("tanki");
            });

            it("双碰(shanpon)待ちを正しく判定できる", () => {                
                const dummyHand = new Hand({
                    tehai: ["2m", "2m", "3m", "3m", "3m", "4m", "5m", "6m", "7m", "7m", "7m", "6s", "7s", "8s"],
                    fuuro: [],
                    agariHai: "3m",
                    agariType: "tsumo",
                    status: {
                        bakaze: "ton",
                        jikaze: "nan",
                        dora: ["1p"],
                        uradora: [],
                    }
                });

                const result = parser.parse(dummyHand);
                expect((result as ParsedHand).machiType).toBe("shanpon");
            });

            it("嵌張(kanchan)待ちを正しく判定できる", () => {                
                const dummyHand = new Hand({
                    tehai: ["2m", "3m", "4m", "5m", "6m", "7m", "4p", "5p", "6p", "5s", "5s", "9s", "9s", "9s"],
                    fuuro: [],
                    agariHai: "5p",
                    agariType: "tsumo",
                    status: {
                        bakaze: "ton",
                        jikaze: "nan",
                        dora: ["1p"],
                        uradora: [],
                    }
                });

                const result = parser.parse(dummyHand);
                expect((result as ParsedHand).machiType).toBe("kanchan");
            });

            it("辺張(penchan)待ちを正しく判定できる (3)", () => {                
                const dummyHand = new Hand({
                    tehai: ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "7p", "7p", "6s", "7s", "8s"],
                    fuuro: [],
                    agariHai: "3m",
                    agariType: "tsumo",
                    status: {
                        bakaze: "ton",
                        jikaze: "nan",
                        dora: ["1p"],
                        uradora: [],
                    }
                });

                const result = parser.parse(dummyHand);
                expect((result as ParsedHand).machiType).toBe("penchan");
            });

            it("辺張(penchan)待ちを正しく判定できる (7)", () => {               
                const dummyHand = new Hand({
                    tehai: ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "7p", "7p", "6s", "7s", "8s"],
                    fuuro: [],
                    agariHai: "7m",
                    agariType: "tsumo",
                    status: {
                        bakaze: "ton",
                        jikaze: "nan",
                        dora: ["1p"],
                        uradora: [],
                    }
                });

                const result = parser.parse(dummyHand);
                expect((result as ParsedHand).machiType).toBe("penchan");
            });

            it("両面(ryanmen)待ちを正しく判定できる", () => {
                const dummyHand = new Hand({
                    tehai: ["2m", "3m", "4m", "4m", "5m", "6m", "6p", "7p", "8p", "2s", "2s", "3s", "4s", "5s"],
                    fuuro: [],
                    agariHai: "3s",
                    agariType: "tsumo",
                    status: {
                        bakaze: "ton",
                        jikaze: "nan",
                        dora: ["1p"],
                        uradora: [],
                    }
                });

                const result = parser.parse(dummyHand);
                expect((result as ParsedHand).machiType).toBe("ryanmen");
            });
        });
    });

    it("七対子を正しく解析できるか", () => {
        const dummyHand = new Hand({
            tehai: ["1m", "1m", "2m", "2m", "3m", "3m", "4m", "4m", "5m", "5m", "6m", "6m", "ton", "ton"],
            fuuro: [],
            agariHai: "ton",
            agariType: "tsumo",
            status: {
                bakaze: "ton",
                jikaze: "nan",
                dora: ["1p"],
                uradora: [],
            }
        });

        const result = parser.parse(dummyHand);

        expect(result).not.toBeInstanceOf(Error);
        expect(result).toBeInstanceOf(ParsedHand);
        expect((result as ParsedHand).agariForm).toBe("chiitoitsu");
        expect((result as ParsedHand).pairs).toHaveLength(7);        
    });

    describe("国士無双", () => {      
        it("通常の国士無双を正しく解析できるか", () => {
            const dummyHand = new Hand({
                tehai: ["1m", "9m", "1s", "9s", "1p", "9p", "ton", "nan", "sha", "pei", "haku", "hatsu", "hatsu", "chun"],
                fuuro: [],
                agariHai: "chun",
                agariType: "tsumo",
                status: {
                    bakaze: "ton",
                    jikaze: "nan",
                    dora: ["1p"],
                    uradora: [],
                }
            });

            const result = parser.parse(dummyHand);
    
            expect(result).not.toBeInstanceOf(Error);
            expect(result).toBeInstanceOf(ParsedHand);
            expect((result as ParsedHand).agariForm).toBe("kokushi");
            expect((result as ParsedHand).is13MenMachi).toBe(false);
        });

        it("13面の国士無双を正しく解析できるか", () => {
            const dummyHand = new Hand({
                tehai: ["1m", "9m", "1s", "9s", "1p", "9p", "ton", "ton", "nan", "sha", "pei", "haku", "hatsu", "chun"],
                fuuro: [],
                agariHai: "ton",
                agariType: "tsumo",
                status: {
                    bakaze: "ton",
                    jikaze: "nan",
                    dora: ["1p"],
                    uradora: [],
                }
            });

            const result = parser.parse(dummyHand);
    
            expect(result).not.toBeInstanceOf(Error);
            expect(result).toBeInstanceOf(ParsedHand);
            expect((result as ParsedHand).agariForm).toBe("kokushi");
            expect((result as ParsedHand).is13MenMachi).toBe(true);       
        });
    });

    it("アガリ形でない場合にエラーを返す", () => {
        const dummyHand = new Hand({
            tehai: ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "1p", "1p", "2p", "2s"],
            fuuro: [],
            agariHai: "2s",
            agariType: "tsumo",
            status: {
                bakaze: "ton",
                jikaze: "nan",
                dora: ["1p"],
                uradora: [],
            }        
        });

        const result = parser.parse(dummyHand);

        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe("アガリ形ではありません");
    });
});