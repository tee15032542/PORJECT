<template>
  <div
    class="flex justify-content-center align-items-center"
    style="min-height: 100vh; min-width: 99vh"
  >
    <Card class="w-5">
      <template #title>Login</template>
      <template #content class="inline">
        <div class="block mb-4" style="min-heigth: 25rem !important">
          <div class="grid" v-if="selectedState == 'user'">
            <label class="mr-2 col-4 flex align-items-center justify-content-end"
              >ID Card Number :</label
            >
            <div class="col-5 h-2">
              <InputMask
                mask="9-9999-99999-99-9"
                placeholder="x-xxxx-xxxxx-xx-x"
                class="p-1 w-full"
                type="text"
                v-model="id"
              />
            </div>
          </div>

          <div class="grid mb-2" v-if="selectedState == 'admin'">
            <label class="mr-2 col-4 flex align-items-center justify-content-end">Username :</label>
            <div class="col-5 h-2">
              <InputText class="p-1 w-full" type="text" v-model="username" />
            </div>
          </div>
          <div class="grid" v-if="selectedState == 'admin'">
            <label class="mr-2 col-4 flex align-items-center justify-content-end">Password :</label>
            <div class="col-5 h-2">
              <InputText class="p-1 w-full" type="text" v-model="password" />
            </div>
          </div>
        </div>

        <div class="block">
          <SelectButton v-model="selectedState" :options="switchState" />
        </div>
      </template>

      <template #footer>
        <div class="flex justify-content-center align-items-center">
          <Button label="Register" class="p-button-text" @click="toRegister" />
          <span class="mx-4">|</span>
          <Button label="Login" @click="getLogin" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import SelectButton from 'primevue/selectbutton'
import Card from 'primevue/card'
import Button from 'primevue/button'

import axios from 'axios'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const id = ref()
    const username = ref()
    const password = ref()
    const userProfile = ref()
    const switchState = ref(['user', 'admin'])
    const selectedState = ref('user')
    function toRegister() {
      router.push({ path: '/register-page' })
    }
    async function getLogin() {
      var stateLogin = selectedState.value
      if (stateLogin == 'user') {
        // console.log(stateLogin,id.value)
        const personalId = id.value.replaceAll('-', '')
        // console.log(personalId)
        axios
          .get(`http://localhost:8081/getUserId/${personalId}`)
          .then(res => {
            // console.log(res.data['0'])

            if(res.data != null){
              store.dispatch('getUserProfile',res.data['0'])
              router.push({path: '/home'})
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        console.log(stateLogin)
      }
    }
    return {
      router,
      toRegister,
      getLogin,
      id,
      username,
      password,
      userProfile,
      store,
      switchState,
      selectedState,
    }
  },
  components: {
    InputText,
    InputMask,
    Card,
    Button,
    SelectButton,
  },
  name: 'Login Page',
}
console.log("");
</script>

<style scoped></style>
