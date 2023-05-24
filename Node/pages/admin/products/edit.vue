<template>
  <main>
    <div v-show="isShow" id="my-dialog" class="dialog overlay">
      <div class="dialog-body">
        <a
          class="dialog-close-btn btn btn-primary"
          href="#"
          @click="isShow = !isShow"
          >&times;</a
        >
        <div class="main">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              id="form-1"
              action=""
              method="POST"
              class="form"
              @submit.prevent="handleSubmit(onSubmit)"
            >
              <div class="form-group">
                <label for="fullname" class="form-label">Tên sản phẩm</label>

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|max:255"
                  name="Tên sản phẩm"
                >
                  <input
                    id="fullname"
                    v-model="product.productName"
                    name="fullname"
                    type="text"
                    placeholder="VD: Giày Bitis"
                    class="form-control"
                  />
                  <p class="muted text-danger">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>

              <div class="form-group">
                <label for="email" class="form-label">Danh mục</label>

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="Danh mục"
                >
                  <select v-model="product.categoryId" class="form-control">
                    <option
                      v-for="(category, index) in categories"
                      :key="index"
                      :value="category.categoryId"
                    >
                      {{ category.categoryName }}
                    </option>
                  </select>
                  <p class="muted text-danger">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
              <!-- Start -->
              <div class="form-group">
                <label for="price" class="form-label">Giá tiền</label>

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|max:25|integer|min_value:1"
                  name="Giá tiền"
                >
                  <input
                    id="price"
                    v-model="product.price"
                    name="price"
                    type="text"
                    placeholder="Giá tiền"
                    class="form-control"
                  />

                  <p class="muted text-danger">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
              <!-- End -->
              <!-- Start -->
              <div class="form-group">
                <label for="price" class="form-label">Hình ảnh</label>

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="Hình ảnh"
                >
                  <input
                    id="avatar"
                    v-model="product.avatar"
                    name="avatar"
                    type="text"
                    placeholder="Hình ảnh"
                    class="form-control"
                  />

                  <p class="muted text-danger">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
              <!-- End -->
              <div class="form-group">
                <label for="stock" class="form-label">Tồn kho</label>

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|integer|min_value:1"
                  name="Tồn kho"
                >
                  <input
                    id="inStocks"
                    v-model="product.inStocks"
                    name="inStocks"
                    placeholder="Nhập số lượng tồn kho"
                    type="number"
                    class="form-control"
                  />
                  <p class="muted text-danger">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>

              <div class="form-group h">
                <label for="stock" class="form-label">Mô tả</label>

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="Mô tả"
                >
                  <textarea
                    v-model="product.description"
                    type="text"
                    class="form-control"
                  ></textarea>
                  <p class="muted text-danger">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
              <button type="submit" class="btn btn-primary">Lưu</button>
              <button type="reset" class="btn btn-outline-primary">
                Nhập lại
              </button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <!-- 

     -->
    <div class="container">
      <div class="mb-3 text-center">
        <nuxt-link
          v-for="(category, index) in categories"
          :key="index"
          class="btn btn-outline-primary mx-2"
          to="/admin/products/edit"
          @click.native="getProductsBySort(index + 1)"
        >
          {{ category.categoryName }}
        </nuxt-link>
      </div>
      <div></div>
    </div>
    <b-button
      @click="scrollToElement(2)"
      size="lg"
      pill
      variant="info"
      class="icon"
      style="margin-left: 93%"
      ><b-icon-arrow-down></b-icon-arrow-down
    ></b-button>
    <b-button
      @click="scrollToElement(1)"
      size="lg"
      pill
      variant="info"
      class="icon"
      style="margin-left: 97%"
      ><b-icon-arrow-up></b-icon-arrow-up
    ></b-button>
    <div ref="scrollToMeTop"></div>
    <!-- Start: Product -->
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
              @edit="editProductById(product.productId)"
              @dele="deleteProductById(product.productId)"
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
              @edit="editProductById(product.productId)"
              @dele="deleteProductById(product.productId)"
              @send-id="setIdProduct"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- End: Product -->
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
    >
    </paginate>

    <!-- Page -->
  </main>
</template>
<script>
import ProductSummary from '@/components/index/ProductSummary.vue'

import catalogApi from '@/api/catalogApi'

export default {
  components: { ProductSummary },
  layout: 'default_admin',
  middleware: ['isAuthorize'],

  data() {
    return {
      dataSubmit: {
        productName: '',
        categoryId: null,
        price: 0,
        avatar: '',
        description: '',
        inStocks: 10,
      },
      isShow: true,
      listProducts: [],
      listProductsPage: [],
      categories: [],
      hide: true,
      isEdit: true,
      product: {
        productId: 0,
        productName: '',
        categoryId: null,
        price: 0,
        avatar: '',
        description: '',
        inStocks: 10,
      },
    }
  },
  async created() {
    await this.getAllProducts()
    await this.getCategories()
    await this.getProductsBySort()
    await this.editProductById()
  },
  mounted() {},
  methods: {
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
      // console.log(data)
      const countPage =
        (this.listProducts.length / 3) % 2 === 0
          ? this.listProducts.length / 3
          : this.listProducts.length / 3 - 1

      if (pageNum === 1) {
        data = this.listProducts.slice(0, 3)
        this.listProductsPage = data
        this.$router.push('edit')
        return
      }
      if (pageNum === this.listProducts.length / 3) {
        data = this.listProducts.slice(countPage * 3)
        this.listProductsPage = data
        this.$router.push('edit')
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
          this.$router.push('edit')
          return
        }
      }
    },
    async getAllProducts() {
      try {
        const { data } = await catalogApi.getProducts(this.$axios)
        // console.log(data)

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
    async editProductById(index) {
      try {
        this.isShow = !this.isShow
        const { data } = await catalogApi.getProductsById(this.$axios, index)

        console.log(data)

        this.product = data
      } catch (err) {
        console.log(err)
      }
    },
    async onSubmit() {
      try {
        this.isShow = !this.isShow

        await catalogApi.editProduct(
          this.$axios,
          this.product.productId,
          this.product
        )

        this.$swal.fire({
          position: 'top-mid',
          icon: 'success',
          title: 'Đã chỉnh sửa thành công sản phẩm',
          showConfirmButton: false,
          timer: 1500,
        })

        this.getAllProducts()
        //  this.$router.push('/')
        //  this.$router.push('edit')
      } catch (err) {
        console.log(err)
      }
    },
    async deleteProductById(productId) {
      try {
        const a = confirm('Bạn có muốn xóa')
        if (a === true) {
          await catalogApi.deleteProduct(this.$axios, productId)
           this.$swal.fire({
            position: 'top-mid',
            icon: 'success',
            title: 'Đã xóa thành công sản phẩm',
            showConfirmButton: false,
            timer: 1500,
          })
          this.getAllProducts()
        }

        // alert('sai')
        // this.$router.go(0)
        // this.getAllProducts() ;

        // this.$router.go(0)
        //  this.$router.push('edit')
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style>
img.image:hover {
  animation: Inout 2s infinite;
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

  margin-top: 40%;
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
  height: 12px;
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
