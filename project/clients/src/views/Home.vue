<template>
  <div class="relative">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <Map class="z-0" />
    <div class="absolute top-0 right-0 p-2 mr-5">
      <div class="z-2">
        <Button
          class="mx-2 p-button-rounded p-button-secondary"
          icon="pi pi-pencil"
          @click="featureShow()"
        />
        <Button
          class="mx-2 p-button-rounded p-button-secondary"
          icon="pi pi-check"
          @click="asd()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Button from "primevue/button";
import Map from "../components/Map";
import axios from "axios";

// const mysql = require('mysql2');

// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "",
//   database: "geodb",
// });

export default {
  setup() {
    const store = useStore();

    return {
      store,
      drawFeatureShow: false,
    };
  },
  methods: {
    featureShow() {
      this.drawFeatureShow = this.$store.state.drawState;
      this.$store.dispatch("getDrawState", !this.drawFeatureShow);
    },
    asd() {
      // console.log(this.store.state.userProfile.user_id + "asd");
      const idname = this.store.state.userProfile.user_id;
      // //var sql = "INSERT INTO customers (user_id, geometry_data) VALUES ( ' .idname.', 'Highway 37')";
      // //console.log(sql);
      // // con.query(sql, function (err, result) {
      // //   if (err) throw err;
      // //   console.log("1 record inserted");
      // // });
      // db.query(
      //   "INSERT INTO customers (user_id, geometry_data) VALUES ( " + idname + ", 'Highway 37')",
      //   // (err, result) => {
      //   //   if (err) {
      //   //     console.log(err);
      //   //   } else {
      //   //     res;
      //   //   }
      //   // }
      // );
      const latlong = this.$store.state.geometrydr;
      console.log(latlong);
      axios
        .post(`http://localhost:8081/userinsertdb`, {
          idname: idname,
          latlong: latlong,
        })

        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    Map,
    Button,
  },
  name: "Home",
};
</script>
