<template>
  <div>
    <div class="ui main container">
        <head>
            <title>設定変更</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
        </head>
        <body>
            <div class="ui container">
                <h1 class="ui center aligned header">設定</h1>
                <div class="ui segment">
                    <form class="ui form" id="settingsForm">
                        <div class="field">
                            <label>ユーザーネーム</label>
                            <input type="text" id="username" placeholder="ユーザーネーム" required>
                        </div>
                        <div class="field">
                            <label>メールアドレス</label>
                            <input type="email" id="email" placeholder="メールアドレス" required>
                        </div>
                        <div class="field">
                            <label>パスワード</label>
                            <input type="password" id="password" placeholder="パスワード" required>
                        </div>
                        <div class="field">
                            <label>パスワード(再入力)</label>
                            <input type="password" id="confirmPassword" placeholder="パスワード(再入力)" required>
                        </div>
                        <div class="field">
                            <label>年齢</label>
                            <input type="number" id="age" placeholder="年齢" required>
                        </div>
                        <div class="field">
                            <label>身長（cm）</label>
                            <input type="number" id="height" placeholder="身長" required>
                        </div>
                        <div class="field">
                            <label>目標体重（kg）</label>
                            <input type="number" id="targetWeight" placeholder="目標体重" required>
                        </div>
                        <button class="ui button primary" type="submit">更新</button>
                    </form>
                </div>
            </div>
        </body>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
const settingsForm = document.getElementById('settingsForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const ageInput = document.getElementById('age');
const heightInput = document.getElementById('height');
const targetWeightInput = document.getElementById('targetWeight');

settingsForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const age = parseInt(ageInput.value);
    const height = parseInt(heightInput.value);
    const targetWeight = parseFloat(targetWeightInput.value);

    // フォームデータを送信または処理するコードを追加

    // 例: データをコンソールに表示
    console.log("ユーザーネーム:", username);
    console.log("メールアドレス:", email);
    console.log("年齢:", age);
    console.log("身長:", height);
    console.log("目標体重:", targetWeight);
});


export default {
  name: 'Template',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
  },
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
</style>
