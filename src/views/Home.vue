<template>
  <div>
    <div class="ui main container">
        <body>
            <div class="ui container">
                <h1 class="ui center aligned header">目標達成率</h1>
                <div class="ui segment">
                    <h2 class="ui header">ダイエッター</h2>
                    <div class="ui field">
                        <label>氏名：</label>
                    </div>
                </div>
                <div class="ui segment">
                    <h2 class="ui header">進捗グラフ</h2>
                    <canvas id="weightChart"></canvas>
                    <div class="ui center aligned statistic">
                        <div class="value" id="percentageValue">0%</div>
                        <div class="label">目標達成率</div>
                    </div>
                </div>
                <div class="ui segment">
                    <h2 class="ui header">履歴</h2>
                    <table class="ui celled table">
                        <thead>
                            <tr>
                                <th>日付</th>
                                <th>目標達成率</th>
                            </tr>
                        </thead>
                        <tbody id="progressTableBody">
                            <!-- ここにデータが追加されます -->
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from "@/assets/config.js";


// const headers = {'Authorization' : 'mtiToken'};

export default {
  name: "Home",

  components: {
    // 読み込んだコンポーネント名をここに記述する
   
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      logs: [],
      targetWeight: "",
      latestWeight: "",
      user_id: window.localStorage.getItem("userId"),
      name: "",
    };
  },
  computed: {
   
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    calculateAchievement(weight, target , first) {
      let achievement = (((first - weight)/(first - target)) * 100).toFixed(1); 
      return achievement;
    },

    
    async fetchTargetWeight(){
      const headers = { Authorization: window.localStorage.getItem("token") };
      if (headers.Authorization=="5da50cf80844d2cdab1bc15aa9e64802c7d365dec585b2896b9ef46f4274bfc2") {
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

      this.targetWeight = jsonData;
      console.log(this.targetWeight);
    },

    async fetchLogs(){
      const headers = { Authorization: window.localStorage.getItem("token") };
      if (headers.Authorization == "5da50cf80844d2cdab1bc15aa9e64802c7d365dec585b2896b9ef46f4274bfc2") {
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
      console.log(this.logs)
      console.log(this.firstWeight)
    },

  },
  
  created: async function () {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
    await this.fetchLogs();
  },
};
</script>

<style scoped></style>
