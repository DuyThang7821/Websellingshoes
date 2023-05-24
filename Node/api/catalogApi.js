export default {
  getCategories(axios){
    return axios.get('/api/Catalog/categories')
  },
  getProducts(axios){
    return axios.get('/api/Catalog/products')
  },
  getAccounts(axios){
    
    return axios.get('/api/Catalog/accounts')
  },
  getProductsByCategory(axios, categoryId){
    return axios.get(`/api/Catalog/products-by-category/${categoryId}`)
  },
  getProductsById(axios, productId){
    return axios.get(`/api/Products/${productId}`)
  },
  getCustomers(axios){
    return axios.get('/api/Catalog/customers')
  },
 
   
  addProduct(axios, data){
   const url = '/api/Catalog/add-product'
   return axios.$post(url,data)
},
  order(axios, data){
   const url = '/api/Orders'
   return axios.$post(url,data)
},
  editProduct(axios, productId,data){
   const url = `/api/Products/${productId}`
   return axios.$put(url,data)
},
  

   deleteProduct(axios,productId){

  return axios.$delete(`/api/Products/${productId}`)
 },
   addCustomer(axios,data){
    const url = '/api/Catalog/add-customer'
    return axios.$post(url,data)
  },
  addAccount(axios,data){
    const url = '/api/Catalog/add-account'
    return axios.$post(url,data)
  },
  getData: (axios) => axios.get('/api/Catalog/categories')
}