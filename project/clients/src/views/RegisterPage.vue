<template>
  <div style="padding-left: 10%; padding-right: 10%; padding-top: 2%; min-width: 60%">
    <Card>
      <template #header>
        <div class="pt-1 px-4">
          <h2 class="flex justify-content-start">
            Registeration
            <i class="pi pi-pencil text-primary ml-3 justify-content-end align-items-center" />
          </h2>
          <hr />
        </div>
      </template>

      <template #content>
        <div class="grid">
          <div class="col-3" />
          <div class="col-6">
            <div class="grid my-4">
              <h5 class="m-0 pr-2 pb-2">ID Card Number : <span style="color: red">*</span></h5>
              <InputText
                class="w-full"
                placeholder="ID Card Number (รหัสบัตรประชาชน)"
                v-model="id"
              />
            </div>
            <div class="grid my-4">
              <h5 class="m-0 pr-2 pb-2">First Name : <span style="color: red">*</span></h5>
              <InputText class="w-full" placeholder="First Name (ชื่อ)" v-model="firstname" />
            </div>
            <div class="grid my-4">
              <h5 class="m-0 pr-2 pb-2">Last Name : <span style="color: red">*</span></h5>
              <InputText class="w-full" placeholder="Last Name (นามสกุล)" v-model="lastname" />
            </div>
            <div class="grid my-4">
              <h5 class="m-0 pr-2 pb-2">Tel. : <span style="color: red">*</span></h5>
              <InputText
                class="w-full"
                placeholder="Telephone Number (เบอร์โทรศัพท์)"
                v-model="tel"
              />
            </div>
            <div class="grid my-4">
              <h5 class="m-0 pr-2 pb-2">E-mail :</h5>
              <InputText class="w-full" placeholder="E-mail (อีเมลล์)" v-model="email" />
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-content-center align-items-center">
          <Button label="Back" class="p-button-text" @click="backPage" />
          <span class="mx-4">|</span>
          <Button label="Register" @click="register" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import axios from 'axios'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    var id = ref()
    var firstname = ref()
    var lastname = ref()
    var tel = ref()
    var email = ref()
    var invalid = {
      id: '',
      firstname: '',
      lastname: '',
      tel: '',
      email: '',
    }
    function backPage() {
      router.push({ path: sessionStorage.getItem('backPath') })
    }
    function register() {
      console.log(id, firstname, lastname, tel, email)
      axios.post('http://localhost:8081/userRegister', {
        id: id.value,
        firstname: firstname.value,
        lastname: lastname.value,
        tel: tel.value,
        email: email.value,
      })
      // route to successful register
    }

    return {
      id,
      firstname,
      lastname,
      tel,
      email,
      invalid,
      store,
      router,
      backPage,
      register,
    }
  },
  components: {
    Card,
    InputText,
    Button,
  },
}
</script>

<style scope>
input {
  max-height: 2rem !important;
}
</style>
