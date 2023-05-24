<template>
  <main>
    <!--Sreach  -->
    <!-- <div class="container">
      

      <div class="mb-3 text-center">
        <nuxt-link
          v-for="(category, index) in categories"
          :key="index"
          class="btn btn-outline-primary mx-2"
          to="/"
          @click.native="getProductsBySort(index + 1)"
        >
          {{ category.categoryName }}
        </nuxt-link>
      </div>
      
    </div> -->

    <div class="sidebar-container">
      <ul class="sidebar-navigation">
        <div class="sidebar-logo">Tuyển Shoes</div>

        <li v-for="(category, index) in categories" :key="index">
          <nuxt-link to="/" @click.native="getProductsBySort(index + 1)">{{
            category.categoryName
          }}</nuxt-link>
        </li>
      </ul>
      <!-- <ul class="sidebar-navigation">
        
        <b-card 
          header="Sản phẩm yêu thích"
          header-text-variant="white"
          header-tag="header"
          header-bg-variant="dark"
          footer-tag="footer"
          footer-bg-variant="success"
          footer-border-variant="dark"
          
          style="width: 180px;font-size:1rem"
        >
        <b-card-img
          src="https://picsum.photos/400/400/?image=20"
          alt="Image"
          style="height:200px;width: 50px;margin-left: -15%;
    margin-top: -15%;"
          
        ></b-card-img>
        </b-card>
        
      </ul> -->
    </div>

    <!-- Banner -->
    <div>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          caption="Store"
          text="Tuyển shoes."
          img-src="https://file.hstatic.net/1000230642/file/banner_d87d78755b4e48b6b2fc6e51b0ba4d38_master.jpg"
        ></b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide
          img-src="https://file.hstatic.net/1000230642/file/web-top-banner_68b9a0c957374772bdf25d1d0f312b11_master.jpg"
        >
          <h1>Tuyển shoes!</h1>
        </b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide
          img-src="https://file.hstatic.net/1000230642/file/banner_1_3b0df3c6987848abbc40576b475c91d4_master.jpg"
        ></b-carousel-slide>

        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="https://file.hstatic.net/1000230642/file/banner_2_a7c5b9d3550648afb2537c32e170e17a_master.jpg"
              alt="image slot"
            />
          </template>
        </b-carousel-slide>

        <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      </b-carousel>
      <p class="mt-4">
        <br />
      </p>
    </div>
    <b-button
      @click="scrollToElement(2)"
      pill
      variant="info"
      class="icon"
      style="margin-left: 93%"
      ><b-icon-arrow-down></b-icon-arrow-down
    ></b-button>
    <b-button
      @click="scrollToElement(1)"
      pill
      variant="info"
      class="icon"
      style="margin-left: 97%"
      ><b-icon-arrow-up></b-icon-arrow-up
    ></b-button>
    <!--Search   -->
    <div class="header__search" style="margin-left: 28%">
      <div class="header__search-input-wrap">
        <div style="font-size: 2rem">
          <b-icon icon="search" class="border rounded p-2"></b-icon>

          <input
            v-model="search"
            type="text"
            class="header__search-input"
            placeholder="Nhập để tìm kiếm sản phẩm"
          />
          <button class="btn btn-primary a" @click="search = ''">X</button>
        </div>
        <!--Search history-->

        <div
          v-if="search !== ''"
          class="header__search-history"
          style="margin-left: 40px"
        >
          <h3 class="header__search-history-heading">Lịch sử tìm kiếm</h3>

          <div v-for="(product, index) in filteredBlogs" :key="index">
            <div @click="setIdProduct(product.productId)">
              <h5>{{ product.productName | to - uppercase }}</h5>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <div ref="scrollToMeTop"></div>

    <div v-if="listProductsPage == ''" class="container">
      <section class="section-products">
        <div class="row">
          <div
            v-for="(product, index) in listProducts"
            :key="index"
            class="col-md-6 col-lg-4 col-xl-3"
          >
            <ProductSummary
              :product="product"
              :view="hide"
              :show="isEdit"
              @add-favorite="addFavorite"
              @add-to-cart="addCart"
              @out-of-stock="alert"
              @send-id="setIdProduct"
            />
          </div>
        </div>
      </section>
    </div>
    <div class="container">
      <section class="section-products">
        <div class="row">
          <div
            v-for="(product, index) in listProductsPage"
            :key="index"
            class="col-md-6 col-lg-4 col-xl-3"
          >
            <ProductSummary
              :product="product"
              :view="hide"
              :show="isEdit"
              @add-favorite="addFavorite"
              @add-to-cart="addCart"
              @out-of-stock="alert"
              @send-id="setIdProduct"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- Page -->
    <div ref="scrollToMeBottom"></div>
    <paginate
      :page-count="Math.round(listProducts.length / 3)"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :next-text="'Next'"
      :prev-text="'Prev'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :page-link-class="'page-item-text'"
      :prev-class="'page-item'"
      :next-class="'page-item'"
      :active-class="'active'"
      :first-last-button="'page-item'"
    >
    </paginate>

    <!-- Page -->
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { cloneDeep } from 'lodash-es'
import favoriteApi from '@/api/favoriteApi'
import ProductSummary from '@/components/index/ProductSummary.vue'

