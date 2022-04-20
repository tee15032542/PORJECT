<template>
  <div>
    <Toolbar class="bg-primary">
      <template #start>
        <Button icon="pi pi-bars" @click="visibleLeft = true" class="mr-2" />
      </template>
      <template #end>
        <div v-if="store.state.hasLogin">
          <p class="inline">
            {{ store.state.userProfile.first_name }} {{ store.state.userProfile.last_name }}
          </p>
        </div>
      </template>
    </Toolbar>
    <Sidebar v-model:visible="visibleLeft" :baseZIndex="1000">
      <p>ข้อมูลผู้ใช้งาน</p>
      <p>{{ store.state.userProfile.first_name }} {{ store.state.userProfile.last_name }}</p>

      <div class="content-datauser">
        <div class="textcontent-name">
          <p>{{ store.state.userdataall[0].namear }}</p>
        </div>
        <div class="textcontent-dis">
          <p>{{ store.state.userdataall[0].disar }}</p>
        </div>
        <div class="textcontent-dis">
          <p>{{ store.state.userdataall[0].created_date	 }}</p>
        </div>
        <div class="linebox"></div>
      </div>

      <!-- <li v-for="item in store.state.userdataall">
        {{ item.namear }}
      </li> -->
    </Sidebar>
  </div>
</template>

<script>
// computed,
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import Sidebar from 'primevue/sidebar'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const visibleLeft = ref(false)
    async function getdatauser() {
      axios
        .get('http://localhost:8081/getdatauser/id=' + store.state.userProfile.user_id)
        .then(res => {
          console.log(res.data)
          if (res.data != null) {
            store.dispatch('getuserdataall', res.data)
            // console.log(res.data[0])
            // console.log(res.data[2])
            console.log(store.state.userdataall)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    getdatauser()
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

<style>
.content-datauser {
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}
</style>
