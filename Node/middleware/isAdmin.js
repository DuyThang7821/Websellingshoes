export default function ({store, redirect}, next){
  const isAdmin = store.getters["user/isAdmin"];
  if(!isAdmin){
    // chuyen ve trang login
    redirect('/login')
  }
  next()
}