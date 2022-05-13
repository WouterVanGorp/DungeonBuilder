export type TileType = 'start' | 'finish' | 'normal' | 'wall';

export type TileRow = number;
export type TileCol = number;
export type TileCode = `${TileRow},${TileCol}`;

export interface IDungeonTile {
  code: TileCode;
  type: TileType;
}
