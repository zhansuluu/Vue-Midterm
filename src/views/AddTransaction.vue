<!-- !-- src/views/AddTransaction.vue -->
<template>
  <div class="add-transaction">
    <transaction-form
        :edit-transaction="editTransaction"
        @transaction-submitted="onTransactionSubmitted"
    />
  </div>
</template>

<script>
import TransactionForm from '@/components/TransactionForm.vue'

export default {
  name: 'AddTransaction',
  components: {
    TransactionForm
  },
  data() {
    return {
      editTransaction: null
    }
  },
  computed: {
    isEditing() {
      return !!this.editTransaction
    }
  },
  created() {
    if (this.$route.params.editTransaction) {
      this.editTransaction = this.$route.params.editTransaction
    }
  },
  methods: {
    onTransactionSubmitted() {
      this.$router.push({ name: 'Transactions' })
    }
  }
}
</script>

<style scoped>
.add-transaction {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.add-transaction h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

@media (max-width: 768px) {
  .add-transaction {
    padding: 1.5rem;
  }

  .add-transaction h1 {
    font-size: 22px;
  }
}

</style> 