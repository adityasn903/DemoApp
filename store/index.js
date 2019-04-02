import axios from 'axios'
import Vue from "vue";

export const state = () => ({
  authUser: null,
  loadedPosts:'',
  
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user;
  },
  setPosts(state, posts) {
    state.loadedPosts = posts;

  },
  addPost(state, post) {
    state.loadedPosts.push(post)
  }
}
export const getters = {
  loadedPosts: function (state) {
    return state.loadedPosts;
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    console.log(req.session.authUser);
   if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser);
      }
    },
  async login({ commit }, { username, password }) {
    await axios.post('/api/login',{username, password})
      .then((response) =>{
        localStorage.setItem('authToken', response.data.userId);
        commit('SET_USER',response.data);
        //commit('setPosts', response.data.posts);
        this.$router.push('/User');
    })
      .catch((error)=>{
      if (error.response && error.response.status === 401) {
         throw new Error('Please enter the required field')
       }
      throw error
    })

  },
  async signup({commit}, payload){
      await axios.post('/api/signup', payload).then((response)=>{
        console.log(response.data);
        commit('SET_USER',response.data)
      }).catch((error)=>{
        console.log(error);

      })
      },
  async getGoogleUser ({commit}){
        axios.get('/auth').then((response)=>{
            commit('SET_USER',response.data);
        }).catch((error)=>{
            console.log(error)
        })
    },
  addPost(vuexContext, post) {
        const authToken = localStorage.getItem('authToken');
        let config = {
              headers: {
              Token: authToken,
              }
        }
        axios
        .post("/api/newpost", post, config)
        .then(response => {
          console.log(response);
          vuexContext.commit('addPost', response.data) //, id: result.data.name
        })
        .catch(e => console.log(e));
      },
  setPosts(vuexContext, posts) {
    vuexContext.commit("setPosts", posts);
    },
  async logout({ commit }, payload) {
    await axios.post('/api/logout', payload);
    commit('SET_USER', null);
    commit('clearToken');

  },
//   initAuth(context){
//     const authToken = localStorage.getItem('authToken');
//     if(!token){
//       return  ;
//     }
//     context.commit('setToken', token);
//   }

}

