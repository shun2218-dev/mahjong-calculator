import type { ScoreTier } from "@/types";

const MANGAN: Readonly<ScoreTier> = { name: "満貫", kihonten: 2000 };
const HANEMAN: Readonly<ScoreTier> = { name: "跳満", kihonten: 3000 };
const BAIMAN: Readonly<ScoreTier> = { name: "倍満", kihonten: 4000 };
const SANBAIMAN: Readonly<ScoreTier> = { name: "三倍満", kihonten: 6000 };
const KAZOEYAKUMAN: Readonly<ScoreTier> = { name: "数え役満", kihonten: 8000 };

export const MANGAN_TABLE: Record<number, Readonly<ScoreTier>> = {
	5: MANGAN,
	6: HANEMAN,
	7: HANEMAN,
	8: BAIMAN,
	9: BAIMAN,
	10: BAIMAN,
	11: SANBAIMAN,
	12: SANBAIMAN,
	13: KAZOEYAKUMAN,
} as const;
