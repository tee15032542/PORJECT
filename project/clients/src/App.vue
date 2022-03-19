<template>
  <div>
    <Header class="block fixed top-0 w-full h-4rem" v-if="store.state.hasLogin" />

    <div class="block" v-if="!store.state.hasLogin">
      <router-view />
    </div>
    <diV class="block pt-5 mt-5" v-if="store.state.hasLogin">
      <router-view style="min-height: 90vh" />
    </diV>
  </div>
</template>

<script>
import Header from './components/Header'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  components: {
    Header,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 14px !important;
  color: #2c3e50;
  background-color: var(--teal-400) !important;
}
.p-dropdown-label {
  text-align: left;
}
Button {
  padding: 0.125rem 0.5rem !important;
}
</style>

<style lang="scss">
$border-radius: 5px;
</style>
