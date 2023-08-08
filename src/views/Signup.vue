<template>
  <div>
    <!--ログインフォーム-->
    <div class="ui main container">
      <header v-if="isLogin">
        <h1>LOGIN</h1>
      </header>
      <div class="ui segment" v-if="isLogin">
        <h4>必要なログイン情報をご入力ください。</h4>
        <form class="ui large form">
          <div class="field">
            <div class="t">
              <label for="">メールアドレス</label>
              <input type="email" placeholder="12345@example.com" v-model=users.email required>
            </div>
            <div class="t">
              <label for="">パスワード</label>
              <input type="password" maxlength="15" pattern="^[a-zA-Z0-9]+$" v-model=users.password required>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox">
              <label for="">パスワードを保存する</label>
            </div>
          </div>
          <button class="ui olive fluid button" type="submit" @click="submit()">ログイン</button>
        </form>
        <div class="y">
          <button class="ui black basic fluid button" type="button" @click="DieterMode()">登録</button>
        </div>
        <!-- <div class="s">
          <a href="" class="a">ログインでお困りの方はこちら</a>
        </div> -->
        <div>
          <button class="ui black basic fluid button" type="button" @click="WatcherMode()">合言葉をお持ちの方はこちら</button>
        </div>
      </div>
    </div>
    <!-- dieterの新規登録 -->
    <div class="ui container">
      <div class="ui segment" v-if="isDiet">
        <h1 class="ui center aligned header">サインアップ（ダイエッター）</h1>
        <form class="ui form">
          <div class="field">
            <label for="email">メールアドレス：</label>
            <input type="email" id="email" name="email" required v-model="users.email">
          </div>
          <div class="field">
            <label for="password">パスワード：</label>
            <input type="password" id="password" name="password" required v-model="users.password">
          </div>
          <div class="field">
            <label for="username">ユーザーネーム：</label>
            <input type="text" id="username" name="username" required v-model="users.name">
          </div>
          <div class="field">
            <label for="height">身長（cm）：</label>
            <input type="number" id="height" name="height" v-model.number="users.height">
          </div>
          <div class="field">
            <label for="weight">体重（kg）：</label>
            <input type="number" id="weight" name="weight" v-model="users.weight">
          </div>
          <!-- <div class="field">
            <label for="weight">目標体重（kg）：</label>
            <input type="number" id="weight" name="weight" v-model="users.weight_goal">
          </div> -->
          <div class="field">
            <label for="age">年齢：</label>
            <input type="number" id="age" name="age" required v-model.number="users.age">
          </div>
          <div class="field">
            <label for="secret_word">合言葉：</label>
            <input type="password" id="secret_word" name="secret_word" placeholder="合言葉を決めてください" required
              v-model="users.secret_word">
          </div>
          <button class="ui olive fluid button" type="submit" @click="submit()">サインアップ</button>
        </form>
      </div>
    </div>
    <!-- watcherの新規登録ページ -->
    <div class="ui main container">
      <div class="ui container">
        <div class="ui segment" v-if="isWatch">
          <h1 class="ui center aligned header">サインアップ（ウォッチャー）</h1>
          <form class="ui form">
            <div class="field">
              <label for="email">メールアドレス：</label>
              <input type="email" id="email" name="email" v-model="users.email" required>
            </div>
            <div class="field">
              <label for="password">パスワード：</label>
              <input type="password" id="password" name="password" v-model="users.password" required>
            </div>
            <div class="field">
              <label for="username">ユーザーネーム：</label>
              <input type="text" id="username" name="username" v-model="users.name" required>
            </div>
            <div class="field">
              <label for="secret_word">合言葉：</label>
              <input type="password" id="secret_word" name="secret_word" placeholder="教えてもらった合言葉を入れて下さい"
                v-model="users.secret_word" required>
            </div>
            <button class="ui olive fluid button" type="submit">サインアップ</button>
          </form>
        </div>
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
      isWatch: false,
      isLogin: true,
      // ダイエットする人に必要な変数
      users: {
        // userId: "test",
        id: 1,
        email: "testmail@icloud.com",
        password: "testpas",
        name: "testname",
        role: "dieter",
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

      // dieterの新規登録
      if (this.isDiet && this.isLogin == false && this.isWatch == false) {

        const headers = { 'Authorization': 'mtiToken' };
        // リクエストボディを指定する
        const requestBody = {
          userId: this.users.userId,
          password: this.users.password,
        }
        console.log(this.users.email);

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

          // this.$router.push({ name: 'Home' })
          console.log(jsonData);
        } catch (e) {
          // エラー時の処理
          console.log("notFound");
        }
      }

      // watcherの新規登録時に実行
      else if (this.isWatch && this.isDiet == false && this.isLogin == false) {
        // リクエストボディを指定する
        const headers = { 'Authorization': 'mtiToken' };

        const requestBody = {
          userId: this.users.userId,
          password: this.users.password,
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
          window.localStorage.setItem('userId', this.users.userId);
          window.localStorage.setItem('name', this.users.name);

          // this.$router.push({ name: 'Home' })
        } catch (e) {
          // エラー時の処理
        }
      }

      // ログイン時の処理
      else if (this.isLogin && this.isDiet == false && this.isWatch == false) {
        // リクエストボディを指定する
        const headers = { 'Authorization': 'mtiToken' };

        const requestBody = {
          userId: this.users.userId,
          password: this.users.password,
        }

        try {
          /* global fetch */
          const res = await fetch(baseUrl + '/user/login',
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
          window.localStorage.setItem('userId', this.users.userId);
          window.localStorage.setItem('userId', this.users.password);


          // this.$router.push({ name: 'Home' })
        } catch (e) {
          // エラー時の処理
          console.log("notFound");
        }
      }
    },

    // dieterの新規登録の表示
    DieterMode() {
      this.isDiet = true;
      this.isLogin = false;
      this.isWatch = false;
    },
    // watcherの新規登録の表示
    WatcherMode() {
      this.isWatch = true;
      this.isLogin = false;
      this.isDiet = false;
    },
  },
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
.y {
  text-align: center;
  margin-top: 10px;
}

.s {
  text-align: center;
  margin: 10px;
}

.t {
  margin-top: 25px;
}

header {
  padding-top: 70px;
}
</style>
