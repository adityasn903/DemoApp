import axios from 'axios'
import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

export const state = () => ({
  authUser: null,
  loggedInFlag:true,
  loadedPosts:''
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  setPosts(state, posts) {
    state.loadedPosts = posts;
  },
  addPost(state, post) {
    state.loadedPosts.push(post)
  },
  setToken(state, token){
    state.userToken = token
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    console.log(req.session.authUser)
   if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
      return axios
          .get("/api/landing")
          .then(res => {
            const postsArray = res.data;
            // for (const key in res.data) {
            //   postsArray.push({ ...res.data[key], id: key });
            // }
            vuexContext.commit("setPosts", postsArray);
          })
          .catch(e => console.log('error in client'));
      }
    },
  async login({ commit }, { username, password }) {
    await axios.post('/api/login',{username, password})
      .then((response) =>{
        commit('SET_USER',response.data);
        //localStorage.setItem('token', response.data.userId);
        //localStorage.setItem('tokenExpiration', new Date().getTime()+result.expiresIn * 1000);

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

  }
  /*,initAuth(vueContext){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('tokenExpiration');    
    if(new Date() > expiration || !token){
      return;
    }
    vuexContext.commit('setToken', token);
  }*/

}

