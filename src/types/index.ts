import type { AKADORA, KAZEHAI, MANZU, PINZU, SANGENPAI, SOUZU } from "@/const/TILE_TYPE";

export type Suit = "m" | "p" | "s";

export type Souzu = typeof SOUZU[number];
export type Pinzu = typeof PINZU[number];
export type Manzu = typeof MANZU[number];
export type Akadora = typeof AKADORA[number];
export type Kazehai = typeof KAZEHAI[number];
export type Sangenpai = typeof SANGENPAI[number];
export type Jihai = Kazehai | Sangenpai;

export type Tile = Manzu | Pinzu | Akadora | Souzu | Jihai;

export type AgariType = "tsumo" | "ron";
export type FuuroType = "chi" | "pon" | "minkan" | "ankan";
export type MachiType = "ryanmen" | "kanchan" | "penchan" | "tanki" | "shanpon";
export type AgariForm = "standard" | "chitoitsu" | "kokushi";
export type MentsuType = "shuntsu" | "koutsu" | "kantsu";

export interface FuuroMeld {
    type: FuuroType;
    tiles: Tile[];
}

export interface GameStatus {
    /** 場風 */
    bakaze: Kazehai;

    /** 自風 */
    jikaze: Kazehai;

    /** ドラ */
    dora: Tile[];

    /** 裏ドラ */
    uradora: Tile[];

    // --- 特殊役フラグ ---
    isRiichi?: boolean;
    isIppatsu?: boolean;
    isHaitei?: boolean;
    isRinshan?: boolean;
    isChankan?: boolean;
    isDoubleRiichi?: boolean;
    isTenhou?: boolean;
    isChiihou?: boolean;
}

export interface CalculateRequestDto {
    tehai: Tile[];
    fuuro: FuuroMeld[];
    agariHai: Tile;
    agariType: AgariType;
    status: GameStatus;
}

export type TehaiCounts = Map<Tile, number>;

export interface Yaku {
    id: string;
    name: string;
    han: number;
    hanNaki: number;
    isYakuman: boolean;
}

export type YakuCheckResult = Yaku | null