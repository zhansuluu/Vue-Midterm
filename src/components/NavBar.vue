<!-- src/components/NavBar.vue -->
<template>
  <nav class="navbar">
    <h2 class="navbar-brand">Personal Finance Tracker</h2>
    <div class="navbar-menu">
      <router-link to="/" class="navbar-item">Home</router-link>
      <router-link to="/transactions" class="navbar-item">Transactions</router-link>
      <router-link to="/add-transaction" class="navbar-item">Add Transaction</router-link>
      <router-link to="/analytics" class="navbar-item">Analytics</router-link>
      <router-link to="/profile" class="navbar-item">Profile</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
/* Основной стиль навигационной панели */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
  background: linear-gradient(135deg, #75aca8, #89d1cc);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: white;
  position: relative; /* Enable positioning for pseudo-elements */
}

/* Стиль логотипа/названия */
.navbar-brand {
  font-size: 1.75rem;
  font-weight: 700;
  text-decoration: none;
  color: white;
  padding: 1px;
}


/* Меню навигации */
.navbar-menu {
  display: flex;
  gap: 1.5rem;
}

/* Стили для элементов навигации */
.navbar-item {
  position: relative;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

/* Эффект наведения */
.navbar-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 300%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2); /* Slightly darker white */
  z-index: -1;
  transition: left 0.3s ease;
}

.navbar-item:hover {
  background-color: rgba(255, 255, 255, 0.25); /* Adjusted hover color */
  transform: translateY(-3px); /* Slight lift effect */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Subtle shadow on hover */
}

.navbar-item:hover::before {
  left: -50%;
}

/* Стиль активных ссылок */
.router-link-active {
  background-color: rgba(255, 255, 255, 0.4); /* Lighter active link background */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); /* Enhanced shadow for active links */
  transform: translateY(-4px); /* More pronounced lift for active links */
}

</style>
