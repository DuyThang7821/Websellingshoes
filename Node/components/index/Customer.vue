<template>
    <b-card  :img-src="customer.avatar" img-alt="Image" img-top>
        <h4 class="my-0 font-weight-normal">
        {{ customer.customerName }}
      </h4>
      <h1 class="card-title pricing-card-title">
        {{customer.age }} <small class="text-muted"></small>
      </h1>
      <b-card-text>
       {{ customer.description }}
      </b-card-text>
      <template #footer>
        
        <button
        v-if="customer.inStocks > 0"
        type="button"
        class="btn btn-lg btn-block btn-outline-primary"
        @click="addToFriend"
      >
        Add To Friend
      </button>
      <button
        v-else
        type="button"
        class="btn btn-lg btn-block btn-outline-secondary"
        @click="Blacklist"
      >
         Blacklist
      </button>
      </template>
   

      
    </b-card>
</template>
<script>
export default {
  props: {
    customer: {
      type: Object,
      requred: true,
      default() {
        return {}
      },
    },
  },
  methods: {
    addToFriend() {
      this.$emit('add-to-friend', this.customer)
    },
    Blacklist() {
      this.$emit('blacklist', this.customer.customerName)
    },
  },
}
</script>
