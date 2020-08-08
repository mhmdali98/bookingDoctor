<template>
  <div>
    <v-toolbar dense flat color="grey lighten-4">
      <v-toolbar-title class="pl-2">المختبرات</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="detailsDialog = true">اضافة مختبر</v-btn>
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
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn class="indigo--text" icon v-on="on" large>
                    <v-icon l @click="delet(item.id)" color="red"
                      >mdi-delete-outline</v-icon
                    >
                  </v-btn>
                </template>
                <span>حذف</span>
              </v-tooltip>
              <!-- <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn class="indigo--text" icon v-on="on" large>
                    <v-icon l @click="edit(item.id)" color="green">mdi-pencil-outline</v-icon>
                  </v-btn>
                </template>
                <span>تعديل</span>
              </v-tooltip>-->
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
    <v-dialog v-model="detailsDialog" width="400">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            <h3>اضافة مختبر</h3>
          </v-toolbar-title>
          <v-spacer />
          <v-btn @click="detailsDialog = false" icon>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <br />
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                prefix="اسم المختبر : "
                class="mx-2"
                v-model="name"
              />
            </v-col>
          </v-row>
          <br />
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="detailsDialog = false"
            >اغلاق</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="addLap()"
            :loading="loading2"
            >حفظ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      loading2: false,
      name: "",
      detailsDialog: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { sortable: false },
        { text: "اسم المختبر ", value: "labName" },
        { text: "العمليات", value: "actions" },
      ],
      items: [],
      coontractCount: [],
      loading: false,
    };
  },
  methods: {
    addLap() {
      if (this.name) {
        this.loading2 = true;

        axios
          .post("Lab/createLab", { LabName: this.name })
          .then((res) => {
            this.rnData();
            this.loading2 = false;
            this.detailsDialog = false;
            Swal.fire({
              title: "تمت عملية الاضافة بنجاح",
              icon: "success",
              confirmButtonText: "اغلاق",
            });
          })
          .catch((err) => {
            this.loading2 = false;
            Swal.fire({
              title: "اسم المختبر موجود",
              icon: "error",
              confirmButtonText: "اغلاق",
            });
          });
      } else {
        Swal.fire({
          title: "تاكد من ادخال المعلومات",
          icon: "error",
          confirmButtonText: "اغلاق",
        });
      }
    },
    rnData() {
      this.loading = true;
      axios
        .get("Lab/GetAll")
        .then((res) => {
          this.loading = false;
          this.items = res.data.result.labs;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    delet(id) {
      Swal.fire({
        title: "هل انت متاكد من حذف المختبر؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا",
      }).then((result) => {
        if (result.value) {
          axios
            .delete("Lab/deleteLab?ID=" + id)
            .then((res) => {
              this.rnData();
              Swal.fire({
                title: "تمت عملية الحذف بنجاح",
                icon: "success",
                confirmButtonText: "اغلاق",
              });
            })
            .catch((err) => {
              Swal.fire({
                title: "فشلت عمليت الحذف",
                icon: "error",
                confirmButtonText: "اغلاق",
              });
            });
        }
      });
    },
    edit() {
      this.detailsDialog = true;
    },
  },
  created() {
    this.rnData();
  },
};
</script>
