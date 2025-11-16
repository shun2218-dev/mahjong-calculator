import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import type { Hand } from "@/logic/Hand/Hand";
import type { YakuResult } from "@logic/YakuResult/YakuResult";
import { YAKU_LIST } from "@/const/YAKU_LIST";
import { isYaochuuhai } from "@/utils/helper";
import { SANGENPAI_SET } from "@/const/TILE_TYPE";

export class FuCalculator {
    public calculate(parsedHand: ParsedHand, hand: Hand, yakuResult: YakuResult): number {
        if (parsedHand.agariForm === "chitoitsu") return 25;

        const hasPinfu = yakuResult.yakuList.some(yaku => yaku.id === YAKU_LIST.PINFU.id);
        if (hasPinfu) {
            if (hand.isTsumo) return 20;
            return 30;
        }

        if (yakuResult.yakuList.some(yaku => yaku.isYakuman)) return 0;

        let totalFu = 0;

        totalFu += this.getBaseFu();

        totalFu += this.getAgariFu(hand);

        totalFu += this.getMentsuFu(parsedHand);

        totalFu += this.getJantoFu(parsedHand, hand);

        totalFu += this.getMachiFu(parsedHand);

        return this.roundUpFu(totalFu);
    }

    private getBaseFu(): number {
        return 20;
    }

    private getAgariFu(hand: Hand): number {
        if (hand.isTsumo) return 2;
        else if (hand.isMenzen) return 10;
        return 0;
    }

    private getMentsuFu(parsedHand: ParsedHand): number {
        let totalMentsuFu = 0;
        for (const mentsu of parsedHand.mentsuList) {
            const isYaochu = isYaochuuhai(mentsu.tiles[0]);
            let mentsuFu = 0;

            if (mentsu.type === "koutsu") {
                mentsuFu = (isYaochu ? 8 : 4);
                if (!mentsu.isAnkou) mentsuFu /=2;
            }

            if (mentsu.type === "kantsu") {
                mentsuFu = (isYaochu ? 32 : 16);
                if (!mentsu.isAnkou) mentsuFu /=2;
            }

            totalMentsuFu += mentsuFu;
        }
        return totalMentsuFu;
    }

    private getJantoFu(parsedHand: ParsedHand, hand: Hand): number {
        const tile = parsedHand.janto[0];
        let fu = 0;

        if (SANGENPAI_SET.has(tile)) fu += 2;

        if (tile === hand.status.bakaze) fu += 2;

        if (tile === hand.status.jikaze) fu += 2;

        return fu;
    }

    private getMachiFu(parsedHand: ParsedHand): number {
        const type = parsedHand.machiType;
        if (type === "kanchan" || type === "penchan" || type === "tanki") return 2;
        return 0;
    }

    private roundUpFu(fu: number): number {
        return Math.ceil(fu / 10) * 10;
    }
}