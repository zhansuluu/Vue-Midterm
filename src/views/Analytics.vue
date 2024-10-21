<!-- src/views/Analytics.vue -->
/* eslint-disable */
eslint-disable
<template>
  <div class="analytics">
    <div class="charts">
      <analytics-chart />
    </div>
    <div class="budget-overview">
      <budget-manager />
    </div>
  </div>
</template>

<script>
import AnalyticsChart from '@/components/AnalyticsChart.vue'
import BudgetManager from '@/components/BudgetManager.vue'

export default {
// eslint-disable-next-line
  name: 'Analytics',
  components: {
    AnalyticsChart,
    BudgetManager
  }
}
</script>

<style scoped>
.analytics {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.analytics h1 {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}

.charts {
  margin-bottom: 3rem;
}

.budget-overview {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.budget-overview h2 {
  font-size: 24px;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .analytics {
    padding: 1.5rem;
  }

  .analytics h1 {
    font-size: 28px;
  }

  .budget-overview h2 {
    font-size: 22px;
  }
}

</style>