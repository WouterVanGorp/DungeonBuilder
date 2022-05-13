<template>
  <div class="grid">
    <div class="row" v-for="(row, index) in tiles" :key="index">
      <DungeonTile
        v-for="item in row"
        :key="item.code"
        :tile="item"
        @click="tileClick(item)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { DUNGEON_SIZES } from '@/constants';
import { useDungeonStore } from '@/stores/dungeon.store';
import type { IDungeonTile } from '@/models';
import DungeonTile from '@/components/DungeonTile.vue';

const dungeonStore = useDungeonStore();
const { tiles } = storeToRefs(dungeonStore);

onMounted(() => {
  dungeonStore.initializeDungeon(DUNGEON_SIZES.small);
});

function tileClick(tile: IDungeonTile) {
  dungeonStore.tileClicked(tile.code);
}
</script>

<style>
.row {
  height: 100%;
  display: flex;
}
</style>
