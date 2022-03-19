<template>
  <div>
    <Toolbar class="bg-primary">
      <template #start>
        <Button icon="pi pi-bars" @click="visibleLeft = true" class="mr-2" />
      </template>
      <template #end>
        <div v-if="store.state.hasLogin">
          <p class="inline"> {{ store.state.userProfile.first_name }} {{ store.state.userProfile.last_name }}</p>
        </div>
      </template>
    </Toolbar>
    <Sidebar v-model:visible="visibleLeft" :baseZIndex="1000"> </Sidebar>
  </div>
</template>

<script>
// computed,
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import Sidebar from 'primevue/sidebar'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const visibleLeft = ref(false)

    return {
      store,
      showUser: false,
      router,
      visibleLeft,
    }
  },
  methods: {
    logout() {
      const userLogout = null
      this.$store.dispatch('getUserProfile', userLogout)
      this.$router.push({ path: '/login-page' })
    },
  },
  components: {
    Toolbar,
    Button,
    Sidebar,
  },
}
</script>

<style></style>
