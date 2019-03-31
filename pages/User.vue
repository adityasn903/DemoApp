<template>
  <div>
    <h1> Welcome </h1>
    <!--<h1>{{this.$store.state.authUser.fullName}}</h1> -->
   <!-- <h2>{{this.$store.state.authUser.phoneNumber[0]}}</h2>-->
    <h5>{{this.$store.state.authUser}}</h5>

    <button @click="logout">Logout  </button>
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
