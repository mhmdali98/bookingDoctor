<template>
  <v-container class="grey lighten-5">
    <v-row align="center" justify="center">
      <v-col
        cols="12"
        md="6"
        sm="12"
        align="center"
        justify="center"
        class="pt-10"
      >
        <v-card width="80%" class="pa-10">
          <h2>تسجيل الدخول</h2>
          <br />
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              outlined
              v-model="name"
              :counter="15"
              :rules="nameRules"
              label="اسم المستخدم"
              required
            ></v-text-field>

            <v-text-field
              outlined
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="كلمة المرور"
              hint="8 رموز على الأقل"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn
              :loading="loading"
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="validate"
              >دخول</v-btn
            >
            <router-link to="home">
              <v-btn color="grey darken-2" dark class="mr-4" @click="reset"
                >رجوع</v-btn
              >
            </router-link>
          </v-form>
        </v-card>
      </v-col>

      <v-col md="6" sm="12" xs="12" align="center" justify="center">
        <div class="pt-10">
          <img src="../assets/loginImg.svg" width="90%" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    loading: false,
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "اسم المستخدم مطلوب",
      (v) => (v && v.length <= 15) || "يجب ان يكون اقل من 15 حرف",
    ],
    show1: false,
    password: "",
    rules: {
      required: (value) => !!value || "مطلوب.",
      min: (v) => v.length >= 8 || "8 رموز على الاقل",
    },
  }),

  methods: {
    onSend() {
      if (this.name && this.password) {
        const userData = {
          UserName: this.name,
          Password: this.password,
        };
        this.loading = true;
        // this.$router.push("/");
        axios
          .post("Lab/Login", userData)
          .then((res) => {
            this.loading = false;
            // console.log(res);
            this.$store
              .dispatch("login", res.data.result)
              .then()
              .catch((err) => {});
          })
          .catch((err) => {
            this.loading = false;
            // console.log(err.response.data.code);
            if (
              err.response.data.code == 404.1 ||
              err.response.data.code == 404.2
            ) {
              Swal.fire({
                title: "خطا في اسم المستخدم او كلمة المرور",
                icon: "error",
              });
            } else {
              Swal.fire({ title: "المستخدم غير موجود", icon: "error" });
            }
          });
      } else {
        Swal.fire({
          title: "تاكد من ادخال المعلومات",
          icon: "error",
        });
        this.spnr.loading = false;
      }
    },
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

<style></style>
