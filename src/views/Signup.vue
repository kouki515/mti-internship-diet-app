<template>
  <div>
    <div class="ui main container">
      <header>
        <h1>LOGIN</h1>
      </header>
      <h4>必要なログイン情報をご入力ください。</h4>
      <form class="ui large form"> <!--ログインフォーム-->
        <div class="field">
          <div class="t">
            <label for="">メールアドレス</label>
            <input type="email" placeholder="12345@example.com" required>
          </div>
          <div class="t">
            <label for="">パスワード</label>
            <input type="password" maxlength="15" pattern="^[a-zA-Z0-9]+$" required>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox">
            <label for="">パスワードを保存する</label>
          </div>
        </div>
        <button class="ui olive fluid button" type="submit">ログイン</button>
      </form>
      <div class="y">
        <button class="ui black basic fluid button" type="button">登録</button>
      </div>
      <div class="s">
        <a href="" class="a">ログインでお困りの方はこちら</a>
      </div>
      <div class="">
        <button class="ui black basic fluid button" type="button">合言葉をお持ちの方はこちら</button>
      </div>
    </div>
    <div class="ui container">
      <h1 class="ui center aligned header">サインアップ（ダイエッター）</h1>
      <form class="ui form" action="/signup" method="post">
        <div class="field">
          <label for="email">メールアドレス：</label>
          <input type="email" id="email" name="email" required v-model="dieter.email">
        </div>

        <div class="field">
          <label for="password">パスワード：</label>
          <input type="password" id="password" name="password" required v-model="dieter.password">
        </div>

        <div class="field">
          <label for="username">ユーザーネーム：</label>
          <input type="text" id="username" name="username" required v-model="dieter.username">
        </div>

        <div class="field">
          <label for="height">身長（cm）：</label>
          <input type="number" id="height" name="height" v-model.number="dieter.height">
        </div>

        <div class="field">
          <label for="weight">体重（kg）：</label>
          <input type="number" id="weight" name="weight" v-model="dieter.weight">
        </div>

        <div class="field">
          <label for="weight">目標体重（kg）：</label>
          <input type="number" id="weight" name="weight" v-model="dieter.weight_goal">
        </div>

        <div class="field">
          <label for="age">年齢：</label>
          <input type="number" id="age" name="age" required v-model.number="dieter.age">
        </div>

        <div class="field">
          <label for="secret_word">合言葉：</label>
          <input type="password" id="secret_word" name="secret_word" placeholder="合言葉を決めてください" required
            v-model="dieter.secret_word">
        </div>

        <button class="ui button primary" type="submit" @click="submit()">サインアップ</button>
      </form>
    </div>
    <div class="ui main container">
      <div class="ui container">
        <h1 class="ui center aligned header">サインアップ（ウォッチャー）</h1>
        <form class="ui form" action="/signup" method="post">
          <div class="field">
            <label for="email">メールアドレス：</label>
            <input type="email" id="email" name="email" required>
          </div>

          <div class="field">
            <label for="password">パスワード：</label>
            <input type="password" id="password" name="password" required>
          </div>

          <div class="field">
            <label for="username">ユーザーネーム：</label>
            <input type="text" id="username" name="username" required>
          </div>

          <div class="field">
            <label for="secret_word">合言葉：</label>
            <input type="password" id="secret_word" name="secret_word" placeholder="教えてもらった合言葉を入れて下さい" required>
          </div>

          <button class="ui button primary" type="submit">サインアップ</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';

export default {
  name: 'Signup',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      isDiet: false,
      isLogin: true,
      // ダイエットする人に必要な変数
      dieter: {
        email: "testmail@icloud.com",
        password: "testpas",
        username: "testname",
        height: 170,
        weight: 60,
        weight_goal: 50,
        age: 22,
        secret_word: "test",
      }
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    async submit() {
      if (this.isLogin == false) {

        const headers = { 'Authorization': 'mtiToken' };
        // リクエストボディを指定する
        const requestBody = {
          userId: this.user.userId,
          password: this.user.password,
          nickname: this.user.nickname,
          age: this.user.age,
        }

        try {
          /* global fetch */
          const res = await fetch(baseUrl + '/user/signup',
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

          // 成功時の処理
          window.localStorage.setItem('token', jsonData.token);
          window.localStorage.setItem('userId', this.user.userId);

          this.$router.push({ name: 'Home' })
          console.log(jsonData);
        } catch (e) {
          // エラー時の処理
        }
      }
      // ログイン時の処理
      // else if (this.isLogin) {
      //   // リクエストボディを指定する
      //   const headers = { 'Authorization': 'mtiToken' };

      //   const requestBody = {
      //     userId: this.user.userId,
      //     password: this.user.password,
      //   }

      //   try {
      //     /* global fetch */
      //     const res = await fetch(baseUrl + '/user/login',
      //       {
      //         method: 'POST',
      //         body: JSON.stringify(requestBody),
      //         headers
      //       });

      //     const text = await res.text();
      //     const jsonData = text ? JSON.parse(text) : {}

      //     // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
      //     if (!res.ok) {
      //       const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
      //       throw new Error(errorMessage);
      //     }

      //     // 成功時の処理
      //     window.localStorage.setItem('token', jsonData.token);
      //     window.localStorage.setItem('userId', this.user.userId);

      //     this.$router.push({ name: 'Home' })
      //   } catch (e) {
      //     // エラー時の処理
      //   }
      // }
    },
  },
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
</style>
