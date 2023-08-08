<template>
  <div>
    <div class="ui main container">
        <head>
            <title>応援メッセージ</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
        </head>
        <body>
            <div class="ui container">
                <h1 class="ui center aligned header">応援メッセージ</h1>
                <div class="ui segment">
                    <table class="ui celled table">
                        <thead>
                            <tr>
                                <th>数値</th>
                                <th>コメント</th>
                            </tr>
                        </thead>
                        <tbody id="recordTableBody">
                            <!-- ここにデータが追加されます -->
                        </tbody>
                    </table>
                </div>
                <div class="ui segment">
                    <form class="ui form" id="updateForm">
                        <div class="field">
                            <input type="number" id="recordValue" placeholder="数値" required>
                        </div>
                        <div class="field">
                            <input type="text" id="commentText" placeholder="コメント">
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
const recordTableBody = document.getElementById('recordTableBody');
const updateForm = document.getElementById('updateForm');
const recordValueInput = document.getElementById('recordValue');
const commentTextInput = document.getElementById('commentText');

function renderRecordTable(data) {
    recordTableBody.innerHTML = '';
    for (const entry of data) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.value}%</td>
            <td>${entry.commentText}</td>`;
        recordTableBody.appendChild(row);
    }
}

updateForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newValue = parseFloat(recordValueInput.value);
    const newCommentText = commentTextInput.value;
    const newEntry = {
        value: newValue,
        commentText: newCommentText
    };

    // 仮のデータに新エントリを追加
    dummyData.push(newEntry);
    // テーブルを再描画
    renderRecordTable(dummyData);
});

// 仮のデータ（数値、コメント）
const dummyData = [
    { value: 35, commentText: "3/5が記念日だよね！" },
    { value: 90, commentText: "ディズニー行こうね" }
];

// ダミーデータでテーブルを描画
renderRecordTable(dummyData);

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
