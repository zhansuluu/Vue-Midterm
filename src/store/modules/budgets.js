const state = {
  budgets: JSON.parse(localStorage.getItem('budgets')) || {} // Инициализируем из localStorage
};

const mutations = {
  SET_BUDGET(state, { category, amount }) {
    state.budgets[category] = amount;
  },
  SET_BUDGETS(state, budgets) {
    state.budgets = budgets;
  }
};

const actions = {
  setBudget({ commit }, { category, amount }) {
    commit('SET_BUDGET', { category, amount });
  }
};

const getters = {
  budgets: (state) => state.budgets,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
