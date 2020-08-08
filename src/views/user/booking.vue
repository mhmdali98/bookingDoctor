<template>
  <v-container class="grey lighten-5">
    <v-row align="center" justify="center">
      <v-col md="4" sm="12" xs="12" align="center" justify="center">
        <div class="pt-10">
          <img src="../../assets/img3.svg" width="100%" />
        </div>
      </v-col>
      <v-col cols="12" md="8" sm="12" align="center" justify="center" class="pt-10">
        <v-card width="100%" class="pa-10">
          <h2>حجز موعد</h2>
          <br />
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row align="center" justify="center">
              <v-col md="5" sm="12" xs="12" align="center" justify="center">
                <v-text-field
                  outlined
                  v-model="name"
                  :rules="nameRules"
                  label="الاسم الكامل "
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="5" sm="12" xs="12" align="center" justify="center">
                <v-text-field
                  outlined
                  v-model="email"
                  :rules="emailRules"
                  label="البريد الالكتروني "
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2" sm="12" xs="12" align="center" justify="center">
                <v-text-field outlined v-model="age" :rules="numRules" label="العمر" required></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12" md="5" sm="12" xs="12" align="center" justify="center">
                <v-select
                  :items="labOption"
                  label="اختر المختبر"
                  outlined
                  :rules="[(v) => !!v || 'يجب تحديد المختبر']"
                  required
                  v-model="labID"
                  @input="getTest(labID)"
                ></v-select>
              </v-col>
              <v-col cols="12" md="7" sm="12" xs="12" align="center" justify="center">
                <v-select
                  outlined
                  v-model="testID"
                  :items="testoption"
                  label="اختر التحاليل"
                  multiple
                  chips
                  hint="يمكن اختيار اكثر من تحليل"
                  persistent-hint
                  :rules="[(v) => !!v || 'يجب تحديد المختبر']"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="12" md="6">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      outlined
                      v-model="date"
                      label="اختر تاريخ الحجز"
                      :rules="[(v) => !!v || 'يجب تحديد تاريخ الحجز']"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">الغاء</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">تم</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col md="6" sm="12" xs="12" align="center" justify="center">
                <v-select
                  :items="timeOption"
                  label="اختر وقت الحجز"
                  outlined
                  :rules="[(v) => !!v || 'يجب تحديد وقت الحجز']"
                  required
                  v-model="timeId"
                ></v-select>
              </v-col>
            </v-row>
            <v-chip>
              <h3 class>
                السعر الكلي :
                {{
                sumPrise
                }}
              </h3>
            </v-chip>
            <v-btn
              :loading="loading"
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="validate"
            >حجز الموعد</v-btn>
            <router-link to="home">
              <v-btn color="grey darken-2" dark class="mr-4" @click="reset">رجوع</v-btn>
            </router-link>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    timeOption: [],
    timeId: "",
    date: new Date().toISOString().substr(0, 10),
    modal: false,
    dateId: "",
    dateoption: [],
    testoption: [],
    testID: [],
    labID: "",
    labOption: [],
    loading: false,
    valid: true,
    name: "",
    email: "",
    age: "",
    nameRules: [
      v => !!v || "اسم المستخدم مطلوب",
      v => (v && v.length <= 50) || "يجب ان يكون اقل من 50 حرف"
    ],
    numRules: [
      v => !!v || "العمر مطلوب",
      v => (v || "").indexOf(" ") < 0 || "المسافات غير مسموحة",
      v => (v && v.length <= 2) || "يجب ان يتكون العمر من رقم او رقمين "
    ],
    emailRules: [
      v => !!v || "البريد مطلوب",
      v => /.+@.+\..+/.test(v) || "البريد غير صحيح"
    ],
    show1: false
  }),
  computed: {
    sumPrise() {
      let sum = 0;
      for (let i = 0; i < this.testoption.length; i++) {
        for (let j = 0; j < this.testID.length; j++) {
          if (this.testoption[i].id == this.testID[j]) {
            sum += this.testoption[i].price;
          }
        }
      }
      return sum;
    }
  },

  methods: {
    getTime() {
      axios.get("Lab/GetTimes").then(res => {
        this.timeOption = res.data.result.times;
        for (let i = 0; i < this.timeOption.length; i++) {
          this.timeOption[i].value = this.timeOption[i].timeID;
          this.timeOption[i].text = this.timeOption[i].time;
        }
      });
    },
    getDate() {
      axios.get("Lab/GetDate?ID=" + this.$store.state.idToken).then(res => {
        this.date = res.data.result.dates;
        for (let i = 0; i < this.dateoption.length; i++) {
          this.dateoption[i].value = this.dateoption[i].id;
          this.dateoption[i].text = this.dateoption[i].labName;
        }
      });
    },
    getlab() {
      axios
        .get("Lab/GetAll")
        .then(res => {
          this.labOption = res.data.result.labs;
          for (let i = 0; i < this.labOption.length; i++) {
            this.labOption[i].value = this.labOption[i].id;
            this.labOption[i].text = this.labOption[i].labName;
          }
        })
        .catch(err => {});
    },
    getTest(id) {
      axios
        .get("Lab/GetTest?ID=" + id)
        .then(res => {
          this.testoption = res.data.result.tests;
          for (let i = 0; i < this.testoption.length; i++) {
            this.testoption[i].value = this.testoption[i].id;
            this.testoption[i].text =
              this.testoption[i].testName + " - " + this.testoption[i].price;
          }
        })
        .catch(err => {});
    },
    onSend() {
      if (
        this.name &&
        this.email &&
        this.age &&
        this.labID &&
        this.testID &&
        this.date &&
        this.timeId
      ) {
        axios
          .delete("Lab/Booktime?ID=" + this.timeId)
          .then()
          .catch();

        const userData = {
          FullName: this.name,
          age: this.age,
          Email: this.email,
          LabID: this.labID,
          TestID: this.testID,
          TimeID: this.timeId,
          Date: this.date,
          Totalprice: this.sumPrise
        };
        console.log(userData);
        this.loading = true;
        // this.$router.push("/");
        axios
          .post("Lab/BookAtest", userData)
          .then(res => {
            this.loading = false;
            // console.log(res);
            Swal.fire({
              title: "تمت عملية الحجز بنجاح",
              text: "تاكد ان تكون موجود قبل موعد الحجز",
              icon: "success",
              confirmButtonText: "اغلاق"
            });
          })
          .catch(err => {
            this.loading = false;
            // console.log(err.response.data.code);
            Swal.fire({ title: "حدث خطا في الارسال", icon: "error" });
          });
      } else {
        Swal.fire({
          title: "تاكد من ادخال المعلومات",
          icon: "error"
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
    }
  },
  created() {
    this.getlab();
    this.getTime();
  }
};
</script>

<style></style>
