<template>
  <main>
    <div class="dialog overlay" id="my-dialog" v-show="isShow">
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
                    v-model="category.categoryName"
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
                    v-model="category.avatar"
                  />

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

    <!-- Start: Category -->
    <div class="container">
      <div class="row">
        <b-card-group
          v-for="(category, index) in listCategories"
          :key="index"
          class="col-12 col-md-4 mb-3"
        >
          <Category :category="category" />

          <b-card style="max-width: 11rem">
            <b-button
              style="max-width: 5rem"
              class="btn btn-primary"
              variant="warning"
              @click="editCategoryById(category.categoryId)"
            >
              Edit
            </b-button>
            <b-button
              style="max-width: 5rem"
              class="btn btn-primary"
              variant="warning"
              @click="deleteCategoryById(category.categoryId)"
            >
              Delete
            </b-button>
          </b-card>
        </b-card-group>
      </div>
    </div>
    <!-- End: Category -->
  </main>
</template>
<script>
import Category from '@/components/index/Category.vue'
import categoryApi from '@/api/categoryApi'

export default {
  components: { Category },
  layout: 'default_admin',
  middleware: ['isAuthorize'],

  data() {
    return {
      dataSubmit: {
        categoryName: '',
        avatar: '',
      },

      isShow: true,
      listCategories: [],

      category: {
        categoryId: '',
        categoryName: '',
        avatar: '',
      },
    }
  },
  async created() {
    await this.getAllCategories()
    await this.editCategoryById()
    
  },
  mounted() {},
  methods: {
    // hàm này dùng để load các tài khoản lên trang
    async getAllCategories() {
      try {
        const { data } = await categoryApi.getCategories(this.$axios)
        console.log(data)

        this.listCategories = data
      } catch (err) {
        console.log(err)
      }
    },

    async editCategoryById(index) {
      try {
        this.isShow = !this.isShow
        const { data } = await categoryApi.getCategoriesById(this.$axios, index)
        console.log(data)
        this.category = data
      } catch (err) {
        console.log(err)
      }
    },
    async onSubmit() {
      try {
        this.isShow = !this.isShow
        alert(this.category.categoryId)
        await categoryApi.editCategories(
          this.$axios,
          this.category.categoryId,
          this.category
        )

        this.$swal.fire({
          position: 'top-mid',
          icon: 'success',
          title: 'Đã chỉnh sửa thành công danh mục',
          showConfirmButton: false,
          timer: 1500,
        })
        this.$router.go(0)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteCategoryById(categoryId) {
      try {
       
        const a = confirm('Bạn có muốn xóa')
        if (a === true) {
          await categoryApi.deleteCategories(this.$axios, categoryId)
           this.$swal.fire({
            position: 'top-mid',
            icon: 'success',
            title: 'Đã xóa thành công sản phẩm',
            showConfirmButton: false,
            timer: 1500,
          })
          this.getAllCategories()
        }
        
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
<style scoped>
.dialog {
  font-size: 1.4rem;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  transition: opacity linear 0.2s;
}

.dialog-body {
  max-width: 4000px;
  width: 800px;
  height: 500px;
  position: relative;

  padding: 10px;
  background-color: #fff;
  border-radius: 2px;
}
.overlay {
  background-color: rgba(0, 0, 0, 0.6);
}
.dialog-close-btn {
  margin-top: 0;
  float: right;

  color: rgb(189, 0, 0);
}

* {
  box-sizing: border-box;
}
html {
  color: #333;
  font-size: 62.5%;
  font-family: 'Open Sans', sans-serif;
}
.main {
  background-image: url(https://product.hstatic.net/1000230642/product/00200xdg_78b12cf819254b359784ae735c8d2471_1024x1024.jpg);

  background-size: 20%;
  min-height: 480px;
  display: flex;
  justify-content: center;
}
.form {
  width: 360px;
  min-height: 100px;
  padding: 32px 24px;
  text-align: center;
  background: #fff;
  border-radius: 2px;
  margin: 24px;
  align-self: center;
  box-shadow: 0 2px 5px 0 rgba(51, 62, 73, 0.1);
  margin-top: 80px !important;
}
.form .heading {
  font-size: 2rem;
}
.form .desc {
  text-align: center;
  color: #636d77;
  font-size: 1.6rem;
  font-weight: lighter;
  line-height: 2.4rem;
  margin-top: 16px;
  font-weight: 300;
}

.form-group {
  display: flex;
  margin-bottom: 16px;
  flex-direction: column;
}

.form-label,
.form-message {
  text-align: left;
}

.form-label {
  font-weight: 700;
  padding-bottom: 6px;
  line-height: 1.8rem;
  font-size: 1.4rem;
}

.form-control {
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  outline: none;
  font-size: 1.4rem;
}

.form-control:hover {
  border-color: #1dbfaf;
}

.form-group.invalid .form-control {
  border-color: #f33a58;
}

.form-group.invalid .form-message {
  color: #f33a58;
}

.form-message {
  font-size: 1.2rem;
  line-height: 1.6rem;
  padding: 4px 0 0;
}

.form-submit {
  outline: none;
  background-color: #1dbfaf;
  margin-top: 12px;
  padding: 12px 16px;
  font-weight: 600;
  color: #fff;
  border: none;
  width: 100%;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
}

.form-submit:hover {
  background-color: #1ac7b6;
}

.spacer {
  margin-top: 36px;
}

input#fullname.form-control {
  width: 100%;
}
</style>
