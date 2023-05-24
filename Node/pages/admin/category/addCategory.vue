<template>
  <div class="main">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        action=""
        method="POST"
        class="form"
        id="form-1"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <h3 class="heading">Thêm danh mục sản phẩm</h3>

        <div class="spacer"></div>

        <div class="form-group">
          <label for="fullname" class="form-label">Danh mục</label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|max:255"
            name="Danh mục"
          >
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="VD: Đồ ăn"
              class="form-control"
              v-model="dataSubmit.categoryName"
            />
            <p class="muted text-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="price" class="form-label">Hình ảnh</label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="Hình ảnh"
          >
            <input
              id="avatar"
              name="avatar"
              type="text"
              placeholder="Hình ảnh"
              class="form-control"
              v-model="dataSubmit.avatar"
            />

            <p class="muted text-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <button type="submit" class="btn btn-primary">Lưu</button>
        <button type="reset" class="btn btn-outline-primary">Nhập lại</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import categoryApi from '@/api/categoryApi'
export default {
  layout: 'default_admin',
  middleware: ['isAuthorize'],
  data() {
    return {
      dataSubmit: {
        categoryName: '',
        avatar: '',
      },
    }
  },

  methods: {
    async onSubmit() {
      try {
        await categoryApi.addCategories(this.$axios, this.dataSubmit)
        this.$swal.fire({
          position: 'top-mid',
          icon: 'success',
          title: 'Đã thêm thành công danh mục',
          showConfirmButton: false,
          timer: 1500,
        })
        this.$router.push('/admin/category/editCategory')
      } catch (err) {}
    },
  },
}
</script>
