<template>
  <div>
    <div class="ui main container">
        <head>
            <title>サインアップ（ウォッチャー）</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
        </head>
        <body>
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
        </body>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';

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
