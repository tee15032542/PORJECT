
<template>
  <div class="relative">
    <Toast />
    <ConfirmDialog></ConfirmDialog>

    <Map class="z-0" />
    <div class="absolute top-0 right-0 p-2 mr-5">
      <div class="z-2">
        <Button
          v-if="store.state.drawStep == ''"
          class="mx-2 p-button-rounded p-button-secondary"
          icon="pi pi-pencil"
          @click="featureShow()"
        />
        <Button
          v-if="store.state.drawStep == 'end'"
          class="mx-2 p-button-rounded p-button-secondary"
          icon="pi pi-check"
          @click="confirmDraw()"
        />
      </div>
    </div>
    
    <div class="popupform" v-if="store.state.drawStep == 'confirm'">
      <p>ข้อมูลพื้นที่</p>
      <InputText class="w-full input-namear" placeholder="ชื่อพื้นที่" v-model="namear" />
      <InputText class="w-full input-disar" placeholder="รายละเอียดพื้นที่" v-model="disar" />
      <div class="box-btnsubmit">
          <Button
                    class="mx-2 p-button-rounded p-button-secondary"
                    label="ยืนยัน"
                    @click="confirmdata()"
                  />

      </div>
      


    </div>
    <p>4564678325145</p>
    <p >{{ store.state.geometry[0] }}</p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Button from "primevue/button";
import InputText from 'primevue/inputtext'
import Map from "../components/Map";
import { ref, computed, defineComponent } from "vue";
import axios from "axios";
import { whenever } from "@vueuse/core";

export default defineComponent({
  setup() {
    const store = useStore();
    const displayDialog = ref(true);
    const drawStep = computed(() => store.state.geometry);
    var dis = ref()
    var namear = ref()
    var disar = ref()
    whenever(drawStep, () => {
      if (drawStep.value == "" || drawStep.value == "confirm") {
        displayDialog.value = false;
      }
      if (drawStep.value == "end") {
        displayDialog.value = true;
      }
    });

    return {
      store,
      dis,
      drawFeatureShow: false,
      displayDialog,
      namear,
      disar,
    };
  },
  methods: {
    featureShow() {
      this.drawFeatureShow = this.$store.state.drawState;
      this.$store.dispatch("getDrawState", !this.drawFeatureShow);
      this.$store.dispatch("putDrawStep", "start");
    },
    confirmDraw() {
      this.$store.dispatch("putDrawStep", "confirm");
      
    },
    confirmdata(){
      const idname = this.$store.state.userProfile.user_id;
      const latlong = this.$store.state.geometrydr;
      axios
        .post(`http://localhost:8081/insertUserGeometry`, {
          idname: idname,
          latlong: latlong,
          namear : this.namear,
          disar : this.disar,
        })
        .then((res) => {
          console.log(res);
          this.$store.dispatch("putDrawStep", "");

        })
        .catch((err) => {
          console.log(err);
        });
    }

  },
  components: {
    Map,
    Button,
    InputText,
  },
  name: "HomeGeo",
});

</script>

<style scoped>
.popupform[data-v-fae5bece]>p {
    width: 100%;
    color: white;
    font-size: 32px;
}
.popupform[data-v-fae5bece] {
    position: fixed;
    background: rgba(0, 0, 0, 0.459);
    width: 50%;
    height: 35%;
    z-index: 999999;
    top: 30%;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    right: 25%;
    border-radius: 11px;
    padding: 0 5%;
    
}
input.p-inputtext.p-component.w-full.input-dis.w-full.input-dis {
    height: 45px;
}
input.p-inputtext.p-component.w-full.input-disar.w-full.input-disar {
    margin: 1em 0;
}
.box-btnsubmit button.p-button.p-component.mx-2.p-button-rounded.p-button-secondary {
    width: 20%;
    border-radius: 11px;
    background: #4caf50;
}
.box-btnsubmit {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 1em;
}
  
</style>
