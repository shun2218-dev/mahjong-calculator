import type { YakuResult } from "@/logic/YakuResult/YakuResult";
import type { Hand } from "@/logic//Hand/Hand";
import { MANGAN_TABLE } from "@/const/MANGAN_TABLE";

export interface PointResult {
    total: number;
    oya: number;
    ko: number;
    name: string;
}

export class PointCalculator {
    public calculate(yakuResult: YakuResult, fu: number, hand: Hand): PointResult {
        const han = yakuResult.totalHan;
        const defaultName = `${fu}符${han}翻`;
        
        const isYakuman = yakuResult.yakuList.some(yaku => yaku.isYakuman);
        if (isYakuman) {
            const yakumanCount = yakuResult.yakuList.reduce((count, yaku) => {
                return count + (yaku.isYakuman ? (yaku.han / 13) : 0);
            }, 0);

            const kihonten = 8000 * yakumanCount;
            const name = yakuResult.yakuList[0].name;

            return this.calculatePayment(kihonten, hand, name);
        }

        if (han >= 13) {
            const { name, kihonten } = MANGAN_TABLE[13];
            return this.calculatePayment(kihonten, hand, name);
        }

        if (han >= 5) {
            const { name, kihonten } = MANGAN_TABLE[han];
            return this.calculatePayment(kihonten, hand, name);
        }

        let kihonten = fu * Math.pow(2, han + 2);
        if (kihonten > 2000) {
            kihonten = 2000;
            return this.calculatePayment(kihonten, hand, "満貫");
        }

        return this.calculatePayment(kihonten, hand, defaultName);
    }

    private roundUpPoint(point: number): number {
        return Math.ceil(point / 100) * 100;
    }

    private calculatePayment(kihonten: number, hand: Hand, name: string): PointResult {
        if (hand.isOya) {
            if (hand.isTsumo) {
                const payment = this.roundUpPoint(kihonten * 2);
                return { total: payment * 3, oya: 0, ko: payment, name };
            }

            const payment = this.roundUpPoint(kihonten * 6);
            return { total: payment, oya: 0, ko: 0, name };
        }

        if (hand.isTsumo) {
            const oyaPayment = this.roundUpPoint(kihonten * 2);
            const koPayment = this.roundUpPoint(kihonten * 1);
            return { total: oyaPayment + koPayment * 2, oya: oyaPayment, ko: koPayment, name };
        }

        const payment = this.roundUpPoint(kihonten * 4);
        return { total: payment, oya: 0, ko: 0, name }
    }
}