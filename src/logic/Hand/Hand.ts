import { ALL_TILES } from "@/const/TILE_TYPE";
import type {
	AgariType,
	CalculateRequestDto,
	FuuroMeld,
	GameStatus,
	TehaiCounts,
	Tile,
} from "@/types";

export class Hand {
	public readonly tehai: Tile[];
	public readonly fuuro: FuuroMeld[];
	public readonly agariHai: Tile;
	public readonly agariType: AgariType;
	public readonly status: GameStatus;
	private _tehaiCounts: TehaiCounts | null = null;

	constructor(request: CalculateRequestDto) {
		this.tehai = request.tehai;
		this.fuuro = request.fuuro;
		this.agariHai = request.agariHai;
		this.agariType = request.agariType;
		this.status = request.status;
	}

	public get isMenzen(): boolean {
		return this.fuuro.every((meld) => meld.type === "ankan");
	}

	public get isTsumo(): boolean {
		return this.agariType === "tsumo";
	}

	public get isOya(): boolean {
		return this.status.jikaze === "ton";
	}

	public get isRiichi(): boolean {
		return this.status.isRiichi ?? false;
	}

	public get isIppatsu(): boolean {
		return this.status.isIppatsu ?? false;
	}

	public get isHaitei(): boolean {
		return this.status.isHaitei ?? false;
	}

	public get isRinshan(): boolean {
		return this.status.isRinshan ?? false;
	}

	public get isChankan(): boolean {
		return this.status.isChankan ?? false;
	}

	public get isDoubleRiichi(): boolean {
		return this.status.isDoubleRiichi ?? false;
	}

	public get isTenhou(): boolean {
		return this.status.isTenhou ?? false;
	}

	public get isChiihou(): boolean {
		return this.status.isChiihou ?? false;
	}

	public get allTiles(): Tile[] {
		const fuuroTiles = this.fuuro.flatMap((meld) => meld.tiles);
		const all = [...this.tehai, ...fuuroTiles];

		if (!this.isTsumo) {
			all.push(this.agariHai);
		}

		return all.sort();
	}

	public get tehaiCounts(): Map<Tile, number> {
		if (this._tehaiCounts) {
			return this._tehaiCounts;
		}

		const counts = new Map<Tile, number>();

		for (const tile of ALL_TILES) {
			counts.set(tile, 0);
		}

		for (const tile of this.tehai) {
			counts.set(tile, (counts.get(tile) ?? 0) + 1);
		}

		this._tehaiCounts = counts;
		return this._tehaiCounts;
	}
}
