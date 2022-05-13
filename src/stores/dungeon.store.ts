import { defineStore } from 'pinia';
import { getTileCodes } from '@/util';
import type { IDungeonTile, TileCode, TileType } from '@/models';

interface DungeonStore {
  size: number;
  startTile?: TileCode;
  endTile?: TileCode;
  _activeTool: TileType;
  _tiles: IDungeonTile[][];
}

export const useDungeonStore = defineStore('dungeonStore', {
  state: (): DungeonStore => ({
    size: 0,
    _activeTool: 'wall',
    _tiles: [],
  }),
  getters: {
    tiles: (state) => state._tiles,
    activeTool: (state) => state._activeTool,
    hasStartAndEnd: (state) => !!(state.startTile && state.endTile)
  },
  actions: {
    initializeDungeon(size: number) {
      let newTiles: IDungeonTile[][] = [];
      for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        let row: IDungeonTile[] = [];
        for (let colIndex = 0; colIndex < size; colIndex++) {
          row.push({
            code: `${rowIndex},${colIndex}`,
            type: 'normal',
          });
        }
        newTiles.push(row);
      }
      this.size = size;
      this._tiles = newTiles;
    },

    tileClicked(tileCode: TileCode) {
      if (this.activeTool === 'normal') this.setTileAsNormal(tileCode);
      else if (this.activeTool === 'wall') this.setTileAsWall(tileCode);
      else if (this.activeTool === 'start') this.setTileAsStart(tileCode);
      else if (this.activeTool === 'finish') this.setTileAsFinish(tileCode);
    },

    setTileAsStart(tileCode: TileCode) {
      if (this.startTile) this.setTileAsNormal(this.startTile);
      const tile = this.getTile(tileCode);
      tile.type = 'start';
      this.startTile = tileCode;
    },

    setTileAsFinish(tileCode: TileCode) {
      if (this.endTile) this.setTileAsNormal(this.endTile);
      const tile = this.getTile(tileCode);
      tile.type = 'finish';
      this.endTile = tileCode;
    },

    setTileAsWall(tileCode: TileCode) {
      const tile = this.getTile(tileCode);
      if (tile.type === 'wall') this.setTileAsNormal(tileCode);
      else tile.type = 'wall';
    },

    setTileAsNormal(tileCode: TileCode) {
      const tile = this.getTile(tileCode);
      tile.type = 'normal';
    },

    getTile(tileCode: TileCode): IDungeonTile {
      const [row, col] = getTileCodes(tileCode);
      return this._tiles[row][col];
    },

    setActiveTool(tool: TileType) {
      this._activeTool = tool;
    },
  },
});
