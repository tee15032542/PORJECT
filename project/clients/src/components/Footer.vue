<template>
  <div class="p-toolbar p-component" role="toolbar">
    <div class="p-toolbar-group-left">
      <slot name="start"></slot>
    </div>
    <div class="p-toolbar-group-center">
      <slot name="center"></slot>
    </div>
    <div class="p-toolbar-group-right">
      <slot name="end"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style>
.p-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.p-toolbar-group-left {
  display: flex;
  align-items: center;
  justify-content: start;
}

.p-toolbar-group-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.p-toolbar-group-right {
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>
