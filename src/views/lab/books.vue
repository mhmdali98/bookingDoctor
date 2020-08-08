<template>
  <div>
    <v-toolbar dense flat color="grey lighten-4">
      <v-toolbar-title class="pl-2">الحجوزات</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container class="grey lighten-5">
      <v-row class="mx-1">
        <v-text-field
          v-model="search"
          outlined
          dense
          hide-details
          filled
          prepend-inner-icon="search"
          placeholder="اكتب للبحث"
        />
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-data-table
            :loading="loading"
            loading-text="جاري جلب المعلومات"
            class="mt-4"
            :headers="headers"
            :items="items"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            :search="search"
          >
            <template v-slot:item.isDone="{ item }">
              <v-chip
                class="ma-2"
                color="pink"
                text-color="white"
                v-if="!item.isDone"
              >{{ item.isDone }}</v-chip>
              <v-chip
                class="ma-2"
                color="teal"
                text-color="white"
                v-if="item.isDone"
              >{{ item.isDone }}</v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn class="indigo--text" icon v-on="on" large>
                    <v-icon l @click="delet(item.id)" color="red">mdi-delete-outline</v-icon>
                  </v-btn>
                </template>
                <span>حذف</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <router-link :to="{ name: 'result', params: { id: item.id } }">
                    <v-btn class="indigo--text" icon v-on="on" large>
                      <v-icon l @click="edit(item.id)" color="green">mdi-eye-outline</v-icon>
                    </v-btn>
                  </router-link>
                </template>
                <span>معاينة</span>
              </v-tooltip>
            </template>
            <template v-slot:no-data>
              <h3>لاتوجد بيانات لعرضها</h3>
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      show1: false,
      search: "",
      loading2: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { sortable: false },
        { text: "اسم المريض ", value: "fullName" },
        { text: " العمر ", value: "age" },
        { text: " البريد الالكتروني ", value: "email" },
        { text: "تاريخ الحجز", value: "date" },
        { text: "وقت الحجز", value: "time" },
        { text: "السعر الكلي", value: "totalprice" },
        { text: "الحالة ", value: "isDone" },
        { text: "العمليات", value: "actions" }
      ],
      items: [],
      coontractCount: [],
      loading: false
    };
  },
  methods: {
    addLap() {
      if (this.name && this.labID) {
        this.loading2 = true;
        const userData = {
          TestName: this.name,
          LabID: this.labID
        };
        axios
          .post("Lab/AddTest", userData)
          .then(res => {
            this.rnData();
            this.loading2 = false;
            this.detailsDialog = false;
            Swal.fire({
              title: "تمت عملية الاضافة بنجاح",
              icon: "success",
              confirmButtonText: "اغلاق"
            });
          })
          .catch(err => {
            this.loading2 = false;
            Swal.fire({
              title: "اسم التحليل موجود",
              icon: "error",
              confirmButtonText: "اغلاق"
            });
          });
      } else {
        Swal.fire({
          title: "تاكد من ادخال المعلومات",
          icon: "error",
          confirmButtonText: "اغلاق"
        });
      }
    },
    rnData() {
      this.loading = true;
      axios
        .get("Lab/GetBookedTests?ID=" + 1)
        .then(res => {
          this.loading = false;
          this.items = res.data.result.labs;
        })
        .catch(err => {
          this.loading = false;
        });
    },

    delet(id) {
      Swal.fire({
        title: "هل انت متاكد من الحذف ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا"
      }).then(result => {
        if (result.value) {
          axios
            .delete("Lab/deleteBooked?ID=" + id)
            .then(res => {
              Swal.fire({
                title: "تمت عملية الحذف بنجاح",
                icon: "success",
                confirmButtonText: "اغلاق"
              });
              this.rnData();
            })
            .catch(err => {
              Swal.fire({
                title: "فشلت عملية الحذف ",
                icon: "error",
                confirmButtonText: "اغلاق"
              });
            });
        }
      });
    },
    edit() {
      this.detailsDialog = true;
    }
  },
  created() {
    this.rnData();
  }
};
</script>
