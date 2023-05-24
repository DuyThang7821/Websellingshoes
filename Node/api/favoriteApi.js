export default {
  getFavorites(axios) {
    return axios.get('/api/Favorites')
  },
  getFavoritesById(axios, id) {
    return axios.get(`/api/Favorites/${id}`)
  },
  addFavorites(axios, data) {
    const url = '/api/Favorites'
    return axios.$post(url, data)
  },
  deleteFavorites(axios, favoriteId) {
    return axios.$delete(`/api/Favorites/${favoriteId}`)
  },
}
