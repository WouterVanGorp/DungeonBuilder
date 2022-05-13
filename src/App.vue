<template>
  <div class="wrapper">
    <DungeonGrid />
    <BuilderToolbox />
  </div>
</template>

<script lang="ts" setup>
import DungeonGrid from './components/DungeonGrid.vue';
import BuilderToolbox from './components/BuilderToolbox.vue';
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  height: 100vh;
}

#app,
.wrapper {
  height: 100%;
}

.grid {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.toolbox {
  border-top: 1px solid lightblue;
  background: aliceblue;
  height: 100px;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
