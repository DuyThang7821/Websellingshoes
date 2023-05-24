<template>
  <main>
    <p class="mt-4">
      <br />
    </p>
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
          style="margin-left: 38px"
        >
          <h3 class="header__search-history-heading">Lịch sử tìm kiếm</h3>

          <div v-for="(product, index) in filteredBlogs" :key="index">
            <div @click="setIdProduct(product.productId)">
              <h5>{{ product.productName | to - uppercase }}</h5>
              <article><h5>Chi tiết sản phẩm</h5></article>
            </div>
          </div>
        </div>
      </div>
    </div>

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
          <nuxt-link
            to="/indexProduct"
            @click.native="getProductsBySort(index + 1)"
            >{{ category.categoryName }}</nuxt-link
          >
        </li>
        
        <div class="header__cart-item">
          <b-card
            header="Sản phẩm yêu thích"
            header-text-variant="white"
            header-tag="header"
            header-bg-variant="dark"
            footer-tag="footer"
            footer-bg-variant="success"
            footer-border-variant="dark"
            style="width: 200px; font-size: 1.3rem"
          >
            <b-card-img
              :src="favorite.avatar"
              alt="Image"
              style="height: 90px; width: 150px"
            ></b-card-img>
            <div class="header__cart-item-head">
              <a href="listFavorite" class="header__cart-item-name">
                {{favorite.productName}}
              </a>
              <div class="header__cart-item-body">
                <span class="header__cart-item-description">{{favorite.price/1000 }}.000đ</span>
              </div>
            </div>
          </b-card>
        </div>
       
      </ul>
     
     
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
              @add-to-cart="addCart"
              @out-of-stock="alert"
              @send-id="setIdProduct"
            />
          </div>
        </div>
      </section>
    </div>
    <div ref="scrollToMeBottom"></div>
    <!-- Page -->

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
      cart: [],
      favorite:''
    }
  },
 
  

  computed: {
    ...mapGetters({
      getCart: 'user/getCart',
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
    await this.getFavorite()
  },
  mounted() {},
  methods: {
    ...mapActions({
      setIndex: 'user/setIndex',
      setCart: 'user/setCart',
    }),
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
        this.$router.push('/indexProduct')
        return
      }
      if (pageNum === this.listProducts.length / 3) {
        data = this.listProducts.slice(countPage * 3)
        this.listProductsPage = data
        this.$router.push('/indexProduct')

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
          this.$router.push('/indexProduct')

          return
        }
      }
    },

    async addCart(obj) {
      // eslint-disable-next-line no-console

      // console.log(this.getCart)

      this.cart = cloneDeep(this.getCart)

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
    async getFavorite() {
      try {
        const { data } = await favoriteApi.getFavorites(this.$axios)
        //  console.log(data)

        this.favorite = data[0]
      } catch (err) {
        console.log(err)
      }
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
<style scoped>
.icon {
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 500px;
}
.header__cart-item-name {
  font-size: 15px;
  
  margin-left: -20px;
  
  color: #000;

  overflow: hidden;
  flex: 5;
  padding-right: 25px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  
  
 
  
}

.header__cart-item-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__cart-item-description {
  color: red;
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: -50px;
  margin-right: -35px;
}
.header__cart-item-body {
  display: flex;
  justify-content: space-between;
  transform: translateX(-50%) translateY(-200%);
}
.header__cart-item {
  display: flex;
  align-items: center;
}
.card-header {
  text-align: center;
}
</style>
