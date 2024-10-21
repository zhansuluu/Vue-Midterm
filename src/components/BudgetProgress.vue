<template>
  <div class="budget-progress">
    <div class="flex justify-between mb-2">
      <span class="text-sm font-medium text-gray-700">{{ category }}: </span>
      <span class="text-sm font-medium text-gray-700">{{ formatCurrency(spent) }} / {{ formatCurrency(budget) }}</span>
    </div>
    <div>Spent Amount: {{ spent }} | Budget Amount: {{ budget }}</div> <!-- Debugging line -->
    <div class="relative pt-1">
      <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
        <div
            :style="{ width: `${percentage}%` }"
            :class="[
            'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center',
            percentage <= 50 ? 'bg-green-500' : percentage <= 75 ? 'bg-yellow-500' : 'bg-red-500'
          ]"
            :aria-valuenow="percentage"
            aria-valuemin="0"
            aria-valuemax="100"
            role="progressbar"
        ></div>
      </div>
    </div>
    <div class="text-right">
      <span
          class="text-sm font-semibold"
          :class="percentage > 100 ? 'text-red-600' : 'text-gray-700'"
      >
        {{ percentage.toFixed(0) }}%
      </span>
    </div>
    <div v-if="percentage > 100" class="mt-2 text-sm text-red-600 font-medium">
      Budget exceeded by {{ formatCurrency(spent - budget) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BudgetProgress',
  props: {
    category: {
      type: String,
      required: true
    },
    budget: {
      type: Number,
      required: true
    },
    spent: {
      type: Number,
      required: true
    }
  },
  computed: {
    percentage() {
      return this.budget > 0 ? (this.spent / this.budget) * 100 : 0; // Avoid division by zero
    }
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    }
  }
}
</script>

<style scoped>
.budget-progress {
  background-color: #ffffff; /* White background for contrast */
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 15px;
  transition: transform 0.3s, box-shadow 0.3s; /* Add transition for hover effect */
}

.budget-progress:hover {
  transform: translateY(-2px); /* Lift effect on hover */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.text-sm {
  font-size: 0.875rem;
}

.font-medium {
  font-weight: 500;
}

.text-gray-700 {
  color: #4a4a4a; /* Darker gray for better visibility */
}

.relative {
  position: relative;
}

.pt-1 {
  padding-top: 0.25rem;
}

.overflow-hidden {
  overflow: hidden;
}

.h-2 {
  height: 0.5rem; /* Height of the progress bar */
}

.mb-4 {
  margin-bottom: 1rem;
}

.flex.rounded {
  border-radius: 4px; /* Rounded corners for the progress bar */
}

.bg-gray-200 {
  background-color: #e5e5e5; /* Light gray for the background of the progress bar */
}

.text-white {
  color: white; /* White text for progress indicator */
}

.text-right {
  text-align: right; /* Align the percentage text to the right */
}

.text-red-600 {
  color: #c53030; /* Bright red color for exceeding budget */
}

.text-gray-700 {
  color: #4a4a4a; /* Darker gray for normal text */
}

.mt-2 {
  margin-top: 0.5rem; /* Margin top for budget exceeded message */
}

.font-semibold {
  font-weight: 600; /* Bold for emphasis */
}

.shadow-none {
  box-shadow: none; /* Remove shadow for the inner bar */
}

/* Progress bar color based on percentage */
.bg-green-500 {
  background-color: #38a169; /* Green for under budget */
}

.bg-yellow-500 {
  background-color: #ecc94b; /* Yellow for nearing budget */
}

.bg-red-500 {
  background-color: #e53e3e; /* Red for over budget */
}

</style>
