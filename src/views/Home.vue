<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <form class="ui form">
          <label>ユーザーID</label>
          <div class="inline fields">
            <div class="field">
              <input v-model="search.userId" type="text" name="agestart" />
            </div>
          </div>
          <div class="inline fields">
            <div class="field">
              <div for="ageend">カテゴリー名</div>
              <input v-model="search.category" type="text" name="agestart" />
            </div>
          </div>
          <div class="inline fields">
            <div class="field">
              <div>投稿日時</div>
              <input v-model="start" type="text" name="agestart" />
              <label for="agestart">から</label>
            </div>
            <div class="field">
              <input v-model="end" type="text" name="ageend" />
              <label for="ageend">まで</label>
            </div>
          </div>
        </form>
      </div>
      <div class="ui segment">
        <!--<Posts :post_array = "post_array" />-->
        <ul class="ui three column grid">
          <template v-for="(item, index) in articles" :key="index">
            <li class="column">
              <h2 class="header">{{ item.userId }}</h2>
              <span>{{ convertToLocaleString(item.timestamp) }}</span>
              <div>{{ item.text }}</div>
              <div class="ui green label">{{ item.category }}</div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from "@/assets/config.js";
import Posts from "@/components/Posts.vue";

// const headers = {'Authorization' : 'mtiToken'};

export default {
  name: "Home",

  components: {
    // 読み込んだコンポーネント名をここに記述する
    Posts,
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      post: {
        text: null,
        category: null,
      },
      search: {
        userId: null,
        category: null,
        start: null,
        end: null,
      },
      articles: [],
      iam: null,
    };
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    //   async getSearchedArticle() { // 記事を検索する
    //   return this.articles.filter(e =>
    //     e.userId?.match(e.search.userId)
    //     && convertToLocalString(e.timestamp) >= this.search.start
    //     && convertToLocalString(e.timestamp) <= this.search.end
    //   );
    // },
    async filteredArticles() {
      return this.articles.filter(e =>
          e.userId?.match(this.search.userId)
          && e.timestamp >= new Date(this.search.start)
          && e.timestamp <= new Date(this.search.end)
      );
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    // isMyArticle(id) {}, // 自分の記事かどうかを判定する
    // async getArticles() {}, // 記事一覧を取得する

    // async postArticle() {}, // 記事を作成する

    // async deleteArticle(article) {}, // 記事を削除する
    convertToLocaleString(timestamp) {
      let time = new Date(timestamp);
      let date = time.toLocaleDateString();
      let date_2 = time.toLocaleTimeString();
      return date + ' ' + date_2;
    }, // timestampをLocaleDateStringに変換する
  },

  created: async function () {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
    const headers = { Authorization: "mtiToken" };

    try {
      /* global fetch */
      const res = await fetch(baseUrl + `/articles`, {
        method: "GET",
        headers,
      });

      const text = await res.text();
      const jsonData = text ? JSON.parse(text) : {};

      // faild
      if (!res.ok) {
        const errorMessage = jsonData.message ?? "error message not found";
        throw new Error(errorMessage);
      }

      // success
      this.articles = jsonData.articles;
    } catch (e) {
      // error
    }
  },
};
</script>

<style scoped></style>
