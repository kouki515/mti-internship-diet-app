<template>
  <div>
    <div class="ui main container">
        <head>
            <title>目標達成率</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
        </head>
        <body>
            <div class="ui container">
                <h1 class="ui center aligned header">目標達成率</h1>
                <div class="ui segment">
                    <h2 class="ui header">ダイエッター</h2>
                    <div class="ui field">
                        <label>氏名：</label>
                        <div id="usernameField">名前がここに表示されます</div>
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
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
        const usernameField = document.getElementById('usernameField');
        const percentageValue = document.getElementById('percentageValue');
        const progressTableBody = document.getElementById('progressTableBody');
        const weightChart = new Chart(document.getElementById('weightChart').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['達成率', '未達成率'],
                datasets: [{
                    data: [0, 100],
                    backgroundColor: ['#4CAF50', '#E0E0E0'],
                    borderWidth: 0
                }]
            }
        });

        function updateData(currentWeight, targetWeight) {
            const percentage = Math.max(0, Math.min(100, (currentWeight / targetWeight) * 100)); // 達成率を計算
            percentageValue.innerText = percentage.toFixed(1) + '%';
            weightChart.data.datasets[0].data = [percentage, 100 - percentage];
            weightChart.update();

            const currentDate = new Date().toLocaleDateString('ja-JP');
            const newRow = `
                <tr>
                    <td>${currentDate}</td>
                    <td>${percentage.toFixed(1)}%</td>
                </tr>`;
            progressTableBody.innerHTML = newRow + progressTableBody.innerHTML;
        }

        // 仮のデータ
        const targetWeight = 70;

        // ダミーデータで表示を更新
        updateData(75, targetWeight);

        // ユーザー名の表示を更新
        usernameField.textContent = "ユーザー名がここに表示されます";

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
