export default {
  getCustomers(axios) {
    return axios.get('​/api​/Customers')
  },
  getCustomerById(axios, customerId){
    return axios.get(`/api/Customers/${customerId}`)
  },
  addCustomer(axios,data){
    const url = '/api/Catalog/add-customer'
    return axios.$post(url,data)
  },
  editCustomer(axios, customerId, data) {
    const url = `/api/Customers/${customerId}`
    return axios.$put(url, data)
  },
  deleteCustomer(axios,customerId) {
    return axios.$delete(`/api/Customers/${customerId}`)
  },
}
