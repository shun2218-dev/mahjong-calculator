import type { Yaku } from "@/types";

export class YakuResult {    
    public readonly yakuHan: number;
    public readonly doraHan: number;
    public readonly yakuList: Yaku[];

    constructor(
        yakuHan: number,
        doraHan: number,
        yakuList: Yaku[]
    ) {
        this.yakuHan = yakuHan;
        this.doraHan = doraHan;
        this.yakuList = yakuList;
    };

    public get totalHan(): number {
        return this.yakuHan + this.doraHan;
    }    
}