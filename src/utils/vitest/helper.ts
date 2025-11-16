import { Hand } from "@/logic/Hand/Hand";
import { Mentsu } from "@/logic/Mentsu/Mentsu";
import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";
import type { CalculateRequestDto } from "@/types";

export const createDummyParsedHand = (overrides: Partial<ParsedHand> = {}): ParsedHand => {
    const defaultParsedHand: ParsedHand = {
        agariForm: "standard",
        machiType: "ryanmen",
        janto: ["1m", "1m"],
        mentsuList: [
            new Mentsu("shuntsu", ["2m", "3m", "4m"], true),
            new Mentsu("shuntsu", ["5m", "6m", "7m"], true),
            new Mentsu("shuntsu", ["1p", "2p", "3p"], true),
            new Mentsu("shuntsu", ["4p", "5p", "6p"], true),
        ]
    };

    return { ...defaultParsedHand, ...overrides };
};

export const createDummyHand = (overrides: Partial<Omit<CalculateRequestDto, "status">> = {}, overridesStatus: Partial<CalculateRequestDto["status"]> = {}): Hand => {
    const defaultStatusDto: CalculateRequestDto["status"] = {
        bakaze: "ton",
        jikaze: "nan",
        dora: ["1p"],
        uradora: [],
        isRiichi: false,
        isIppatsu: false,
        isHaitei: false,
        isRinshan: false,
        isChankan: false
    }
    const defaultDto: CalculateRequestDto = {
        tehai: ["1m", "1m", "2m", "3m", "4m", "5m", "6m", "7m", "1p", "2p", "3p", "4p", "5p", "6p"],
        agariHai: "2m",
        agariType: "tsumo",
        fuuro: [],
        status: defaultStatusDto
    };

    const dto: CalculateRequestDto = {
        ...defaultDto,
        ...overrides,
        status: {
            ...defaultDto.status,
            ...overridesStatus
        }
    };

    return new Hand(dto);
};