<template>
  <form @submit.prevent="submitTransaction" class="transaction-form">
    <div class="form-group">
      <label for="type">Type</label>
      <select id="type" v-model="transaction.type" required>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
    <div class="form-group">
      <label for="category">Category</label>
      <input id="category" v-model="transaction.category" required v-validate="'required'">
    </div>
    <div class="form-group">
      <label for="amount">Amount</label>
      <input id="amount" type="number" v-model.number="transaction.amount" required v-validate="'required|numeric'">
    </div>
    <div class="form-group">
      <label for="date">Date</label>
      <input id="date" type="date" v-model="transaction.date" required v-validate="'required|date_format:yyyy-MM-dd'">
    </div>
    <div class="form-group">
      <label for="notes">Notes</label>
      <textarea id="notes" v-model="transaction.notes"></textarea>
    </div>
    <button type="submit" :disabled="!isFormValid">{{ isEditing ? 'Update' : 'Add' }} Transaction</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from '@/mixins/validationMixin'

export default {
  name: 'TransactionForm',
  mixins: [validationMixin],
  props: {
    editTransaction: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      transaction: this.initializeTransaction()
    }
  },
  computed: {
    isEditing() {
      return !!this.editTransaction
    },
    isFormValid() {
      return Object.keys(this.fields).every(key => !this.fields[key].invalid)
    }
  },
  methods: {
    ...mapActions('transactions', ['addTransaction', 'updateTransaction']),
    initializeTransaction() {
      return this.editTransaction || {
        type: 'expense',
        category: '',
        amount: null,
        date: new Date().toISOString().substr(0, 10),
        notes: ''
      }
    },
    submitTransaction() {
      if (this.isFormValid) {
        if (this.isEditing) {
          this.updateTransaction({ id: this.editTransaction.id, transaction: this.transaction })
        } else {
          this.addTransaction({ ...this.transaction, id: Date.now() })
        }
        this.$emit('transaction-submitted')
        this.transaction = this.initializeTransaction()
      }
    }
  },
  watch: {
    editTransaction(newVal) {
      if (newVal) {
        this.transaction = { ...newVal }
      } else {
        this.transaction = this.initializeTransaction()
      }
    }
  }
}
</script>

<style scoped>
.transaction-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.transaction-form:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.form-group {
  margin-bottom: 20px;
  margin-right: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background-color: #f7f7f7;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  margin-right: 15px;

}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3498db;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.2);
  outline: none;
  margin-right: 15px;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

button[type="submit"] {
  display: block;
  width: 100%;
  padding: 14px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background-color: #75aca8;;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #75aca8;
  transform: translateY(-2px);
}

button[disabled] {
  background-color: #cccccc;
  cursor: not-allowed;
}

button[disabled]:hover {
  transform: none;
}

button[type="submit"]:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .transaction-form {
    padding: 20px;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    font-size: 14px;
    margin-right: 15px;
  }

  button[type="submit"] {
    font-size: 16px;
  }
}

</style>