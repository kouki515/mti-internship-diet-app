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
              <form class="ui form" id="weightForm">
                  <div class="field">
                      <label for="current_weight">現在の体重（kg）：</label>
                      <input type="number" id="current_weight" name="current_weight" required>
                  </div>
                  <button class="ui button primary" type="submit">送信</button>
              </form>
              <div class="ui segment">
                  <canvas id="weightChart"></canvas>
                  <div class="ui center aligned statistic">
                      <div class="value" id="percentageValue">0%</div>
                      <div class="label">目標達成率</div>
                  </div>
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

const weightForm = document.getElementById('weightForm');
const currentWeightInput = document.getElementById('current_weight');
const percentageValue = document.getElementById('percentageValue');
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

weightForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const currentWeight = parseFloat(currentWeightInput.value);
    const targetWeight = 70; // 目標体重（例として70kgとします）
    const percentage = Math.max(0, Math.min(100, (currentWeight / targetWeight) * 100)); // 達成率を計算
    percentageValue.innerText = percentage.toFixed(1) + '%';
    weightChart.data.datasets[0].data = [percentage, 100 - percentage];
    weightChart.update();
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
