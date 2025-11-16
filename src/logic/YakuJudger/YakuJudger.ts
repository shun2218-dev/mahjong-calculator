import type { Hand } from "@/logic/Hand/Hand";
import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import type { Suit, Tile, Yaku, YakuCheckResult } from "@/types";
import { YakuResult } from "@/logic/YakuResult/YakuResult";
import { YAKU_LIST, type YakuId } from "@/const/YAKU_LIST";
import { 
    ChinroutouChecker,
    ChuurenpoutouChecker,
    DaisangenChecker,
    RyuuiisouChecker,
    SuuankouChecker,
    SuukantsuChecker,
    SuushiiChecker,
    TsuuiisouChecker,    
    ChantaChecker,
    FormYakuChecker,
    IipeikouChecker,
    IkkitsuukanChecker,
    PinfuChecker,
    RyanpeikouChecker,
    SanshokuChecker,
    SituationYakuChecker,
    SuitAndTerminalChecker   
} from "./YakuChecker";
import { isJihai } from "@/utils/helper";
import { AKADORA_SET } from "@/const/TILE_TYPE";

type ConflictPair = {
    higher: YakuId;
    lower: YakuId;
}

export class YakuJudger {
    // --- 役満 YakumanChecker ---
    private readonly suuankouChecker: SuuankouChecker;
    private readonly daisangenChecker: DaisangenChecker;
    private readonly suushiiChecker: SuushiiChecker;    
    private readonly suukantsuChecker: SuukantsuChecker;
    private readonly chinroutouChecker: ChinroutouChecker;
    private readonly tsuuiisouChecker: TsuuiisouChecker;
    private readonly ryuuiisouChecker: RyuuiisouChecker;
    private readonly chuurenpoutouChecker: ChuurenpoutouChecker;

    // --- 状況役 SituationYakuChecker ---
    private readonly situationYakuChecker: SituationYakuChecker;

    // --- 形による役 FormYakuChecker ---
    private readonly formYakuchecker: FormYakuChecker;

    // --- 門前役 OnlyMenzenYakuChecker ---
    private readonly pinfuChecker: PinfuChecker;
    private readonly iipeikouChecker: IipeikouChecker;
    private readonly ryanpeikouChecker: RyanpeikouChecker;

    // --- スタンダード形 StandardYakuChecker ---
    private readonly sanshokuChecker: SanshokuChecker;
    private readonly ikkitsuukanChecker: IkkitsuukanChecker;
    private readonly chantaChecker: ChantaChecker;

    // --- 全体の形による形 SuitAndTerminalYakuChecker ---
    private readonly suitAndTerminalChecker: SuitAndTerminalChecker;
    
    constructor() {
        this.suuankouChecker = new SuuankouChecker();
        this.daisangenChecker = new DaisangenChecker();
        this.suushiiChecker = new SuushiiChecker();        
        this.suukantsuChecker = new SuukantsuChecker();
        this.chinroutouChecker = new ChinroutouChecker();
        this.tsuuiisouChecker = new TsuuiisouChecker();
        this.ryuuiisouChecker = new RyuuiisouChecker();
        this.chuurenpoutouChecker = new ChuurenpoutouChecker();
        this.situationYakuChecker = new SituationYakuChecker();
        this.formYakuchecker = new FormYakuChecker();
        this.pinfuChecker = new PinfuChecker();
        this.iipeikouChecker = new IipeikouChecker();
        this.ryanpeikouChecker = new RyanpeikouChecker();
        this.sanshokuChecker = new SanshokuChecker();
        this.ikkitsuukanChecker = new IkkitsuukanChecker();
        this.chantaChecker = new ChantaChecker();
        this.suitAndTerminalChecker = new SuitAndTerminalChecker();
    }


    public judge(parsedHand: ParsedHand, hand: Hand): YakuResult {
        const yakumanList = this.checkYakuman(parsedHand, hand);
        if (yakumanList.length > 0) {
            const han = yakumanList.reduce((sum, yaku) => sum + yaku.han, 0);
            return new YakuResult(han, 0, yakumanList);
        }

        let yakuList = this.checkNormalYaku(parsedHand, hand);

        yakuList = this.resolveConflicts(yakuList);

        if (yakuList.length === 0) {
            throw new Error("役がありません");
        }

        const yakuHan = yakuList.reduce((sum, yaku) => {
            return sum + (hand.isMenzen ? yaku.han : yaku.hanNaki)
        }, 0);

        const doraHan = this.calculateDora(hand);
        
        return new YakuResult(yakuHan, doraHan, yakuList);
    }

