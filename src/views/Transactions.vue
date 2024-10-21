<!-- src/views/Transactions.vue -->
<template>
  <div class="transactions">
    <h1>Transactions</h1>


    <transaction-list @edit-transaction="editTransaction" />
  </div>
</template>

<script>
import TransactionList from '@/components/TransactionList.vue'

export default {
  name: 'TransactionListView', // Updated name for multi-word compliance
  components: {
    TransactionList
  },
  methods: {
    editTransaction(transaction) {
      this.$router.push({ name: 'AddTransaction', params: { editTransaction: transaction } })
    }
  }
}
</script>

<style scoped>
.transactions {
  max-width: 1200px;
  min-height: 80vh;
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
  margin-bottom: 1.5rem; /* Space below heading */
  text-align: center; /* Center the heading */
}

.header {
  display: flex;
  justify-content: center; /* Center header items */
  margin-bottom: 1.5rem; /* Space below header */
}

.header-item {
  flex: 1; /* Each item takes equal space */
  text-align: center; /* Center text */
  font-weight: bold; /* Bold header text */
  color: #333; /* Dark text color */
}

.table {
  width: 100%; /* Full width for the table */
  border-collapse: collapse; /* Collapse borders */
  margin-bottom: 1.5rem; /* Space below the table */
}

.table th, .table td {
  padding: 1rem; /* Padding for table cells */
  text-align: center; /* Center text in cells */
  border: 1px solid #ced4da; /* Border around cells */
}

.table th {
  background-color: #ffffff; /* White background for header */
}

.table tr:nth-child(even) {
  background-color: #f8f9fa; /* Light background for even rows */
}

.table tr:hover {
  background-color: #e9ecef; /* Highlight row on hover */
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition */
}

.btn-primary {
  background-color: #75aca8; /* Primary button color */
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: rgba(117, 172, 168, 0.55); /* Darker shade on hover */
}
</style>
