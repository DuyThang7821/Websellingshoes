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

    <div ref="scrollToMeTop"></div>
    <div v-if="listProductsPage == ''" class="container">
      <section class="section-products">
        <div class="row">
          <div
            v-for="(product, index) in listProducts"
            :key="index"
            class="col-md-6 col-lg-4 col-xl-3"
          >
            <Favorite
              :product="product"
              :view="hide"
              @delete-favorite="deleteFavorite"
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
            <Favorite
              :product="product"
              :view="hide"
              @delete-favorite="deleteFavorite"
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
import { mapActions } from 'vuex'
import Favorite from '@/components/index/Favorite.vue'

import favoriteApi from '@/api/favoriteApi'

export default {
  components: { Favorite },
  layout: 'default',
  data() {
    return {
      listProducts: [],
      listProductsPage: [],
      hide: true,
      search: '',
    }
  },

  computed: {
    filteredBlogs() {
      return this.listProducts.filter((product) => {
        return product.productName
          .toLowerCase()
          .match(this.search.toLowerCase())
      })
    },
  },
  async created() {
    await this.getFavoriteProduct()
    
  },
  mounted() {},
  methods: {
    ...mapActions({
      setIndex: 'user/setIndex',
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
      this.$router.push('/detail1')
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
        this.$router.push('/listFavorite')
        return
      }
      if (pageNum === this.listProducts.length / 3) {
        data = this.listProducts.slice(countPage * 3)
        this.listProductsPage = data
        this.$router.push('/listFavorite')

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
          this.$router.push('/listFavorite')

          return
        }
      }
    },
    
    async getFavoriteProduct() {
      try {
        const { data } = await favoriteApi.getFavorites(this.$axios)
        //  console.log(data)

        this.listProducts = data
      } catch (err) {
        console.log(err)
      }
    },
     async deleteFavorite(id) {
      try {
        
            const a = confirm('Bạn có muốn xóa')
        if (a === true) {
          await favoriteApi.deleteFavorites(this.$axios, id)
           this.$swal.fire({
            position: 'top-mid',
            icon: 'success',
            title: 'Đã xóa thành công sản phẩm',
            showConfirmButton: false,
            timer: 1500,
          })
          
            this.getFavoriteProduct()
        }
        


          
        //  this.$router.push('edit')
      } catch (err) {
        console.log(err)
      }
    }

  },
}
</script>
<style scoped>
.icon {
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 500px;
}
</style>
