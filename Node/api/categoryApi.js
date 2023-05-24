export default {
  // method axios có  api xử lí lấy categories từ database
  getCategories(axios) {
    return axios.get('/api/Catalog/categories')
  },
   // method axios có  api xử lí lấy categories dựa vào id từ database
  addCategories(axios,data){
    const url = '/api/Categories'
    return axios.$post(url,data)
  },
  // method axios có  api xử lí lấy categories dựa vào id từ database
  getCategoriesById(axios, categoriesId) {
    return axios.get(`/api/Categories/${categoriesId}`)
  },
  // method axios có  api xử lí chỉnh sửa categories từ database
  editCategories(axios, categoriesId, data) {
    const url = `/api/Categories/${categoriesId}`
    return axios.$put(url, data)
  },
  // method axios có  api xử lí xóa categories từ database
  deleteCategories(axios, categoriesId) {
    return axios.$delete(`/api/Categories/${categoriesId}`)
  },
}
