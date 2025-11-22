import {
	CHUNCHANPAI_SET,
	JIHAI_SET,
	KAZEHAI_SET,
	ROUTOUHAI_SET,
	YAOCHUHAI_SET,
} from "@/const/TILE_TYPE";
import type { Mentsu } from "@/logic/Mentsu/Mentsu";
import type { Tile } from "@/types";

export function isJihai(tile: Tile): boolean {
	return JIHAI_SET.has(tile);
}

export function isKazehai(tile: Tile): boolean {
	return KAZEHAI_SET.has(tile);
}

export function isYaochuuhai(tile: Tile): boolean {
	return YAOCHUHAI_SET.has(tile);
}

export function isRoutouhai(tile: Tile): boolean {
	return ROUTOUHAI_SET.has(tile);
}

export function isChunchanpai(tile: Tile): boolean {
	return CHUNCHANPAI_SET.has(tile);
}

export function isKoutsuOf(mentsu: Mentsu, tile: Tile): boolean {
	return (
		(mentsu.type === "koutsu" || mentsu.type === "kantsu") &&
		mentsu.tiles[0] === tile
	);
}

export function countShuntsu(mentsuList: Mentsu[]): Map<string, number> {
	const counts = new Map<string, number>();
	const shuntsuList = mentsuList.filter((mentsu) => mentsu.type === "shuntsu");

	for (const shuntsu of shuntsuList) {
		const key = shuntsu.tiles.join(",");
		const currentcount = counts.get(key) || 0;
		counts.set(key, currentcount + 1);
	}

	return counts;
}
