export default {
    login(axios, data){
      return axios.$post('/api/Accounts/login', data)
    }
    ,
    getAccounts(axios){
      return axios.get('/api/Catalog/accounts')
    },
    getAccountById(axios, accountId){
      return axios.get(`/api/Accounts1/${accountId}`)
     
    },
    editAccount(axios, accountId,data){
      const url = `/api/Accounts1/${accountId}`
      return axios.$put(url,data)
   },
   deleteAccount(axios,accountId){

    return axios.$delete(`/api/Accounts1/${accountId}`)
   },
  }