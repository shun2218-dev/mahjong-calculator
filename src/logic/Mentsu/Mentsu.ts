import type { Tile } from "@/types";

export class Mentsu {
    public readonly type: "shuntsu" | "koutsu" | "kantsu";
    public readonly tiles: Tile[];
    public readonly isAnkou: boolean;

    constructor(type: "shuntsu" | "koutsu" | "kantsu", tiles: Tile[], isAnkou: boolean = false) {
        this.type = type;
        this.tiles = tiles;
        this.isAnkou = isAnkou;    
    }
}