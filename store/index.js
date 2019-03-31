import axios from 'axios'
import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    console.log(req.session.authUser)
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },

  async login({ commit }, { username, password }) {
    await axios.post('/api/login',{username, password})
      .then((response) =>{
        commit('SET_USER',response.data)
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
  async logout({ commit }, payload) {
   // console.log(payload)
    await axios.post('/api/logout', payload)
    commit('SET_USER', null)
  }

}

