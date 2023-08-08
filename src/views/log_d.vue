<template>
  <div>
    <div class="ui main container">
        <head>
            <title>ダイエット進捗履歴</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
        </head>
        <body>
            <div class="ui container">
                <h1 class="ui center aligned header">ダイエット進捗履歴</h1>
                <div class="ui segment">
                    <table class="ui celled table">
                        <thead>
                            <tr>
                                <th>日付</th>
                                <th>体重</th>
                                <th>達成率</th>
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
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
const progressTableBody = document.getElementById('progressTableBody');

// 仮のデータ（日付、体重、目標達成率）
const dummyData = [
    { date: '2023/08/01', weight: 75, percentage: 71.4 },
    { date: '2023/08/02', weight: 74.5, percentage: 70.7 },
    { date: '2023/08/03', weight: 74, percentage: 70 },
    // ... 他のデータを続けて追加 ...
];

    function renderProgressTable(data) {
        progressTableBody.innerHTML = '';
        for (const entry of data) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.date}</td>
                <td>${entry.weight} kg</td>
                <td>${entry.percentage.toFixed(1)}%</td>`;
            progressTableBody.appendChild(row);
        }
    }

// ダミーデータを表に表示
renderProgressTable(dummyData);

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
