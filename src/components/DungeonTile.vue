<template>
  <div :class="classObject"></div>
</template>

<script lang="ts" setup>
import type { IDungeonTile } from '@/models';
import { computed } from 'vue';

const { tile } = defineProps({
  tile: { type: Object as () => IDungeonTile, required: true },
});

const classObject = computed(() => ({
  dungeonTile: true,
  [tile.type]: true,
}));
</script>

<style scoped>
.dungeonTile {
  width: 50px;
  height: 35px;
  border: 1px solid lightgray;
  box-sizing: border-box;
  cursor: pointer;
}

.normal {
  background-color: white;
}

.wall {
  background-color: black;
}

.start {
  background-color: greenyellow;
}

.finish {
  background-color: red;
}
</style>
