<template>
  <v-container class="grey lighten-5">
    <v-row align="start" justify="start">
      <v-col md="6" sm="12" xs="12" class="bg"></v-col>
      <v-col xl="6" lg="6" md="6" sm="12" xs="12" align="right" class="pt-10">
        <h1 class="mt-12 pt-12" style="color:#1976d2;">منصة مختبري</h1>
        <p class="mb-12 pb-12 mt-5">
          منصة الكترونية لحجز مواعيد زيارات العيادة و المختبر
        </p>
        <router-link to="/booking">
          <v-btn x-large rounded class="my-5" color="primary">احجز موعد</v-btn>
        </router-link>
        <p>
          هل انت صاحب مختبر؟
          <router-link to="/log">
            <v-btn>دخول</v-btn>
          </router-link>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data: () => ({}),

  methods: {
    onSend() {},
    validate() {
      this.$refs.form.validate();
      this.onSend();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("../../assets/home.svg");
  background-repeat: no-repeat;
  // background-origin: content-box, padding-box;
  background-attachment: fixed;
  background-position: top left;
  background-size: 45%;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  position: fixed;
}
p {
  color: rgb(80, 80, 80);
  font-size: 1.2rem;
  font-family: "Cairo", sans-serif;
}
h1 {
  font-size: 3rem;
  font-family: "Cairo", sans-serif;
}
</style>
