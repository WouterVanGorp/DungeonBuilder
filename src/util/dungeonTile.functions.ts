import type { TileCode, TileRow, TileCol } from '@/models';

export function getTileCodes(tileCode: TileCode): [TileRow, TileCol] {
  const splitCodes = tileCode.split(',');
  return [Number(splitCodes[0]), Number(splitCodes[1])];
}
