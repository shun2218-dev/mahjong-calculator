import type { Tile } from "@/types";

export const SOUZU = [
	"1s",
	"2s",
	"3s",
	"4s",
	"5s",
	"6s",
	"7s",
	"8s",
	"9s",
] as const;
export const SOUZU_SET = new Set<Tile>(SOUZU);

export const PINZU = [
	"1p",
	"2p",
	"3p",
	"4p",
	"5p",
	"6p",
	"7p",
	"8p",
	"9p",
] as const;
export const PINZU_SET = new Set<Tile>(PINZU);

export const MANZU = [
	"1m",
	"2m",
	"3m",
	"4m",
	"5m",
	"6m",
	"7m",
	"8m",
	"9m",
] as const;
export const MANZU_SET = new Set<Tile>(MANZU);

export const AKADORA = ["5mr", "5pr", "5sr"] as const;
export const AKADORA_SET = new Set<Tile>(AKADORA);

export const SHUPAI = [...MANZU, ...PINZU, ...SOUZU] as const;
export const SHUPAI_SET = new Set<Tile>(SHUPAI);

export const KAZEHAI = ["ton", "nan", "sha", "pei"] as const;
export const KAZEHAI_SET = new Set<Tile>(KAZEHAI);

export const SANGENPAI = ["haku", "hatsu", "chun"] as const;
export const SANGENPAI_SET = new Set<Tile>(SANGENPAI);

export const JIHAI = [...KAZEHAI, ...SANGENPAI] as const;
export const JIHAI_SET = new Set<Tile>(JIHAI);

export const ALL_TILES = [...SHUPAI, ...JIHAI] as const;
export const ALL_TILES_SET = new Set<Tile>(ALL_TILES);

export const ROUTOUHAI = ["1m", "9m", "1p", "9p", "1s", "9s"] as const;
export const ROUTOUHAI_SET = new Set<Tile>(ROUTOUHAI);

export const YAOCHUHAI = [...JIHAI, ...ROUTOUHAI] as const;
export const YAOCHUHAI_SET = new Set<Tile>(YAOCHUHAI);

export const CHUNCHANPAI = [
	...SOUZU.filter((tile) => tile !== "1s" && tile !== "9s"),
	...PINZU.filter((tile) => tile !== "1p" && tile !== "9p"),
	...MANZU.filter((tile) => tile !== "1m" && tile !== "9m"),
] as const;
export const CHUNCHANPAI_SET = new Set<Tile>(CHUNCHANPAI);
