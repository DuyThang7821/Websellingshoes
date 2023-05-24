<template>
  <main>
    <div class="container">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">List Customer </h1>
        <p class="lead">
          Quickly build an effective pricing table for your potential customers
          with this Bootstrap example. It’s built with default Bootstrap
          components and utilities with little customization.
        </p>
      </div>
   </div>
     <div class="container">
      <div class="row">
        
        <b-card-group
          v-for="(customer, index) in listCustomer"
          :key="index"
          class="col-12 col-md-4 mb-3"
          
        >
         <Customer
            :customer="customer"
            @add-to-friend="addCart"
            @blacklist="alert"
          />
        </b-card-group>
      </div>
    </div>
  </main>
</template>

<script>
import Customer from '@/components/index/Customer.vue'

import catalogApi from '@/api/catalogApi'

export default {
  components: { Customer },
  layout: 'default',
  data() {
    return {
      listCustomer: [],
    
    }
  },
  async created() {
    await this.getAllCustomers()
    
  },
  mounted() {},
  methods: {
    addCart(obj) {
      // eslint-disable-next-line no-console
      console.log(obj)
      this.$bvToast.toast('Add successful: ' + obj.customerName, {
        title: 'Information',
        variant: 'success',
      })
    },
    alert(customerName) {
      this.$bvToast.toast('Out of Stocks: ' + customerName, {
        title: 'Waring',
        variant: 'danger',
        
      })
    },
    async getAllCustomers() {
      try {
        const { data } = await catalogApi.getCustomers(this.$axios)
        console.log(data)

        this.listCustomer = data
      } catch (err) {
        console.log(err)
      }
    },
   
  },
}
</script>
