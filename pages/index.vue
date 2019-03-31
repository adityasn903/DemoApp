<template>
  <div class="container">
   
    <form  @submit.prevent="login" method="POST">
      <p v-if="formError" class="error">
        {{ formError }}
      </p> 
      <h4>Welcome to the demo Site.<br> Please <b>LOGIN</b> to Continue </h4>
      <p>PhoneNumber: <input v-model="formUsername" type="text" name="username"></p>
      <p>Password: <input v-model="formPassword" type="password" name="password"></p>
      <button type="submit" class="btn btn-primary">
        Login
      </button>
    </form>
    <br>
    <div>Not<nuxt-link to="/signup1" class="btn btn-link">Registered ?</nuxt-link></div>
  </div>
</template>

<script>


export default {
  
  data() {
    return {
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  created(){
      try {

        this.$store.dispatch("getGoogleUser");

        if (this.$store.state.authUser) {
          this.$router.push("/User");
        }
      } catch (e) {
        console.log('Error signing in');
      }
      
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        });
        this.$router.push('/User');
        this.formUsername = '';
        this.formPassword = '';
        this.formError = null;
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style>
.container {
  padding: 100px;
}
.error {
  color: red;
}
</style>
