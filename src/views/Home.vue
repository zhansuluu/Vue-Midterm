<template>
  <div class="home">
    <div class="dashboard">
      <div class="summary-card">
        <h2>Total Income</h2>
        <p>{{ formatCurrency(totalIncome) }}</p>
      </div>
      <div class="summary-card">
        <h2>Total Expenses</h2>
        <p>{{ formatCurrency(totalExpenses) }}</p>
      </div>
      <div class="summary-card">
        <h2>Net Balance</h2>
        <p :class="{ 'positive': netBalance >= 0, 'negative': netBalance < 0 }">
          {{ formatCurrency(netBalance) }}
        </p>
      </div>
    </div>
    <div class="recent-transactions">
      <h2>Recent Transactions</h2>
      <transaction-list :limit="5" @edit-transaction="editTransaction" />
    </div>
    <div class="quick-actions">
      <router-link to="/add-transaction" class="btn btn-primary">Add Transaction</router-link>
      <router-link to="/analytics" class="btn btn-secondary">View Analytics</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TransactionList from '@/components/TransactionList.vue'

export default {
  name: 'HomeView', // Updated name for multi-word compliance
  components: {
    TransactionList
  },
  computed: {
    ...mapGetters('transactions', ['getFilteredTransactions']),
    totalIncome() {
      return this.getFilteredTransactions({ type: 'income' })
          .reduce((total, transaction) => total + transaction.amount, 0)
    },
    totalExpenses() {
      return this.getFilteredTransactions({ type: 'expense' })
          .reduce((total, transaction) => total + transaction.amount, 0)
    },
    netBalance() {
      return this.totalIncome - this.totalExpenses
    }
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    },
    editTransaction(transaction) {
      this.$router.push({ name: 'AddTransaction', params: { editTransaction: transaction } })
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 80vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5; /* Light background */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
}

h1 {
  font-size: 2rem;
  color: #333; /* Darker text color */
  margin-bottom: 20px;
  text-align: center;
}

.dashboard {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  width: 100%; /* Make the dashboard take full width */
}

.summary-card {
  background-color: #ffffff; /* White card */
  border-radius: 10px;
  padding: 1.5rem;
  flex: 1;
  margin: 0 1rem;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Slight shadow */
}

.summary-card h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.summary-card p {
  font-size: 2rem;
  font-weight: bold;
  color: #333; /* Dark text */
}

.positive {
  color: #27ae60; /* Green for positive balance */
}

.negative {
  color: #e74c3c; /* Red for negative balance */
}

.recent-transactions {
  text-align: center; /* Center text */
  margin: 2rem 0; /* Space above and below */
}

.quick-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  color: white; /* White text */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.btn-primary {
  background-color: #75aca8; /* Primary button color */
}

.btn-secondary {
  background-color: #2ecc71; /* Secondary button color */
}

.btn-primary:hover,
.btn-secondary:hover {
  opacity: 0.9; /* Slight hover effect */
}
</style>