    private checkYakuman(parsedHand: ParsedHand, hand: Hand): Yaku[] {
        const results: Yaku[] = [];
        
        const tenhou = this.situationYakuChecker.checkTenhou(hand);
        if (tenhou) results.push(tenhou);

        const chiihou = this.situationYakuChecker.checkChiihou(hand);
        if (chiihou) results.push(chiihou);

        if (parsedHand.agariForm === "kokushi") {
            if (parsedHand.is13MenMachi) {
                results.push(YAKU_LIST.KOKUSHIMUSOU13MEN);
            } else {
                results.push(YAKU_LIST.KOKUSHIMUSOU);
            }
        }


        const suuankou = this.suuankouChecker.check(parsedHand, hand);
        if (suuankou.isSuuankou) {
            if (suuankou.isTanki) {
                results.push(YAKU_LIST.SUUANKOUTANKI);
            } else {
                results.push(YAKU_LIST.SUUANKOU);
            }
        }
        
        if (this.daisangenChecker.check(parsedHand)) results.push(YAKU_LIST.DAISANGEN);

        if (this.suushiiChecker.checkDaisuushi(parsedHand)) {
            results.push(YAKU_LIST.DAISUUSHI)
        } else if (this.suushiiChecker.checkShousuushi(parsedHand)) {
            results.push(YAKU_LIST.SHOUSUUSHI);
        }

        if (this.suukantsuChecker.check(parsedHand)) results.push(YAKU_LIST.SUUKANTSU);
        
        if (this.chinroutouChecker.check(hand)) results.push(YAKU_LIST.CHINROUTOU);
        if (this.tsuuiisouChecker.check(hand)) results.push(YAKU_LIST.TSUUIISOU);
        if (this.ryuuiisouChecker.check(hand)) results.push(YAKU_LIST.RYUUIISOU);

        const chuurenpoutou = this.chuurenpoutouChecker.check(hand);
        if (chuurenpoutou.isChuurenpoutou) {
            if (chuurenpoutou.isJyunsei) {
                results.push(YAKU_LIST.JYUNSEICHUURENPOUTOU);
            } else {
                results.push(YAKU_LIST.CHUURENPOUTOU);
            }
        };

        return results;
    }

    private checkNormalYaku(parsedHand: ParsedHand, hand: Hand): Yaku[] {
        const results: (YakuCheckResult | Yaku[])[] = [];

        results.push(this.situationYakuChecker.check(hand));
        
        results.push(this.formYakuchecker.checkTanyao(hand));

        results.push(this.formYakuchecker.checkYakuhai(parsedHand, hand));

        if (hand.isMenzen) {
            results.push(this.pinfuChecker.check(parsedHand, hand));            
            results.push(this.iipeikouChecker.check(parsedHand, hand));
            results.push(this.ryanpeikouChecker.check(parsedHand, hand));
        }

        if (parsedHand.agariForm === "chitoitsu") {
            results.push(YAKU_LIST.CHIITOITSU);
        }

        if (parsedHand.agariForm === "standard") {
            results.push(this.formYakuchecker.checkToitoi(parsedHand));
            results.push(this.formYakuchecker.checkSanankou(parsedHand));
            results.push(this.formYakuchecker.checkShousangen(parsedHand));
            results.push(this.sanshokuChecker.checkDoujyun(parsedHand));
            results.push(this.sanshokuChecker.checkDoukou(parsedHand));
            results.push(this.ikkitsuukanChecker.check(parsedHand));
            results.push(this.chantaChecker.checkChanta(parsedHand));
            results.push(this.chantaChecker.checkJyunchan(parsedHand));
        }

        results.push(this.suitAndTerminalChecker.checkHonitsu(hand));        
        results.push(this.suitAndTerminalChecker.checkChinitsu(hand));
        results.push(this.suitAndTerminalChecker.checkHonroutou(hand));

        return results.flat().filter(yaku => yaku !== null);
    }

    private resolveConflicts(yakuList: Yaku[]): Yaku[] {
        const yakuIds = new Set(yakuList.map(yaku => yaku.id));

        let finalYakuList = [...yakuList];

        const conflictPairList: ConflictPair[]  = [
            { higher: "chinitsu", lower: "honitsu" },
            { higher: "ryanpeikou", lower: "iipeikou" },
            { higher: "jyunchantaiyaochuu", lower: "honchantaiyaochuu" },
            { higher: "doubleriichi", lower: "riichi" }
        ];

        for (const pair of conflictPairList) {
            finalYakuList = this.applyConflictRule(finalYakuList, yakuIds, pair.higher, pair.lower);
        }

        return finalYakuList;
    }

    private applyConflictRule(yakuList: Yaku[], yakuIds: Set<string>, higherYakuId: string, lowerYakuId: string): Yaku[] {
        if (yakuIds.has(higherYakuId)) return yakuList.filter(yaku => yaku.id !== lowerYakuId);

        return yakuList;
    }

    private calculateDora(hand: Hand): number {
        let totalDoraHan = 0;
        const allTiles = hand.allTiles;

        const doraTiles = new Set<Tile>();

        for (const indicator of hand.status.dora) {            
            doraTiles.add(this.getNextDoraTile(indicator));
        }

        if (hand.status.isRiichi && hand.status.uradora) {
            for (const indicator of hand.status.uradora) {
                doraTiles.add(this.getNextDoraTile(indicator));
            }
        }

        for (const tile of allTiles) {
            if (AKADORA_SET.has(tile)) {
                totalDoraHan++;
            }

            const normalTile = this.getNormalTile(tile);
            if (doraTiles.has(normalTile)) {
                totalDoraHan++;
            }
        }

        return totalDoraHan;
    }

    private getNextDoraTile(indicator: Tile): Tile {
        if (isJihai(indicator)) {
            if (indicator === "ton") return "nan";
            if (indicator === "nan") return "sha";
            if (indicator === "sha") return "pei";
            if (indicator === "pei") return "ton";

            if (indicator === "haku") return "hatsu";
            if (indicator === "hatsu") return "chun";
            if (indicator === "chun") return "haku";
        }

        const suit = indicator.charAt(1) as Suit;
        const rank = parseInt(indicator.charAt(0));

        if (rank === 9) return `1${suit}` as Tile;

        return `${rank + 1}${suit}` as Tile;
    }

    private getNormalTile(tile: Tile): Tile {
        if (tile === "5mr") return "5m";
        if (tile === "5pr") return "5p";
        if (tile === "5sr") return "5s";

        return tile;
    }
}