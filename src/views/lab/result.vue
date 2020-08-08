<template>
  <v-card max-width="350px" class="mx-auto my-5">
    <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ fullname }}</v-list-item-title>
        <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <p>العمر : {{ age }}</p>
      <p>التحاليل : {{ test }}</p>
      <p>التاريخ : {{ date }}</p>
      <p>الوقت : {{ time }}</p>
      <p>السعر الكلي : {{ prise }}</p>
    </v-card-text>

    <v-card-actions>
      <v-btn text color="deep-purple accent-4" @click="sendD">ارسال النتائج</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      fullname: "",
      email: "",
      time: "",
      test: "",
      isDone: false,
      date: "",
      age: "",
      prise: ""
    };
  },
  methods: {
    rnData() {
      axios
        .get("Lab/GetBookedTests?ID=" + 1)
        .then(res => {
          for (let i = 0; i < res.data.result.labs.length; i++) {
            if (this.id == res.data.result.labs[i].id) {
              console.log(res.data.result.labs[i]);
              this.fullname = res.data.result.labs[i].fullName;
              this.email = res.data.result.labs[i].email;
              this.time = res.data.result.labs[i].time;
              this.date = res.data.result.labs[i].date;
              this.test = res.data.result.labs[i].test;
              this.isDone = res.data.result.labs[i].isDone;
              this.age = res.data.result.labs[i].age;
              this.prise = res.data.result.labs[i].totalprice;
            }
          }
        })
        .catch(err => {});
    },
    sendD() {
      axios
        .delete("Lab/DoneTest?ID=" + this.id)
        .then(res => {
          window.open("mailto:" + this.email);
        })
        .catch(err => {
          Swal.fire({
            title: "فشلت   ",
            icon: "error",
            confirmButtonText: "اغلاق"
          });
        });
    }
  },
  created() {
    this.rnData();
  }
};
</script>

<style></style>
