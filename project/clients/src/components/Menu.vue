<template>
  <div></div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Image from 'primevue/image'

export default {
  setup() {
    const store = useStore()
    const menu = ref()
    return {
      menu,
      store,
    }
  },
  component: {
    Image,
  },
  methods: {},
}
</script>

<style></style>
