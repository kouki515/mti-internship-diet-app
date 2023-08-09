<template>
  <div>
    <div class="ui main container">
      <form class="ui form">
        <div class="field">
          <label>あいことば</label>
          <input type="text" v-model="passphrase">
        </div>
        <button class="ui button" @click="submitToLambda1">パートナーを探す</button>
        <button class="ui button" @click="pairingStart">パートナーを待つ</button>
      </form>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from "@/assets/config.js";

export default {
  name: 'Pairing',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      token: window.localStorage.getItem('token'),
      userId: window.localStorage.getItem('userId'),
      passphrase: ""
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    async pairingStart() {
      const headers = { 'Authorization': this.token };
      // リクエストボディを指定する
      const requestBody = {
        userId: this.userId,
        passphrase: this.passphrase
      }
      console.log(this.userId);
      console.log(this.passphrase);

      try {
        /* global fetch */
        const res = await fetch(baseUrl + '/pairing/start',
          {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers
          });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }

        this.$router.push({ name: 'Home' })
        console.log(jsonData);
      } catch (e) {
        // エラー時の処理
      }
    }
  },
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
</style>
