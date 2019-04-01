import axios from 'axios'
import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

export const state = () => ({
  authUser: null,
  loggedInFlag:true,
  loadedPosts:'',
  token:''
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
  },
  setToken(state, token){
    state.userToken = token
  },
  clearToken(state, token){
    localStorage.setItem('token', null);
    state.userToken = ''
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
    console.log('ssssssss' + req.session.authUser);
    console.log(req.session.authUser);
   if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser);
     /* axios.get("/api/landing")
          .then(res => {
            const postsArray = [];

            for (const key in res.data) {
               postsArray.push({ ...res.data[key], id: key });
             }
            vuexContext.commit("setPosts", postsArray);
          })
          .catch(e => console.log(e)); */
      }
    },
  async login({ commit }, { username, password }) {
    await axios.post('/api/login',{username, password})
      .then((response) =>{
        console.log(response.data);
        commit('SET_USER',response.data);
        commit('setPosts', response.data.posts);
        //localStorage.setItem('token', response.data.userId);
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
      console.log(payload);
      await axios.post('/api/signup', payload).then((response)=>{
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
        return axios
        .post("/api/newpost", post)
        .then(result => {
          vuexContext.commit('addPost', { post }) //, id: result.data.name
        })
        .catch(e => console.log(e));
      },
  setPosts(vuexContext, posts) {
    vuexContext.commit("setPosts", posts);
    },
  async logout({ commit }, payload) {
   // console.log(payload)
    await axios.post('/api/logout', payload);
    commit('SET_USER', null);
    commit('clearToken');

  },
  initAuth(context){
    const token = localStorage.getItem('token');
    if(!token){
      return  ;
    }
    context.commit('setToken', token);
  }

}

