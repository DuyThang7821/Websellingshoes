// state
import createMutationsSharer from "vuex-shared-mutations";
const state = () => ({
  token: '',
  role: '',
  index:'',
  cart:''
})
// mutations
const mutations = {
  SET_TOKEN (state, token){
    state.token = token
  },
  REMOVE_TOKEN(state){
    state.token = ''
  },
  SET_ROLE(state, roleName){
    state.role = roleName
  },
  SET_INDEX(state, index){
    state.index = index
  },
  SET_CART(state, cart){
    state.cart = cart
  },
  REMOVE_CART(state){
    state.cart = ''
  }
}
// getters
const getters = {
  getToken(state){ 
    return state.token;
  },
  getIndex(state){ 
    return state.index;
  },
  getCart(state){ 
    return state.cart;
  },
  isAuthen(state){
    return state.token !== ''
  },
  getRole(state){
    return state.role
  },
  isAdmin(state){
    return state.role === 'admin'
  },
  isSaler(state){
    return state.role === 'saler'
  },
}
// actions
const actions = {
  setToken({commit}, token){
    commit('SET_TOKEN', token)
  },
  logout({commit}){
    commit('REMOVE_TOKEN')
  },
  setRole({commit}, roleName){
    commit('SET_ROLE', roleName)
  },
  setIndex({commit}, index){
    commit('SET_INDEX', index)
  },
  setCart({commit}, cart){
    commit('SET_CART',cart)
  },
  deleteCart({commit}){
    commit('REMOVE_CART')
  },
}
plugins: [createMutationsSharer({ predicate: ["SET_CART"] })]

export default {
  namespace: true,
  state,
  actions,
  getters,
  mutations
 
}
