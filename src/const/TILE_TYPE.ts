export const SOUZU = ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s"] as const;

export const PINZU = ["1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p"] as const;

export const MANZU = ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m"] as const;

export const SHUPAI = [...MANZU, ...PINZU, ...SOUZU] as const;

export const KAZEHAI = ["ton", "nan", "sha", "pei"] as const;

export const SANGENPAI = ["haku", "hatsu", "chun"] as const;

export const JIHAI = [...KAZEHAI, ...SANGENPAI] as const;

export const ALL_TILES = [...SHUPAI, ...JIHAI] as const;

export const ROUTOUHAI = ["1m", "9m", "1p", "9p", "1s", "9s"] as const;

export const YAOCHUHAI = [...JIHAI, ...ROUTOUHAI] as const;

export const CHUNCHANPAI = [
    ...SOUZU.filter(tile => tile !== "1s" && tile !== "9s"),
    ...PINZU.filter(tile => tile !== "1p" && tile !== "9p"),
    ...MANZU.filter(tile => tile !== "1m" && tile !== "9m")
] as const;
