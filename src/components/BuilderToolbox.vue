<template>
  <div class="toolbox">
    <div
      v-for="tool in tools"
      :class="{ item: true, active: activeTool === tool }"
      @click="itemClicked(tool)"
    >
      <div>{{ tool }}</div>
      <DungeonTile :tile="{ type: tool, code: '0,0' }" />
    </div>
    <button @click="exportDungeon()">Export</button>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import type { TileType } from '@/models';
import { useDungeonStore } from '@/stores/dungeon.store';
import DungeonTile from '@/components/DungeonTile.vue';

const dungeonStore = useDungeonStore();
const { activeTool, hasStartAndEnd, tiles } = storeToRefs(dungeonStore);

const tools: TileType[] = ['normal', 'wall', 'start', 'finish'];

function itemClicked(tool: TileType) {
  dungeonStore.setActiveTool(tool);
}

function exportDungeon() {
  if (!hasStartAndEnd) return;
  const data = JSON.stringify(tiles.value);
  const blob = new Blob([data], { type: 'text/plain' });
  const e = document.createEvent('MouseEvents'),
    a = document.createElement('a');
  a.download = 'test.json';
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initEvent('click', false, false);
  a.dispatchEvent(e);
}
</script>

<style scoped>
.toolbox {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.item {
  width: 80px;
  padding: 5px;
  text-align: center;
}

.item:hover {
  background-color: lightgray;
}

.dungeonTile {
  display: inline-block;
}

.active {
  background-color: lightgray;
  border: 1px dotted black;
}
</style>
