<template>
  <div>
    <div>
      <div class="sidebar-container">
        <ul class="sidebar-navigation">
          <div class="sidebar-logo">Tuyển Shoes</div>
           
          <li v-if="isAdmin">
            <nuxt-link :to="'/admin/products/add'">Thêm sản phẩm</nuxt-link>
          </li>
          <li v-if="isSaler">
            <nuxt-link :to="'/admin/products/add'"> Tạo đơn hàng </nuxt-link>
          </li>
          <li >
            <nuxt-link :to="'/admin/products/edit'"
              >Chỉnh sửa sản phẩm</nuxt-link
            >
          </li>

          <li v-if="isAdmin">
            <nuxt-link :to="'/admin/customer/addCustomer'"
              >Thêm khách hàng</nuxt-link
            >
          </li>
          <li v-if="isAdmin">
            <nuxt-link :to="'/admin/customer/editCustomer'"
              >Chỉnh sửa khách hàng</nuxt-link
            >
          </li>
          <li v-if="isAdmin">  
            <nuxt-link :to="'/admin/account/editAccount'"
              >Chỉnh sửa tài khoản</nuxt-link
            >
          </li>
          <li>
            <nuxt-link :to="'/admin/category/addCategory'"
              >Thêm thể loại</nuxt-link
            >
          </li>
          <li>
            <nuxt-link :to="'/admin/category/editCategory'"
              >Chỉnh sửa thể loại</nuxt-link
            >
          </li>
          <li></li>
        </ul>
        <button class="btn btn-primary w-100 h-auto" @click="signOut()">
          Đăng xuất
        </button>
      </div>
    </div>
   

    <img src="/logo1.png" alt="Logo" style="width:50%;margin-left:25%" >

     

  </div>
</template>
<script>
import Header from '@/components/Shared/Header.vue'
import Footer from '@/components/Shared/Footer.vue'

export default {
  name: 'Default',
  component: {
    Header,
    Footer,
  },
}
</script>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isAdmin: 'user/isAdmin',
      isSaler: 'user/isSaler'
      
    }),
  },
  methods: {
    ...mapActions({
      logout: 'user/logout',
    }),
    async signOut() {
      // gọi action của store
      await this.logout()

      // chuyển hướng
     
      location.reload();
    },
  },
}
</script>

<style scoped>
.sidebar-container {
  position: fixed;
  width: 200px;
  height: 57%;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  color: #fff;
  font-size: 1.4rem;
}

.content-container {
  padding-top: 20px;
}

.sidebar-logo {
  padding: 10px 15px 10px 30px;
  font-size: 20px;
  background-color: #2574a9;
  width:200px;
}

.sidebar-navigation {
 
  position: relative;
  
}

.sidebar-navigation li {
  background-color: transparent;
  position: relative;
  display: inline-block;
  width: 100%;
  line-height: 20px;
  color: #fff;
  font-size: 1.3rem;
}

.sidebar-navigation li a {
  padding: 10px 15px 10px 30px;
  display: block;
  color: #000;
}

.sidebar-navigation li .fa {
  margin-right: 10px;
}

.sidebar-navigation li a:active,
.sidebar-navigation li a:hover,
.sidebar-navigation li a:focus {
  text-decoration: none;
  outline: none;
}

.sidebar-navigation li::before {
  background-color: #31db31;
  position: absolute;
  content: '';
  height: 100%;
  left: 0;
  top: 0;
  -webkit-transition: width 0.2s ease-in;
  transition: width 0.2s ease-in;
  width: 3px;
  z-index: -1;
}

.sidebar-navigation li:hover::before {
  width: 100%;
}

.sidebar-navigation .header {
  font-size: 12px;
  text-transform: uppercase;
  background-color: #6f86eb;
  padding: 10px 15px 10px 30px;
  
}

.sidebar-navigation .header::before {
  background-color: transparent;
}
.content-container {
  padding-left: 220px;
}
.nav {
  color: red;
}
</style>