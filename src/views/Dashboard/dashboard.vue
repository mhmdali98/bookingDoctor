<template>
  <v-container>
    <v-toolbar dense flat color="grey lighten-4">
      <v-toolbar-title class="pl-2">الرئيسية</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row class>
      <v-col cols="12" md="3" sm="12">
        <v-skeleton-loader
          :loading="loading"
          :transition="transition"
          type="card"
        >
          <v-card class="mx-auto" color="grey lighten-4" elevation="5">
            <v-card-title>
              <v-row align="start">
                <div class="pr-5">
                  <span class="display-2 font-weight-black">
                    {{ dash.users }}
                  </span>
                  <strong v-if="avg">عدد المستخدمين </strong>
                </div>
              </v-row>

              <v-spacer></v-spacer>

              <v-icon
                :color="checking ? 'red lighten-2' : 'indigo darken-1'"
                class="mr-1"
                size="50"
                @click="takePulse"
                >mdi-account-group-outline</v-icon
              >
            </v-card-title>

            <v-sheet color="transparent">
              <v-sparkline
                padding="0"
                :fill="fill"
                :key="String(avg)"
                :smooth="16"
                :gradient="['#2d3368', '#2d3368', '#303F9F']"
                :line-width="5"
                :value="heartbeats"
                auto-draw
                stroke-linecap="round"
              ></v-sparkline>
            </v-sheet>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <v-skeleton-loader
          :loading="loading"
          :transition="transition"
          type="card"
        >
          <v-card class="mx-auto" color="grey lighten-4" elevation="5">
            <v-card-title>
              <v-row align="start">
                <div class="pr-5">
                  <span class="display-2 font-weight-black">
                    {{ dash.lab }}
                  </span>
                  <strong v-if="avg">عدد المختبرات</strong>
                </div>
              </v-row>

              <v-spacer></v-spacer>

              <v-icon
                :color="checking ? 'red lighten-2' : 'indigo'"
                class="mr-12"
                size="50"
                @click="takePulse"
                >mdi-chart-bar-stacked</v-icon
              >
            </v-card-title>

            <v-sheet color="transparent">
              <v-sparkline
                padding="0"
                :fill="fill"
                :key="String(avg)"
                :smooth="16"
                :gradient="['#2d3368', '#2d3368', '#303F9F']"
                :line-width="5"
                :value="heartbeats2"
                auto-draw
                stroke-linecap="round"
              ></v-sparkline>
            </v-sheet>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <v-skeleton-loader
          :loading="loading"
          :transition="transition"
          type="card"
        >
          <v-card class="mx-auto" color="grey lighten-4" elevation="5">
            <v-card-title>
              <v-row align="start">
                <div class="pr-5">
                  <span class="display-2 font-weight-black">
                    {{ dash.test }}
                  </span>
                  <strong v-if="avg">عدد التحاليل</strong>
                </div>
              </v-row>

              <v-spacer></v-spacer>

              <v-icon
                :color="checking ? 'red lighten-2' : 'indigo'"
                class="mr-12"
                size="50"
                @click="takePulse"
                >mdi-charity</v-icon
              >
            </v-card-title>

            <v-sheet color="transparent">
              <v-sparkline
                padding="0"
                :fill="fill"
                :key="String(avg)"
                :smooth="16"
                :gradient="['#2d3368', '#2d3368', '#303F9F']"
                :line-width="5"
                :value="heartbeats3"
                auto-draw
                stroke-linecap="round"
              ></v-sparkline>
            </v-sheet>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <v-skeleton-loader
          :loading="loading"
          :transition="transition"
          type="card"
        >
          <v-card class="mx-auto" color="grey lighten-4" elevation="5">
            <v-card-title>
              <v-row align="start">
                <div class="pr-5">
                  <span class="display-2 font-weight-black">
                    {{ dash.booked_Test }}
                  </span>
                  <strong v-if="avg">عدد الحجوزات</strong>
                </div>
              </v-row>

              <v-spacer></v-spacer>

              <v-icon
                :color="checking ? 'red lighten-2' : 'indigo'"
                class="mr-12"
                size="50"
                @click="takePulse"
                >mdi-book-account-outline</v-icon
              >
            </v-card-title>

            <v-sheet color="transparent">
              <v-sparkline
                padding="0"
                :fill="fill"
                :key="String(avg)"
                :smooth="16"
                :gradient="['#2d3368', '#2d3368', '#303F9F']"
                :line-width="5"
                :value="heartbeats2"
                auto-draw
                stroke-linecap="round"
              ></v-sparkline>
            </v-sheet>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-skeleton-loader
          :loading="loading"
          :transition="transition"
          type="card"
        >
          <v-card class="pt-10" color="grey lighten-4" elevation="5">
            <ve-pie :colors="colors1" :data="chartData"></ve-pie>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col lg="6" md="6" sm="12">
        <v-skeleton-loader
          :loading="loading"
          :transition="transition"
          type="card"
        >
          <v-card class="pt-10" color="grey lighten-4" elevation="5">
            <ve-line :colors="colors1" :data="chartData2"></ve-line>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
const exhale = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  data: () => ({
    dash: [],
    transition: "scale-transition",
    loading: false,
    checking: false,
    heartbeats: [],
    heartbeats2: [],
    heartbeats3: [],
    fill: true,
    chartData2: {
      columns: ["date", "مكتمل", "معلق"],
      rows: [
        {
          مكتمل: 1,
          date: "05/05",
          معلق: 1,
        },
        {
          مكتمل: 3,
          date: "05/10",
          معلق: 2,
        },
        {
          مكتمل: 5,
          date: "05/15",
          معلق: 6,
        },
        {
          مكتمل: 2,
          date: "05/20",
          معلق: 4,
        },
        {
          مكتمل: 4,
          date: "05/25",
          معلق: 5,
        },
        {
          مكتمل: 6,
          date: "05/30",
          معلق: 2,
        },
      ],
    },
    chartData: {
      columns: ["name", "number"],
      rows: [
        { name: "تحاليل مكتملة", number: 19 },
        { name: "تحاليل غير مكتمله", number: 18 },
      ],
    },
    colors1: ["#2d3368", "#303F9F", "#61a0a8", "#d48265"],
  }),

  computed: {
    avg() {
      const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0);
      const length = this.heartbeats.length;

      if (!sum && !length) return 0;

      return Math.ceil(sum / length);
    },
  },

  created() {
    this.takePulse(false);
    this.getDash();
  },

  methods: {
    getDash() {
      this.loading = true;
      axios
        .get("Lab/Dashboard")
        .then((res) => {
          this.dash = res.data.result;
          this.chartData.rows[0].number = this.dash.done;
          this.chartData.rows[1].number = this.dash.notdone;

          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    heartbeat() {
      return Math.ceil(Math.random() * (120 - 80) + 80);
    },
    async takePulse(inhale = true) {
      this.checking = true;

      inhale && (await exhale(1000));

      this.heartbeats = Array.from({ length: 20 }, this.heartbeat);
      this.heartbeats2 = Array.from({ length: 15 }, this.heartbeat);
      this.heartbeats3 = Array.from({ length: 10 }, this.heartbeat);

      this.checking = false;
    },
  },
};
</script>

<style lang="scss" scoped>
strong {
  font-size: 1rem;
}
</style>
