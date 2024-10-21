const state = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || []
};

const mutations = {
  ADD_TRANSACTION(state, transaction) {
    state.transactions.push(transaction);
  },
  UPDATE_TRANSACTION(state, { index, transaction }) {
    state.transactions.splice(index, 1, transaction);
  },
  DELETE_TRANSACTION(state, index) {
    state.transactions.splice(index, 1);
  },
  SET_TRANSACTIONS(state, transactions) {
    state.transactions = transactions;
  }
};

const actions = {
  addTransaction({ commit }, transaction) {
    commit('ADD_TRANSACTION', transaction);
  },
  updateTransaction({ commit, state }, { id, transaction }) {
    const index = state.transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      commit('UPDATE_TRANSACTION', { index, transaction });
    }
  },
  deleteTransaction({ commit, state }, id) {
    const index = state.transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      commit('DELETE_TRANSACTION', index);
    }
  }
};

const getters = {
  getTransactions: (state) => state.transactions,
  getFilteredTransactions: (state) => (filter) => {
    return state.transactions.filter(transaction => {
      return (filter.type ? transaction.type === filter.type : true) &&
          (filter.category ? transaction.category === filter.category : true) &&
          (filter.startDate ? new Date(transaction.date) >= new Date(filter.startDate) : true) &&
          (filter.endDate ? new Date(transaction.date) <= new Date(filter.endDate) : true);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
