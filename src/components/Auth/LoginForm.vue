<script>
export default {
  data() {
  return {
    userData: null,
    error: null,
    login: '',
    password: '',
  };
},
  methods: {
    async onLoginClick() {
    try {
      const response = await fetch('http://localhost/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: this.login,
          password: this.password
        })
      });
      if (!response.ok) throw new Error('Ошибка авторизации');
      this.userData  = await response.json();
    } catch (e) {
      this.error = e.message;
    }
  },
    async onDomainLoginClick() {
      try {
        await fetch('http://localhost/api/domain-login', { method: 'POST' });
      } catch (e) {}
    }
  },
  mounted() {
    this.getUserData();
  }
}
</script>

<style src="@/assets/styles/auth.css"></style>
<template>
<div class="container-wrapper">
  <div class="container">
    <div class="login-form">
      <div class="header">
      <label class="title">Авторизация</label>
      </div>
      <div class="input_container">
      <input 
      id="email_field"
      class="input_field"
      type="text" 
      name="input-name"
      title="Inpit title" 
      placeholder="Логин"
      v-model="login"
      >
    </div>
    <div class="input_container">
      <input 
      id="password_field"
      class="input_field" 
      type="password" 
      name="input-name" 
      title="Inpit title" 
      placeholder="Пароль"
      v-model="password"
      >
    </div>
    <button class="sign-in_btn" type="button" title="Sign In" @click="onLoginClick">
      <span>Войти</span>
    </button>
    <div class="login-form__domain">
      <button class="login-form__domain-btn" type="button" @click="onDomainLoginClick">Войти через домен</button>
    </div>

    </div>
    <div class="testimonial">
      <p>Сервис предназначен для автоматизации выдачи спецодежды</p>
      <img src="@/assets/images/logo.png" alt="Logo Picture">
    </div>
  </div>
</div>
</template>