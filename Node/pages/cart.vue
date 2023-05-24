<template>
  <section class="h-100" style="background-color: #eee">
    <div class="container h-100 py-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-10">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-normal mb-0 text-black">Giỏ hàng</h3>
            <div>
              <p class="mb-0">
                <!-- <input type="checkbox" checked /> -->
                <b-button variant="success" @click="deleteCart">Xóa</b-button>
                <b-button variant="success" @click="saveCart">Lưu</b-button>
              </p>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <b-card-group v-for="(product, index) in cart" :key="index">
                <div class="card rounded-3 mb-4">
                  <div class="card-body p-4">
                    <div
                      class="
                        row
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                          :src="product.avatar"
                          class="img-fluid rounded-3"
                          alt="Cotton T-shirt"
                        />
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <p class="lead fw-normal mb-2">
                          {{ product.productName }}
                        </p>
                        <p>
                          <span class="text-muted">Size: </span>M
                          <span class="text-muted">Color: </span>Grey
                        </p>
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button
                          v-if="product.quantily > 0"
                          class="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                          @click="product.quantily--"
                        >
                          <h4>
                            <b-icon-patch-minus
                              variant="danger"
                            ></b-icon-patch-minus>
                          </h4>
                        </button>

                        <input
                          id="form1"
                          min="1"
                          name="quantity"
                          :value="product.quantily"
                          type="number"
                          class="form-control"
                        />

                        <button
                          class="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                          @click="product.quantily++"
                        >
                          <h4><b-icon-plus variant="danger"></b-icon-plus></h4>
                        </button>
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 class="mb-0">
                          {{
                            (product.price * product.quantily) | dauchamphantach
                          }}
                        </h5>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <input
                          type="checkbox"
                          :value="product.productName"
                          v-model="checkedNames"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </b-card-group>
              <div>
                <div class="card mb-5">
                  <div class="card-body" style="width: 916px">
                    <div class="float-end">
                      <p class="mb-0 me-5 d-flex align-items-center">
                        <span class="lead fw-normal">Order total </span>
                        <span class="lead fw-normal">
                          : {{ total | dauchamphantach }} VND</span
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <button
                @click="confirm"
                type="button"
                class="btn btn-warning btn-block btn-lg"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { cloneDeep } from 'lodash-es'
import catalogApi from '@/api/catalogApi'

export default {
  data() {
    return {
      cart: [],
      hide: false,
      checkedNames: [],
      data: {
        productName: '',
        soLuongDat: '',
      },
    }
  },
  filters: {
    dauchamphantach(sotien) {
      return sotien.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
  },
  computed: {
    ...mapGetters({
      getCart: 'user/getCart',
      isAuthen: 'user/isAuthen',
    }),
    total() {
      return this.cart.reduce(function callback(totalNumber, currentValue) {
        return totalNumber + currentValue.quantily * currentValue.price
      }, 0)
    },
  },
  async created() {
     
  },
  mounted() {
    if (cloneDeep(this.getCart) !== '') {
      this.cart = cloneDeep(this.getCart)
    }

    if (cloneDeep(this.getCart).length === 0) {
      this.$swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Giỏ hàng đang trống !',
        footer: '<a href="./indexProduct">Hãy mua hàng đi nào?</a>',
      })
    }
  },

  methods: {
    ...mapActions({
      setCart: 'user/setCart',
      delete: 'user/deleteCart',
    }),
    

     confirm() {
      if (cloneDeep(this.getCart).length === 0) {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Giỏ hàng đang trống !',
          footer: '<a href="./indexProduct">Hãy mua hàng đi nào?</a>',
          timer: 15000,
        })
      }
      if (this.isAuthen === true && cloneDeep(this.getCart).length !== 0) {
        this.$swal.fire({
          position: 'top-mid',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 500,
        })
         for (let i = 0; i < this.cart.length; i++) {
        this.data = {
          productName: this.cart[i].productName,
          soLuongDat: this.cart[i].quantily,
        }
        catalogApi.order(this.$axios, this.data)
      }


         this.$router.push('/bill')
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You are not logged in!',
          footer: '<a href="./login">Why do I have this issue?</a>',
        })
      }
    },

    async deleteCart() {
      const length = this.cart.length
      if (this.checkedNames.length === length) {
        await this.delete()

        // this.$router.push('/')

        if (cloneDeep(this.getCart).length !== 0) {
          this.cart = cloneDeep(this.getCart)
        } else {
          this.cart = []
        }
      } else {
        const array = this.checkedNames
        const newArray = this.cart.filter(function (product) {
          return array.includes(product.productName) === false
        })
        await this.setCart(newArray)
        this.$swal.fire({
          position: 'top-mid',
          icon: 'success',
          title: 'Đã xóa thành công sản phẩm',
          showConfirmButton: false,
          timer: 1500,
        })
        //  location.reload();
        //   this.$router.push('/')
        //  this.$router.go(0)
        if (cloneDeep(this.getCart).length !== 0) {
          this.cart = cloneDeep(this.getCart)
        }

        //  this.$forceUpdate()
      }
    },
    async saveCart() {
      await this.setCart(this.cart)
      // this.$router.go(0)
      this.cart = cloneDeep(this.getCart)
      // this.$forceUpdate()
    },
  },
}
</script>
<style scoped>
.form-control {
  width: 60px;
}
</style>
