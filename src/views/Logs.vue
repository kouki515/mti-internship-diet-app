<template>
  <div class="ui main container">
    <div class="ui container">
      <h1 class="ui center aligned header">ダイエット進捗履歴</h1>
      <div class="ui segment">
        <div class="ui divided items">
          <div v-for="(log, index) in logs" :key="index" class="item">
            <div class="content">
              <div class="header">{{ log.time_stamp }}</div>
              <div class="description">{{ calculateAchievement(log.weight_log,targetWeight,firstWeight) }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { baseUrl } from "@/assets/config.js";


export default {
  name: "Logs",

  components: {
   
  },

  data() {
    return {
      logs: [],
      userId: window.localStorage.getItem("userId"),
      targetWeight : null,
      firstWeight : null,
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    calculateAchievement(weight, target , first) {
      let achievement = (((first - weight)/(first - target)) * 100).toFixed(1); 
      return achievement;
    },

    async fetchLogs(){
      const headers = { Authorization: window.localStorage.getItem("token") };
      if (!headers.Authorization) {
      this.$router.push("/login");
      return;
    }

      const res = await fetch(`${baseUrl}/logs?user_id=${this.userId}`, {
        method: "GET",
        headers,
      });

      const text = await res.text();
      const jsonData = text ? JSON.parse(text) : {};

      
      if (!res.ok) {
        const errorMessage = jsonData.message ?? "エラーメッセージがありません";
        throw new Error(errorMessage);
      }

      this.firstWeight = jsonData[jsonData.length - 1].weight_log;

      this.logs = jsonData;
      console.log(this.logs[0].time_stamp)
      console.log(this.firstWeight)
    },
    async fetchTargetWeight(){
      const headers = { Authorization: window.localStorage.getItem("token") };
      if (!headers.Authorization) {
      this.$router.push("/login");
      return;
    }

      const res = await fetch(`${baseUrl}/weightgoal?user_id=${this.userId}`, {
        method: "GET",
        headers,
      });

      const text = await res.text();
      const jsonData = text ? JSON.parse(text) : {};

      
      if (!res.ok) {
        const errorMessage = jsonData.message ?? "エラーメッセージがありません";
        throw new Error(errorMessage);
      }

      this.targetWeight = jsonData[0].weight_goal;
      console.log(this.targetWeight);
    },
  },
  created: async function () {
    await this.fetchLogs();
    await this.fetchTargetWeight();
  },
};
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
</style>