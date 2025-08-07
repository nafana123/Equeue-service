<template>
  <div class="glass-nav">
    <div class="nav-left">
      <h1 class="logo">Спец<span>одежда</span></h1>
      <p class="current-date">{{ currentDate }}</p>
    </div>
    <div class="nav-right">
      <div class="user-dropdown">
        <div class="user-badge" @click="toggleDropdown">
          <div class="user-avatar modern">
            {{ userInitials }}
          </div>
          <span class="user-name-short">{{ userInfo.fullName.split(' ')[1] }}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div v-if="dropdownOpen" class="dropdown-menu">
          <div class="dropdown-user-info">
            <p class="user-fullname">{{ userInfo.fullName }}</p>
            <p class="user-position">{{ userInfo.position }}</p>
            <p class="user-id">ID: {{ userInfo.personalId }}</p>
          </div>
          <button class="dropdown-item" @click="logout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Выйти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentDate: '',
      dropdownOpen: false
    };
  },
  computed: {
    userInitials() {
      if (!this.userInfo || !this.userInfo.fullName) return '';
      const parts = this.userInfo.fullName.split(' ');
      return parts.map(part => part.charAt(0)).join('').toUpperCase();
    }
  },
  methods: {
    updateCurrentDate() {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.currentDate = now.toLocaleDateString('ru-RU', options);
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    logout() {
      console.log('Выход...');
      // Логика выхода
    }
  },
  mounted() {
    this.updateCurrentDate();
  }
};
</script>