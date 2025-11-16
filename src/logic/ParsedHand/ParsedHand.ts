import type { AgariForm, MachiType, Tile } from "@/types";
import type { Mentsu } from "@/logic/Mentsu/Mentsu";

export class ParsedHand {
    public readonly janto: Tile[];
    public readonly mentsuList: Mentsu[];
    public readonly machiType: MachiType | null;
    public readonly agariForm: AgariForm;
    public readonly pairs?: Tile[][];
    public readonly is13MenMachi?: boolean;

    private constructor(props: Partial<ParsedHand>) {
        this.janto = props.janto ?? [];
        this.mentsuList = props.mentsuList ?? [];
        this.machiType = props.machiType ?? null;
        this.agariForm = props.agariForm!;
        this.pairs = props.pairs ?? [];
        this.is13MenMachi = props.is13MenMachi ?? false;
    }

    public static createStandard(mentsuList: Mentsu[], janto: Tile[], machiType: MachiType): ParsedHand {
        return new ParsedHand({
            agariForm: "standard",
            mentsuList,
            janto,
            machiType
        });
    }

    public static createChiitoitsu(pairs: Tile[][]): ParsedHand {
        return new ParsedHand({
            agariForm: "chiitoitsu",
            pairs
        });
    }

    public static createKokushi(is13MenMachi: boolean): ParsedHand {
        return new ParsedHand({
            agariForm: "kokushi",
            is13MenMachi
        });
    }
}