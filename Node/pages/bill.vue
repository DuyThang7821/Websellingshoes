<template>
  <div class="container">
    <main>
      <div class="py-5 text-center">
        <img
          class="d-block mx-auto mb-4"
          src="/docs/5.1/assets/brand/bootstrap-logo.svg"
          alt=""
          width="72"
          height="57"
        />
        <h2>Bill Tuyển Shoes</h2>
        <p class="lead">
          Cảm ơn quý khách đã mua giày tại cửa hàng  chúng tôi
        </p>
      </div>

      <div class="row g-5">
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Your cart</span>
            <span class="badge bg-primary rounded-pill">{{listProducts.length}}</span>
          </h4>
          <ul class="list-group mb-3">
            <li
              v-for="(product, index) in listProducts"
              :key="index"
              class="list-group-item d-flex justify-content-between lh-sm"
            >
              <div>
                <h6 class="my-0">{{ product.productName }}</h6>
                <small class="text-muted">{{ product.description }}</small>
              </div>
              
              
                <span class="text-muted">{{ product.price | dauchamphantach }}VNĐ</span>
               
                
              <span class="text-muted">/{{ product.quantily }}</span>
              
              
             
            </li>

            <li class="list-group-item d-flex justify-content-between bg-light">
              <div class="text-success">
                <h6 class="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span class="text-success" v-mode="">50000VNĐ</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (VNĐ)</span>
              <strong>{{total | dauchamphantach}} VNĐ</strong>
            </li>
          </ul>

          <form class="card p-2">
            <div class="input-group">
              
              <button type="submit"  class="btn btn-secondary" style="margin-left:40%">Thank you</button>
            </div>
          </form>
        </div>

        <div class="col-md-7 col-lg-8">
           <img src="/logo1.png" alt="Logo" style="width:50%;margin-left:25%" >
     
        </div>
        
        
      </div>
    </main>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash-es'
export default {
  layout: 'default',
  middleware: ['isAuthorize'],
  data() {
    return {
      listProducts: [],
      cartPay:[]
    }
  },
  filters:{
    dauchamphantach(sotien){
      return sotien.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
  },
    computed: {
    ...mapGetters({
      getCart: 'user/getCart',
    }),
    total(){
      return this.listProducts.reduce(function callback(totalNumber,currentValue){
    return totalNumber + (currentValue.quantily*currentValue.price);
},0);
    }
  },
  
  async created() {
    
  },
  mounted() {
    this.listProducts = cloneDeep(this.getCart)
  },
  method: {
    pay(){
    
    
    }
  }
}
</script>
