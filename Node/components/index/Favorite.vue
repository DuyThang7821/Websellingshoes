h1<template>
  <div>
    <div v-if="view === true" id="product-1" class="single-product">
      <div class="part-1">
        <img :src="product.avatar" alt="" style="height: 90%" class="image" />
        <ul>
          <li>
            <a href="#"><b-icon-heart animation="spin-pulse"></b-icon-heart></a>
          </li>

          <li>
            <a @click="sendId"><b-icon-search></b-icon-search> </a>
          </li>

          <li>
            <a @click="dele"><b-icon-trash></b-icon-trash> </a>
          </li>
        </ul>
      </div>
      <div class="part-2">
        <h3 class="home-product-item__name">{{ product.productName }}</h3>
        <h4 class="product-old-price">{{ product.price + 50000  |dauchamphantach}} VNĐ</h4>
        <h4 class="product-price">{{ product.price |dauchamphantach }}VNĐ</h4>
      </div>
    </div>
    <b-card-group v-if="view === false">
      <b-card :img-src="product.avatar" img-alt="Image" img-top> </b-card>
      <b-card>
        <h6 class="my-0 font-weight-normal h2">
          {{ product.productName }}
        </h6>
        <h4 class="card-title pricing-card-title">
          {{ product.price/1000}}.000VNĐ <small class="text-muted">/ sp</small>
        </h4>

        <input
          v-model="quantily"
          id="form1"
          min="0"
          name="quantity"
          type="number"
          class="form-control form-control"
        />
        <button
          class="btn btn-link px-2"
          onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
          @click="quantily++"
        >
          <h1><b-icon-plus variant="danger"></b-icon-plus></h1>
        </button>
        <button
          v-if="quantily > 1"
          class="btn btn-link px-2"
          onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
          @click="quantily--"
        >
          <h1><b-icon-patch-minus variant="danger"></b-icon-patch-minus></h1>
        </button>
        <h6>
          {{ product.description }}
        </h6>
        <template #footer>
          <small class="text-muted">Last updated 3 mins ago</small>

          <button
            v-if="product.inStocks > 0"
            type="button"
            class="btn btn-lg btn-block btn-outline-primary"
            @click="addToCart"
          >
            Add To Card
          </button>
          <button
            v-else
            type="button"
            class="btn btn-lg btn-block btn-outline-secondary"
            @click="outOfStock"
          >
            Out of stock
          </button>
        </template>
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
export default {
  props: {
    view: Boolean,
    show: Boolean,

    product: {
      type: Object,
      requred: true,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      quantily: 1,
    }
  },
   filters:{
    dauchamphantach(sotien){
      return sotien.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
  },

  methods: {
   
    alert(view) {
      alert(view)
    },
    dele() {
      this.$emit('delete-favorite', this.product.id)
    },
    addToCart() {
      this.$emit('add-to-cart', this.product)
      this.$emit('edit-Quantily', this.quantily)
    },
    outOfStock() {
      this.$emit('out-of-stock', this.product.productName)
    },
    sendId() {
      this.$emit('send-id', this.product.productId)
      
      this.$emit('start')
      
    },
  },
}
</script>

<style>
.home-product-item__name {
  font-size: 1.4rem;
  font-weight: 400;
  color: blue;
  line-height: 1.8rem;
  height: 3.6rem;
  margin: 10px 10px 6px;
  overflow: hidden;
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  opacity: 0.9;
}

body {
  font-family: 'Poppins', sans-serif;
  color: #444444;
}

a,
a:hover {
  text-decoration: none;
  color: inherit;
}

.section-products {
  padding: 80px 0 54px;
}

.section-products .header {
  margin-bottom: 50px;
}

.section-products .header h3 {
  font-size: 1rem;
  color: #fe302f;
  font-weight: 500;
}

.section-products .header h2 {
  font-size: 2.2rem;
  font-weight: 400;
  color: #444444;
}

.section-products .single-product {
  margin-bottom: 26px;
}

.section-products .single-product .part-1 {
  position: relative;
  height: 290px;
  max-height: 290px;
  margin-bottom: 20px;
  overflow: hidden;
}

.section-products .single-product .part-1::before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all 0.3s;
}

.section-products .single-product:hover .part-1::before {
  transform: scale(1.2, 1.2) rotate(5deg);
}

/* .section-products #product-1 .part-1::before {
    background-image: no-repeat center; 
    background-size: cover;
		transition: all 0.3s;
}


.section-products #product-2 .part-1::before {
    background: url("https://i.ibb.co/cLnZjnS/2.jpg") no-repeat center;
    background-size: cover;
}

.section-products #product-3 .part-1::before {
    background: url("https://i.ibb.co/L8Nrb7p/1.jpg") no-repeat center;
    background-size: cover;
}

.section-products #product-4 .part-1::before {
    background: url("https://i.ibb.co/cLnZjnS/2.jpg") no-repeat center;
    background-size: cover;
} */

.section-products .single-product .part-1 .discount,
.section-products .single-product .part-1 .new {
  position: absolute;
  top: 15px;
  left: 20px;
  color: #ffffff;
  background-color: #fe302f;
  padding: 2px 8px;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.section-products .single-product .part-1 .new {
  left: 0;
  background-color: #444444;
}

.section-products .single-product .part-1 ul {
  position: absolute;
  bottom: -41px;
  left: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
  opacity: 0;
  transition: bottom 0.5s, opacity 0.5s;
}

.section-products .single-product:hover .part-1 ul {
  bottom: 30px;
  opacity: 1;
}

.section-products .single-product .part-1 ul li {
  display: inline-block;
  margin-right: 4px;
}

.section-products .single-product .part-1 ul li a {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  background-color: #ffffff;
  color: #444444;
  text-align: center;
  box-shadow: 0 2px 20px rgb(50 50 50 / 10%);
  transition: color 0.2s;
}

.section-products .single-product .part-1 ul li a:hover {
  color: #fe302f;
}

.section-products .single-product .part-2 .product-title {
  font-size: 1rem;
}

.section-products .single-product .part-2 h4 {
  display: inline-block;
  font-size: 1rem;
}

.section-products .single-product .part-2 .product-old-price {
  position: relative;
  padding: 0 7px;
  margin-right: 2px;
  opacity: 0.6;
}

.section-products .single-product .part-2 .product-old-price::after {
  position: absolute;
  content: '';
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #444444;
  transform: translateY(-50%);
}
</style>
