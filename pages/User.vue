<template>
<div>
  <div class='card-header'>
    <h1> Welcome!!! <p><nuxt-link to="/newpost" class="btn btn-link">click here</nuxt-link> to create a post</p> </h1>
    <button @click="logout">Logout</button>
    <br>
  </div>
  <div class='card-body'>
    <div class="posts-page">
      <PostList :posts="loadedPosts" v-if="$store.state.loggedInFlag" />
    </div>
  </div>
</div>
</template>

<script>

import PostList from "@/components/Posts/PostList";

export default {
  
  middleware: 'auth',
  components: {
    PostList
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  },
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

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>