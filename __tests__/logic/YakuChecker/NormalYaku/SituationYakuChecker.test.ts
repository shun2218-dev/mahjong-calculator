import { YAKU_LIST } from "@/const/YAKU_LIST";
import { SituationYakuChecker } from "@/logic/YakuJudger/YakuChecker";
import { createDummyHand } from "@/utils/vitest/helper";
import { beforeEach, describe, expect, it } from "vitest";

describe("SituationYakuChecker", () => {
    let checker: SituationYakuChecker;

    beforeEach(() => {
        checker = new SituationYakuChecker();
    });

    describe("状況役を正しく判定できる", () => {
        it("⭕️ 成立：ーチ・ツモ・一発・海底 が複合した場合", () => {            
            const dummyHand = createDummyHand({ agariType: "tsumo" }, {
                isRiichi: true,
                isIppatsu: true,
                isHaitei: true
            });

            const result = checker.check(dummyHand);

            expect(result).toHaveLength(4);
            expect(result).toContain(YAKU_LIST.RIICHI);
            expect(result).toContain(YAKU_LIST.MENZENCHINTSUMOHOU);
            expect(result).toContain(YAKU_LIST.IPPATSU);
            expect(result).toContain(YAKU_LIST.HAITEIRAOYUE);
        });

        it("⭕️ 成立：ダブルリーチ・嶺上開花 が複合した場合", () => {            
            const dummyHand = createDummyHand({ agariType: "tsumo" }, {
                isRiichi: true,
                isDoubleRiichi: true,
                isRinshan: true
            });

            const result = checker.check(dummyHand);

            expect(result).toHaveLength(3);
            expect(result).not.toContain(YAKU_LIST.RIICHI); // 競合処理：ロンの場合 海底 (HAITEIRAOYUE) は含まない
            expect(result).toContain(YAKU_LIST.DOUBLERIICHI);
            expect(result).toContain(YAKU_LIST.RINSHANKAIHOU);
            expect(result).toContain(YAKU_LIST.MENZENCHINTSUMOHOU); // 競合処理：ロンの場合 ツモ (MENZENCHINTSUMOHOU) は含まない
        });

        it("⭕️ 成立：河底・槍槓 が複合した場合", () => {            
            const dummyHand = createDummyHand({ agariType: "ron" }, {                
                isHaitei: true,
                isChankan: true
            });

            const result = checker.check(dummyHand);

            expect(result).toHaveLength(2);
            expect(result).not.toContain(YAKU_LIST.HAITEIRAOYUE);
            expect(result).toContain(YAKU_LIST.HOUTEIRAOYUI);
            expect(result).toContain(YAKU_LIST.CHANKAN);
            expect(result).not.toContain(YAKU_LIST.MENZENCHINTSUMOHOU);
        });

        it("❌ 不成立：鳴いたツモの場合(門前ツモではない)", () => {
            const dummyHand = createDummyHand({
                agariType: "tsumo",
                fuuro: [{ type: "pon", tiles: ["1p", "1p", "1p"] }]
            });
    
            const result = checker.check(dummyHand);
    
            expect(result).toHaveLength(0);
        });
    
        it("❌ 不成立：役がない場合 (鳴きロン・リーチなし・状況役なし)", () => {
            const dummyHand = createDummyHand({
                agariType: "ron",
                fuuro: [{ type: "pon", tiles: ["1p", "1p", "1p"] }]
            });
    
            const result = checker.check(dummyHand);
    
            expect(result).toHaveLength(0);
        });
    });
});