import catalogApi from '@/api/catalogApi'

export default {
  components: { ProductSummary },
  layout: 'default',
  data() {
    return {
      listProducts: [],
      listProductsPage: [],
      categories: [],
      search: '',
      hide: true,
      isEdit: false,
      cart: [],
      data: {
        productName: '',
        productId: 0,
        price: 0,
        avatar: '',
      },
    }
  },
  

  computed: {
    ...mapGetters({
      getCart: 'user/getCart',
      isAuthen: 'user/isAuthen',
    }),
    filteredBlogs() {
      return this.listProducts.filter((product) => {
        return product.productName
          .toLowerCase()
          .match(this.search.toLowerCase())
      })
    },
  },
  async created() {
    await this.getAllProducts()
    await this.getCategories()
    await this.getProductsBySort()
  },
  mounted() {},
  methods: {
    ...mapActions({
      setIndex: 'user/setIndex',
      setCart: 'user/setCart',
    }),
    scrollToElement(index) {
      if (index === 1) {
        const el = this.$refs.scrollToMeTop
        if (el) {
          // Use el.scrollIntoView() to instantly scroll to the element
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        const el = this.$refs.scrollToMeBottom
        if (el) {
          // Use el.scrollIntoView() to instantly scroll to the element
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    },
    async addFavorite(obj) {
      console.log(obj)

      this.data = {
        productName: obj.productName,
        productId: obj.productId,
        price: obj.price,
        avatar: obj.avatar,
      }

      await favoriteApi.addFavorites(this.$axios, this.data)

      this.$swal.fire({
        position: 'top-mid',
        icon: 'success',
        title: 'Đã thêm thành công sản phẩm',
        showConfirmButton: false,
        timer: 1500,
      })
      this.$router.push('/listFavorite')
    },
    setIdProduct(index) {
      this.setIndex(index)
      this.$swal.fire({
        position: 'top-mid',
        icon: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500,
      })
      this.$router.push('/detail')
    },

    clickCallback(pageNum) {
      // console.log(pageNum)
      let data = this.listProducts
      console.log(data)
      const countPage =
        (this.listProducts.length / 3) % 2 === 0
          ? this.listProducts.length / 3
          : this.listProducts.length / 3 - 1

      if (pageNum === 1) {
        data = this.listProducts.slice(0, 3)
        this.listProductsPage = data
        this.$router.push('/')
        return
      }
      if (pageNum === this.listProducts.length / 3) {
        data = this.listProducts.slice(countPage * 3)
        this.listProductsPage = data
        this.$router.push('/')
        return
      }
      let index1 = 0
      let index2 = 3
      for (let i = 2; ; i++) {
        index1 += 3
        index2 += 3
        data = this.listProducts.slice(index1, index2)
        if (i === pageNum) {
          this.listProductsPage = data
          this.$router.push('/')
          return
        }
      }
    },

    async addCart(obj) {
      // eslint-disable-next-line no-console

      // console.log(this.getCart)
      if (cloneDeep(this.getCart) !== '') {
        this.cart = cloneDeep(this.getCart)
      }

      // this.$bvToast.toast('Add successful: ' + obj.productName, {
      //   title: 'Information',
      //   variant: 'success',
      // })
      const addCart = {
        id: obj.productId,
        productName: obj.productName,
        quantily: 1,
        price: obj.price,
        avatar: obj.avatar,
      }

      let indexAdd

      const isTrue = this.cart.some(function (product, index) {
        indexAdd = index
        return product.productName === addCart.productName
      })
      if (isTrue) {
        this.cart[indexAdd].quantily++
      } else {
        this.cart.push(addCart)
      }
      await this.setCart(this.cart)
      this.$swal.fire({
        position: 'top-mid',
        icon: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500,
      })
      // console.log(this.getCart)
    },
    alert(productName) {
      this.$bvToast.toast('Out of Stocks: ' + productName, {
        title: 'Waring',
        variant: 'danger',
      })
    },
    async getAllProducts() {
      try {
        const { data } = await catalogApi.getProducts(this.$axios)
        //  console.log(data)

        this.listProducts = data
      } catch (err) {
        console.log(err)
      }
    },

    async getCategories() {
      try {
        const { data } = await catalogApi.getCategories(this.$axios)
        this.categories = data
      } catch (err) {
        console.log(err)
      }
    },
    async getProductsBySort(index) {
      try {
        const { data } = await catalogApi.getProductsByCategory(
          this.$axios,
          index
        )
        // console.log(data)
        this.listProductsPage = ''
        this.listProducts = data
      } catch (err) {
        console.log(err)
      }
    },
  },
  // watch: {
  //   cart(oldValue,newValue){
  //     console.log(oldValue)
  //     console.log(newValue)
  //   }
  // }
  // destroyed() {
  //   this.setCart(this.cart)
  // },
}
</script>

<style>
img.image:hover {
  animation: Inout 2s infinite;
}
.big-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  margin: 30px 0;
}
.big-image::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('https://i.pinimg.com/originals/8b/cc/dc/8bccdcfd37524ab7d25551bf8d4dbac9.png');
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  z-index: -2;
}
@keyframes Inout {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
.big-image::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.3;
  z-index: -2;
}
.big-image .big-image-content {
  text-align: center;
  max-width: 1000px;
}
.big-image .big-image-content h1 {
  font-size: 100px;
  color: rgb(255, 166, 0);
  font-family: 'Dancing Script', cursive;
  margin: 50px 0;
}
.big-image .big-image-content h2 {
  font-size: 50px;
  color: #fff;
  font-family: 'Roboto', sans-serif;
}
.big-image .big-image-content p {
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin: 15px 0;
  font-family: 'Roboto', sans-serif;
}

.header__search-input-wrap {
  flex: 1;
  height: 100%;
  position: relative;
}
.header__search-input {
  width: 50%;
  height: 100%;
  border: solid 3px;
  outline: none;
  font-size: 1.5rem;
  color: var(--text-color);
  padding: 5 10px;
  border-radius: 3px;
}

.a {
  margin-top: -2px;
}

/*Search history*/
.header__search-history {
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  width: 50%;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 5px #999;
  display: block;
  overflow: hidden;
  z-index: 1;
}
.header__search-history-heading {
  margin: 6px 12px;
  font-size: 1.4rem;
  color: #999;
  font-weight: 400;
}
.header__search-history-list {
  padding-left: 0;
  list-style: none;
  margin: 6px 0 0;
}
.header__search-history-item {
  height: 38px;
  padding: 0 12px;
}

.header__search-history-item:hover {
  background-color: #fafafa;
}
.header__search-history-item a {
  text-decoration: none;
  font-size: 1.4rem;
  line-height: 38px;
  color: var(--text-color);
  display: block;
}
/* Categories */
.sidebar-container {
  position: fixed;
  width: 220px;
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  color: #fff;
  font-size: 1.4rem;
}

.icon {
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
}

.content-container {
  padding-top: 20px;
}

.sidebar-logo {
  padding: 10px 15px 10px 30px;
  font-size: 20px;
  background-color: #2574a9;
  width: 180px;
}

.sidebar-navigation {
  padding: 0;
  margin: 0;
  list-style-type: none;
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
  width: 180px;
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

/* Page */
.pagination {
  position: relative;
  margin-bottom: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-item {
  height: 24px;
  weight: 12px;
  padding: 10px;
  border: solid 0.3px;
  color: #000 !important;
  font-size: 1.2rem;
  box-sizing: content-box;
}
.page-item-text {
  height: 12px;
  weight: 12px;
  padding: 10px;
  border: none;
  color: #000;

  box-sizing: content-box;
}

.active {
  background-color: #8867c0;
  border-color: #024dbc;
}
/* Page */
</style>
