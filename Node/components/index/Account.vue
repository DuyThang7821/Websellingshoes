<template>

      <b-card>
    <div class="card-header">
      <p class="my-0 font-weight-normal">{{ account.accountName }}</p>
    </div>
    <h1 class="card-title pricing-card-title">
      {{ account.accountEmail }}
    </h1>
    <p class="card-title pricing-card-title">
      {{ account.accountPassword }}
    </p>
    <template #footer>
      <small class="text-muted">Last updated 3 mins ago</small>
    </template>
  </b-card>


</template>
<script>
export default {
    props : {
        account:{
            type: Object,
            required: true,
            default(){
                return {}
            },
        },
    },
    
}
</script>


