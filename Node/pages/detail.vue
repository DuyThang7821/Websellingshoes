<template>
  <div class="container">
    <div>
      <ProductSummary :product="product"  :view ="hide" @start="getProductsBySort"
     @edit-Quantily="addCart" />
    </div>
    
    
 </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { cloneDeep } from 'lodash-es'

import ProductSummary from '@/components/index/ProductSummary.vue'
import catalogApi from '@/api/catalogApi'


export default {
  components: { ProductSummary},
  data() {
    return {
      product: '',
      hide: false,
      cart:[]
      
    }
  },
   filters:{
    dauchamphantach(sotien){
      return sotien.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
  },
  computed: {
    ...mapGetters({
      getIndex: 'user/getIndex',
      getCart: 'user/getCart',
    })
     
  },
  async created() {
    await this.getOneProduct(this.getIndex)
  },

  methods: {
     ...mapActions({
      setCart: 'user/setCart',
    }),
   async addCart(number){
        
        this.cart = cloneDeep(this.getCart)
        const name = this.product.productName;
        let num ;
        const isTrue = this.cart.some(function(ca,index){
         num = index;
          return ca.productName === name ;
        })
        
        const addCart = {
        productName: this.product.productName,
        quantily: number,
        price: this.product.price,
      }
        if (isTrue === false) {
         this.cart.push(addCart)
      } else {
         this.cart[num].quantily += number;
      }
        
        
         this.$swal.fire({
        position: 'top-mid',
        icon: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500,
      })
      await this.setCart(this.cart)
      this.$router.push('/cart')

        
    },
    
    async getOneProduct(index) {
      try {
        const { data } = await catalogApi.getProductsById(this.$axios, index)
        console.log(data)

        this.product = data
      
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
