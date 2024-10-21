<template>
  <div class="profile">
    <h1>User Profile</h1>
    <form @submit.prevent="updateProfile" class="profile-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="profile.name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="profile.email" type="email" required>
      </div>
      <div class="form-group">
        <label for="currency">Preferred Currency</label>
        <select id="currency" v-model="profile.currency">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Update Profile</button>
    </form>
  </div>
</template>

<script>
export default {
// eslint-disable-next-line
  name: 'Profile',
  data() {
    return {
      profile: {
        name: '',
        email: '',
        currency: 'USD'
      }
    }
  },
  mounted() {
    // Load profile from localStorage if it exists
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.profile = JSON.parse(savedProfile);
    }
  },
  methods: {
    updateProfile() {
      localStorage.setItem('userProfile', JSON.stringify(this.profile));
      console.log('Profile updated:', this.profile);
      alert('Profile updated successfully!');
    }
  }
}
</script>

<style scoped>
.profile {
  min-height: 80vh;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5; /* Light background for consistency */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.profile-form {
  background-color: #ffffff; /* White form background */
  border-radius: 10px; /* Rounded corners */
  padding: 1.5rem; /* Increased padding for better spacing */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Slight shadow */
}

.form-group {
  margin-bottom: 1.5rem; /* Increased bottom margin for better spacing */
  margin-right: 25px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold; /* Bold labels for clarity */
  color: #333; /* Darker text color */
}

input,
select {
  width: 100%;
  padding: 0.75rem; /* Increased padding for comfort */
  border: 1px solid #ced4da;
  border-radius: 5px; /* Consistent border radius */
  font-size: 1rem; /* Consistent font size */
}

.btn {
  padding: 0.75rem 1.5rem; /* Increased padding for buttons */
  border-radius: 5px; /* Consistent border radius */
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
  background-color: rgba(117, 172, 168, 0.53); /* Darker shade on hover */
}
</style>
