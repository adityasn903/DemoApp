<template>
<div>
  <div class='card-header'>
    <h3> Welcome {{ myName }} !!! <p><nuxt-link to="/newpost" class="btn btn-link">click here</nuxt-link> to create a post</p> </h3>
    <button @click="logout">Logout</button>
    <br>
  </div>
  <div class='card-body'>
    <div class="posts-page">
      <PostList :posts="myPosts" />
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
  data(){
    return{
      myName: this.$store.state.authUser.fullName
    }
  },
  computed: {
    myPosts() {
      return this.$store.getters.loadedPosts
    }
  },
  created(){
    axios.get("/api/landing")
          .then(res => {
            var postsArray = [];
            for (const key in res.data.postsData){
              postsArray.push( res.data.postsData[key] );
            }
            this.$store.commit('setPosts', postsArray);

          })
          .catch(e => console.log(e));

  },
  methods:{
      async logout() {
      try {
        await this.$store.dispatch('logout', {token:this.$store.state.authUser.userId});
        localStorage.setItem('authToken', '');
        this.$router.push('/');

      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style scoped>
.posts-page {
  display: block;
  justify-content: center;
  align-items: center;
}
</style>