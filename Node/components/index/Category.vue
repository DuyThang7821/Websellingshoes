<template>
  
    


    <b-card  :img-src="category.avatar" img-alt="Image" img-top>
      <div class="card-header">
      <p class="my-0 font-weight-normal">{{ category.categoryName }}</p>
    </div>
      <template #footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>
  


</template>
<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
      default() {
        return {}
      },
    },
  },
}
</script>
