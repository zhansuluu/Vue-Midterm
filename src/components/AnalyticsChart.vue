<template>
  <div class="analytics-chart">
    <h2>Financial Analytics</h2>
    <div v-if="hasData">
      <canvas ref="incomeExpenseChart"></canvas>
    </div>
    <div v-else>
      <p>Not enough data to display charts. Please add more transactions.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Import required components

// Register the components
Chart.register(BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
  name: 'AnalyticsChart',
  computed: {
    ...mapGetters('transactions', ['getFilteredTransactions']),
    hasData() {
      return this.getFilteredTransactions({}).length > 0
    }
  },
  mounted() {
    if (this.hasData) {
      this.createChart()
    }
  },
  methods: {
    createChart() {
      const ctx = this.$refs.incomeExpenseChart.getContext('2d')
      const transactions = this.getFilteredTransactions({})
      const incomeData = this.aggregateTransactions(transactions, 'income')
      const expenseData = this.aggregateTransactions(transactions, 'expense')

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(incomeData),
          datasets: [
            {
              label: 'Income',
              data: Object.values(incomeData),
              backgroundColor: 'rgba(75, 192, 192, 0.6)'
            },
            {
              label: 'Expenses',
              data: Object.values(expenseData),
              backgroundColor: 'rgba(255, 99, 132, 0.6)'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
            title: {
              display: true,
              text: 'Income vs Expenses'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    },
    aggregateTransactions(transactions, type) {
      return transactions
          .filter(t => t.type === type)
          .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount
            return acc
          }, {})
    }
  }
}
</script>

<style scoped>
/* Основной стиль контейнера диаграммы */
.analytics-chart {
  background-color: #f3f7fa; /* Light background */
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* Enhanced shadow for depth */
  transition: all 0.3s ease; /* Smooth transition */
  margin: 2rem 0;
  text-align: center;
}

/* Стиль заголовка */
.analytics-chart h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #34495e; /* Darker shade for title */
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
  transition: color 0.3s ease; /* Smooth color transition */
}

.analytics-chart h2:hover {
  color: #3498db; /* Change color on hover */
}

/* Добавляем декоративную линию под заголовком */
.analytics-chart h2::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 50px;
  height: 4px;
  background-color: #3498db; /* Line color */
  transform: translateX(-50%);
  border-radius: 2px;
}

/* Стиль сообщения, когда нет данных */
.analytics-chart p {
  color: #e74c3c; /* Red text */
  font-size: 1.2rem;
  background-color: rgba(231, 76, 60, 0.1); /* Light red background */
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(231, 76, 60, 0.2);
  margin-top: 1rem;
  display: inline-block;
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease; /* Added transform */
}

/* Эффект при наведении на блок без данных */
.analytics-chart p:hover {
  background-color: rgba(231, 76, 60, 0.15);
  border-color: rgba(231, 76, 60, 0.4);
  transform: scale(1.05); /* Slight scale effect on hover */
}

/* Анимация появления диаграммы */
.analytics-chart canvas {
  opacity: 0;
  animation: fadeInUp 1s ease forwards;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Мобильные стили для адаптивности */
@media (max-width: 768px) {
  .analytics-chart {
    padding: 1.5rem;
  }

  .analytics-chart h2 {
    font-size: 1.75rem; /* Responsive font size */
  }
}

</style>
