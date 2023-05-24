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
        <h3 class="heading">Thêm sản phẩm</h3>
        <p class="desc">Thêm tất cả các sản phẩm mà bạn muốn</p>

        <div class="spacer"></div>

        <div class="form-group">
          <label for="fullname" class="form-label">Tên sản phẩm</label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|max:255"
            name="Tên sản phẩm"
          >
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="VD: Giày Bitis"
              class="form-control"
              v-model="dataSubmit.productName"
            />
            <p class="muted text-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Danh mục</label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="Danh mục"
          >
            <select
              name=""
              id=""
              class="form-control"
              v-model="dataSubmit.categoryId"
            >
              <option
                v-for="(category, index) in categories"
                :key="index"
                :value="category.categoryId"
              >
                {{ category.categoryName }}
              </option>
            </select>
            <p class="muted text-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>
        <!-- Start -->
        <div class="form-group">
          <label for="price" class="form-label">Giá tiền</label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|max:25|integer|min_value:1"
            name="Giá tiền"
          >
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Giá tiền"
              class="form-control"
              v-model="dataSubmit.price"
            />

            <p class="muted text-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>
        <!-- End -->
        <!-- Start -->
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
        <!-- End -->
        <div class="form-group">
          <label for="stock" class="form-label">Tồn kho</label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|max:25|integer|min_value:1"
            name="Tồn kho"
          >
            <input
              id="inStocks"
              name="inStocks"
              placeholder="Nhập số lượng tồn kho"
              type="number"
              class="form-control"
              v-model="dataSubmit.inStocks"
            />
            <p class="muted text-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="form-group h">
          <label for="stock" class="form-label">Mô tả</label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="Tồn kho"
          >
            <textarea
              type="text"
              class="form-control"
              v-model="dataSubmit.description"
            ></textarea>
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
import catalogApi from '@/api/catalogApi'
export default {
  layout: 'default_admin',
  middleware: ['isAuthorize'],
  data() {
    return {
      dataSubmit: {
        productName: '',
        categoryId: null,
        price: 0,
        avatar: '',
        description: '',
        inStocks: 10,
      },
      categories: [],
    }
  },
  async created() {
    await this.getCategories()
  },
  methods: {
    async getCategories() {
      try {
        const { data } = await catalogApi.getCategories(this.$axios)
        this.categories = data
      } catch (err) {}
    },

    async onSubmit() {
      try {
        
        await catalogApi.addProduct(this.$axios, this.dataSubmit)
        
        this.$swal.fire({
          position: 'top-mid',
          icon: 'success',
          title: 'Đã thêm thành công sản phẩm',
          showConfirmButton: false,
          timer: 1500,
        })
        this.$router.push('/admin/products/edit')
      } catch (err) {
        this.$swal.fire({
          position: 'top-mid',
          icon: 'error',
          title: 'Thêm sản phẩm không thành công',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    },
  },
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
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
  min-height: 100vh;
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
