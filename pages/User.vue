<template>
  <div>
    <h1> Welcome!!! <p><nuxt-link to="/newpost" class="btn btn-link">click here</nuxt-link> to create a post</p> </h1>
    <button @click="logout">Logout</button>
    <br>
    
  </div>
</template>

<script>
export default {
  
  middleware: 'auth',
  created(){
    if(this.$store.state.authUser == null){
      this.$router.push('/')
    }

  },
  methods:{
      async logout() {
      try {
         //this.$router.push('/');
        await this.$store.dispatch('logout',{token:this.$store.state.authUser.userId});
        this.$router.push('/')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>
