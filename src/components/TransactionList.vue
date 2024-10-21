<template>
  <div class="transaction-list">
    <div class="filters">
      <select v-model="filter.type">
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input type="date" v-model="filter.startDate" placeholder="Start Date">
      <input type="date" v-model="filter.endDate" placeholder="End Date">
    </div>
    <table>
      <thead>
      <tr>
        <th @click="sortBy('date')">Date</th>
        <th @click="sortBy('type')">Type</th>
        <th @click="sortBy('category')">Category</th>
        <th @click="sortBy('amount')">Amount</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="transaction in sortedTransactions" :key="transaction.id">
        <td>{{ formatDate(transaction.date) }}</td>
        <td>{{ transaction.type }}</td>
        <td>{{ transaction.category }}</td>
        <td :class="{ 'income': transaction.type === 'income', 'expense': transaction.type === 'expense' }">
          {{ formatCurrency(transaction.amount) }}
        </td>
        <td>
          <button @click="editTransaction(transaction)">Edit</button>
          <button @click="deleteTransaction(transaction.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { dateMixin } from '@/mixins/dateMixin'

export default {
  name: 'TransactionList',
  mixins: [dateMixin],
  data() {
    return {
      filter: {
        type: '',
        startDate: '',
        endDate: ''
      },
      sortKey: 'date',
      sortOrder: 'desc'
    }
  },
  computed: {
    ...mapGetters('transactions', ['getFilteredTransactions']),
    sortedTransactions() {
      return this.getFilteredTransactions(this.filter).sort((a, b) => {
        let modifier = this.sortOrder === 'desc' ? -1 : 1
        if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier
        if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier
        return 0
      })
    }
  },
  methods: {
    ...mapActions('transactions', ['deleteTransaction']),
    editTransaction(transaction) {
      this.$emit('edit-transaction', transaction)
    },
    sortBy(key) {
      this.sortOrder = this.sortKey === key && this.sortOrder === 'asc' ? 'desc' : 'asc'
      this.sortKey = key
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    }
  }
}
</script>

<style scoped>
.transaction-list {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filters select,
.filters input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.filters select:focus,
.filters input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.2);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead th {
  background-color: #f5f5f5;
  font-weight: 600;
  padding: 15px;
  text-align: left;
  cursor: pointer;
  position: relative;
}

thead th::after {
  content: '';
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-top-color: #333;
  opacity: 0;
  transition: opacity 0.3s ease;
}

thead th.asc::after {
  border-bottom-color: transparent;
  border-top-color: #333;
  opacity: 1;
}

thead th.desc::after {
  border-top-color: transparent;
  border-bottom-color: #333;
  opacity: 1;
}

tbody td {
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
  text-align: left;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

.income {
  color: #27ae60;
}

.expense {
  color: #e74c3c;
}

button {
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  opacity: 0.9;
}

button:first-of-type {
  background-color: #75aca8;;
  margin-right: 10px;
}

button:last-of-type {
  background-color: #e74c3c;
}

@media (max-width: 768px) {
  .transaction-list {
    padding: 15px;
  }

  .filters {
    flex-direction: column;
  }

  .filters select,
  .filters input {
    width: 100%;
    margin-bottom: 10px;
    font-size: 14px;
  }

  table thead th,
  table tbody td {
    padding: 10px;
    font-size: 14px;
  }
}

</style>