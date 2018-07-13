<template>
  <form class="form-inline mb-2">
    <div class="input-group">
      <input class="form-control"
             type="number"
             placeholder="Size"
             v-model="size"
             v-on:change="rebuildGrid"
             aria-label="Size">
    </div>
    <button type="button" class="btn btn-primary" v-on:click="rebuildGrid">Rebuild</button>
  </form>
</template>
