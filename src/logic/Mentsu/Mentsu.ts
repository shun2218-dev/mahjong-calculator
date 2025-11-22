import type { MentsuType, Tile } from "@/types";

export class Mentsu {
	public readonly type: MentsuType;
	public readonly tiles: Tile[];
	public readonly isAnkou: boolean;

	constructor(type: MentsuType, tiles: Tile[], isAnkou: boolean = false) {
		this.type = type;
		this.tiles = tiles;
		this.isAnkou = isAnkou;
	}
}
