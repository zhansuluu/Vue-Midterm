<template>
  <div class="budget-manager">
    <form @submit.prevent="submitBudget">
      <div class="form-group">
        <label class="category-label" for="category">Category</label>
        <input id="category" v-model="budgetForm.category" required>
      </div>
      <div class="form-group">
        <label for="amount">Budget Amount</label>
        <input id="amount" type="number" v-model.number="budgetForm.amount" required>
      </div>
      <button type="submit">Set Budget</button>
    </form>
    <div class="budget-list">
      <h3>Current Budgets</h3>
      <ul>
        <li v-for="(amount, category) in budgets" :key="category">
          <budget-progress
              :category="category"
              :budget="amount"
              :spent="getSpentAmount(category)"
          />
          <p>Budget: {{ amount }}; Spent: {{ getSpentAmount(category) }}</p> <!-- Debugging line -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import BudgetProgress from './BudgetProgress.vue'

export default {
  name: 'BudgetManager',
  components: {
    BudgetProgress
  },
  data() {
    return {
      budgetForm: {
        category: '',
        amount: null
      }
    }
  },
  computed: {
    ...mapState('budgets', ['budgets']),
    ...mapGetters('transactions', ['getFilteredTransactions'])
  },
  methods: {
    ...mapActions('budgets', ['setBudget']),
    submitBudget() {
      this.setBudget(this.budgetForm)
      this.budgetForm = { category: '', amount: null }
    },
    getSpentAmount(category) {
      const spentAmount = this.getFilteredTransactions({ type: 'expense', category })
          .reduce((total, transaction) => total + transaction.amount, 0);

      return spentAmount || 0; // Return 0 if spentAmount is NaN
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    }
  }
}
</script>

<style scoped>
.category-label{
  border-radius: 10px;
}
.budget-manager {
  background-color: #f5f7fa; /* Light background for contrast */
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 600px;
  margin: 20px auto;
  font-family: 'Arial', sans-serif;
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
  margin-right: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="number"]:focus {
  border-color: #75aca8; /* Primary color for focus */
  outline: none;
}

button {
  background-color: #75aca8; /* Primary button color */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 100%;
}

button:hover {
  background-color: #75aca8; /* Darker shade on hover */
}

.budget-list {
  margin-top: 20px;
}

h3 {
  color: #333;
  font-size: 20px;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: white;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.budget-progress {
  flex-grow: 1; /* Allow the progress component to grow */
  margin-right: 15px;
}

p {
  color: #666;
  margin: 0;
  font-size: 14px;
}
#category{
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
