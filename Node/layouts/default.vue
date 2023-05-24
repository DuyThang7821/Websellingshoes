<template>
  <div>
    <div style="font-size: 1.2rem">
      <b-navbar toggleable="xl" type="dark" variant="dark">
        <b-navbar-brand href="#">Tuyển Shoes</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse"  is-nav >
          <b-navbar-nav >
            <nuxt-link class="p-2 text-white" to="/"> Trang chủ </nuxt-link>
            <nuxt-link class="p-2 text-white" to="/indexProduct">
              Sản phẩm
            </nuxt-link>
            <nuxt-link class="p-2 text-white" to="/introduce">
              Giới thiệu
            </nuxt-link>
            <nuxt-link class="p-2 text-white" to="/call"> Liên hệ </nuxt-link>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em v-if="isAuthen">Xin chào : {{ name }} </em>

                <em v-if="!isAuthen">Tài khoản</em>
              </template>

              <!-- <b-dropdown-item href="/cart"> Giỏ hàng</b-dropdown-item>
              <b-dropdown-item v-if="!isAuthen" href="/DangKi">Đăng Kí</b-dropdown-item>
              <b-dropdown-item v-if="!isAuthen" href="/login">Đăng Nhập</b-dropdown-item>
              <b-dropdown-item v-if="isAuthen"  @click="signOut()" text="Success" variant="success" > Logout</b-dropdown-item> -->

              <ul class="sidebar-navigation">
                <li><nuxt-link :to="'/cart'">
                 Giỏ hàng</nuxt-link
              ></li>
              
               
                <li v-if="!isAuthen"><nuxt-link :to="'/DangKi'">
                 Đăng kí</nuxt-link
              ></li >
                <li v-if="!isAuthen"><nuxt-link :to="'/login'">
                Đăng Nhập</nuxt-link
              ></li>
                <li v-if="isAuthen"
                  
                   @click="signOut()"><nuxt-link   :to="'/cart'">
                Logout</nuxt-link
              ></li>
              </ul>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <Nuxt />

    <div class="container">
      <footer class="pt-4 my-md-5 pt-md-5 border-top">
        <div class="row">
          <div class="col-12 col-md">
            <img
              class="mb-2"
              src="/docs/4.6/assets/brand/bootstrap-solid.svg"
              alt=""
              width="24"
              height="24"
            />
            <small class="d-block mb-3 text-muted">&copy; </small>
          </div>
          <div class="col-6 col-md">
            <h3>Sản phẩm</h3>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted p-2" href="#">Biti's Nam</a></li>
              <li><a class="text-muted p-2" href="#">Biti's Nữ</a></li>
              <li><a class="text-muted p-2" href="#">Biti's Trẻ Con</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h3>Theo dõi</h3>
            <ul class="list-unstyled text-small">
              <li>
                <a
                  class="text-muted p-2"
                  href="https://www.youtube.com/channel/UCF21IbmQALSvNi4lqjqmf5g"
                  >Youtube</a
                >
              </li>
              <li>
                <a
                  class="text-muted p-2"
                  href="https://www.facebook.com/tuyen.trantrong.796"
                  >Facebook</a
                >
              </li>
              <li><a class="text-muted p-2" href="#">Linkedin</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h3>Giới thiệu</h3>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted p-2" href="#">Giới thiệu</a></li>
              <li><a class="text-muted p-2" href="#">Tuyển dụng</a></li>
              <li><a class="text-muted p-2" href="#">Điều khoản</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Header from '@/components/Shared/Header.vue'
import Footer from '@/components/Shared/Footer.vue'

export default {
  name: 'Default',
  component: {
    Header,
    Footer,
  },
  computed: {
    ...mapGetters({
      isAdmin: 'user/isAdmin',
      isSaler: 'user/isSaler',
      isAuthen: 'user/isAuthen',
      getRole: 'user/getRole',
    }),
    name() {
      return this.getRole
    },
  },
  methods: {
    ...mapActions({
      logout: 'user/logout',
    }),
    async signOut() {
      // gọi action của store
      await this.logout()

      // chuyển hướng
      this.$router.push('/')
     
    },
  },
}
</script>

<style scoped>
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
  padding: 0;
  margin: 0;
  list-style-type: none;
  position: relative;
  width: 120px;
     
}

.sidebar-navigation li {
  background-color: transparent;
  position: relative;
  display: inline-block;
  width: 100%;
  line-height: 20px;
  color: #fff;
  font-size: 0.9rem;
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
  border-radius: 3px;
}

.sidebar-navigation li:hover::before {
  width: 159px;

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

</style>
