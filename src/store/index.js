import { createStore } from 'vuex';
import transactions from './modules/transactions';
import budgets from './modules/budgets';

const store = createStore({
  modules: {
    transactions,
    budgets
  }
});

store.subscribe((mutation, state) => {
  localStorage.setItem('transactions', JSON.stringify(state.transactions.transactions));
  localStorage.setItem('budgets', JSON.stringify(state.budgets.budgets));
});

const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
if (savedTransactions) {
  store.commit('transactions/SET_TRANSACTIONS', savedTransactions);
}

const savedBudgets = JSON.parse(localStorage.getItem('budgets'));
if (savedBudgets) {
  store.commit('budgets/SET_BUDGETS', savedBudgets);
}

export default store;
