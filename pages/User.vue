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
import axios from 'axios';
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
    axios.get("/api/landing")
          .then(res => {
            console.log(res);
            // const postsArray = [];

            // for (const key in res.data) {
            //    postsArray.push({ ...res.data[key], id: key });
            //  }
            // vuexContext.commit("setPosts", postsArray);
          })
          .catch(e => console.log(e));

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