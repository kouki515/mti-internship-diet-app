<template>
  <div>
    <!--ログインフォーム-->
    <div class="ui main container">
      <header v-if="isLogin">
        <h1>LOGIN</h1>
      </header>
      <h1 class="ui center aligned header" v-if="isLogin == false">サインアップ</h1>
      <div class="ui segment">
        <h4>必要なログイン情報をご入力ください。</h4>
        <form class="ui large form">
          <div class="field">
            <div class="t">
              <div class="field" v-if="isLogin == false">
                <label for="username">ユーザーネーム：</label>
                <input type="text" id="username" name="username" required v-model="users.name">
              </div>
              <label for="">メールアドレス</label>
              <input type="email" placeholder="12345@example.com" v-model=users.mailaddress required>
            </div>
            <div class="t">
              <label for="">パスワード</label>
              <input type="password" maxlength="15" pattern="^[a-zA-Z0-9]+$" v-model=users.password required>
            </div>
          </div>
          <button class="ui olive fluid button" type="submit" @click="submit()">{{ submitText }}
          </button>
        </form>
        <div class="y">
          <button class="ui black basic fluid button" type="button" @click="DieterMode()">{{ toggleText }}
          </button>
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
      isLogin: true,
      // ダイエットする人に必要な変数
      users: {
        id: Number,
        mailaddress: "",
        password: "",
        name: "",
      }
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    submitText() {
      return this.isLogin ? 'ログイン' : '新規登録';
    },
    toggleText() {
      return this.isLogin ? '新規登録' : 'ログイン';
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    async submit() {

      // 新規登録
      if (this.isLogin == false) {

        // リクエストボディを指定する
        const requestBody = {
          name: this.users.name,
          mailaddress: this.users.mailaddress,
          password: this.users.password,
        }
        // console.log(this.requestBody);

        try {
          /* global fetch */
          const res = await fetch(baseUrl + '/user/signup',
            {
              method: 'POST',
              body: JSON.stringify(requestBody),
            });

          const text = await res.text();
          const jsonData = text ? JSON.parse(text) : {}
          // console.log(text);

          // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
          if (!res.ok) {
            const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
            throw new Error(errorMessage);
          }

          // 成功時の処理
          window.localStorage.setItem('token', jsonData.token);
          window.localStorage.setItem('userId', jsonData.data[0].id);

          this.$router.push({ name: 'Home' })
          // console.log(jsonData);
        } catch (e) {
          // エラー時の処理
          console.log("notFound");
        }
      }

      // ログイン時の処理
      else if (this.isLogin) {
        // リクエストボディを指定する

        const requestBody = {
          mailaddress: this.users.mailaddress,
          password: this.users.password,
        }

        try {
          /* global fetch */
          const res = await fetch(baseUrl + '/user/login',
            {
              method: 'POST',
              body: JSON.stringify(requestBody),
            });
          // console.log(requestBody);
          const text = await res.text();
          // console.log(text);
          const jsonData = text ? JSON.parse(text) : {}

          // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
          if (!res.ok) {
            const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
            throw new Error(errorMessage);
          }
          // 成功時の処理
          console.log(jsonData);
          window.localStorage.setItem('token', jsonData.token);
          window.localStorage.setItem('userId', jsonData.data[0].id);
          // this.$router.push({ name: 'Home' })
        } catch (e) {
          // エラー時の処理
        }
      }
    },

    // dieterの新規登録の表示
    DieterMode() {
      this.isLogin = !this.isLogin;
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
