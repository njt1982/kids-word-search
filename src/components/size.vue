<template>
  <form class="form-inline mb-2">
    <div class="input-group">
      <input
        v-model="size"
        class="form-control"
        type="number"
        placeholder="Size"
        aria-label="Size"
        @change="rebuildGrid"
      >
    </div>
    <button
      type="button"
      class="btn btn-primary"
      @click="rebuildGrid"
    >
      Rebuild
    </button>
  </form>
</template>
