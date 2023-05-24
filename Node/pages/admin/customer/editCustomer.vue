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
              <div class="form-group">
                <label for="fullname" class="form-label">Tên khách hàng</label>

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|max:255"
                  name="Tên khách hàng"
                >
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="VD: Trọng Tuyển"
                    class="form-control"
                    v-model="customer.customerName"
                  />
                  <p class="muted text-danger">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>

              <div class="form-group">
                <label for="email" class="form-label">Tuổi tác</label>

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|max:200|integer|min_value:1"
                  name="Tuổi tác"
                >
                  <input
                    type="number"
                    min="1"
                    class="form-control"
                    v-model="customer.age"
                  />
                  <p class="muted text-danger">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
              <!-- Start -->
              <div class="form-group">
                <label for="sex" class="form-label">Giới tính</label>

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|max:25"
                  name="Giới tính"
                >
                  <select
              name=""
              id=""
              class="form-control"
              v-model="customer.customerSex"
            >
              <option
               
                value="Nam"
              >
               Nam
              </option>
              <option
                
                value="Nữ"
              >
                Nữ
              </option>
              <option
                
                value="Khác"
              >
                Khác
              </option>
            </select>

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
                    v-model="customer.avatar"
                  />

                  <p class="muted text-danger">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
              <!-- End -->
              <div class="form-group">
                <label for="stock" class="form-label">Độ uy tín</label>

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|max:25|integer|min_value:0"
                  name="Độ uy tín"
                >
                  <input
                    id="inStocks"
                    name="inStocks"
                    placeholder="Nhập độ uy tín"
                    type="number"
                    class="form-control"
                    v-model="customer.inStocks"
                  />
                  <p class="muted text-danger">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>

              <div class="form-group h">
                <label for="stock" class="form-label">Địa chỉ</label>

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="Địa chỉ"
                >
                  <textarea
                    type="text"
                    class="form-control"
                    v-model="customer.description"
                  ></textarea>
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

    <!-- Start: Product -->
    <div class="container">
      <div class="row">
        <b-card-group
          v-for="(customer, index) in listCustomers"
          :key="index"
          class="col-12 col-md-4 mb-3"
        >
          <Customer :customer="customer" />

          <b-card style="max-width: 11rem">
            <b-button
              style="max-width: 5rem"
              class="btn btn-primary"
              variant="warning"
              @click="editCustomerById(customer.customerId)"
            >
              Edit
            </b-button>
            <b-button
              style="max-width: 5rem"
              class="btn btn-primary"
              variant="warning"
              @click="deleteCustomerById(customer.customerId)"
            >
              Delete
            </b-button>
          </b-card>
        </b-card-group>
      </div>
    </div>
    <!-- End: Product -->
  </main>
</template>
<script>
import Customer from '@/components/index/Customer.vue'
import catalogApi from '@/api/catalogApi'
import customerApi from '@/api/customerApi'

export default {
  components: { Customer },
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

      isShow: true,
      listCustomers: [],

      customer: {
        customerName: '',
        customerSex: null,
        age: 1000,
        avatar: '',
        description: '',
        inStocks: 10,
      },
    }
  },
  async created() {
    await this.getAllCustomers()
    await this.editCustomerById()
   
  },
  mounted() {},
  methods: {
    // hàm này dùng để load các khách hàng lên trang
    async getAllCustomers() {
      try {
        const { data } = await catalogApi.getCustomers(this.$axios)
        console.log(data)

        this.listCustomers = data
      } catch (err) {
        console.log(err)
      }
    },

    async editCustomerById(index) {
      try {
        this.isShow = !this.isShow
        const { data } = await customerApi.getCustomerById(this.$axios, index)
        console.log(data)

        this.customer = data
      } catch (err) {
        console.log(err)
      }
    },
    async onSubmit() {
      try {
        this.isShow = !this.isShow

        await customerApi.editCustomer(
          this.$axios,
          this.customer.customerId,
          this.customer
        )

        this.$swal.fire({
          position: 'top-mid',
          icon: 'success',
          title: 'Đã chỉnh sửa thành công khách hàng',
          showConfirmButton: false,
          timer: 1500,
        })
        this.$router.go(0)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteCustomerById(customerId) {
      try {
        

          const a = confirm('Bạn có muốn xóa')
        if (a === true) {
          await customerApi.deleteCustomer(this.$axios, customerId)
           this.$swal.fire({
            position: 'top-mid',
            icon: 'success',
            title: 'Đã xóa thành công sản phẩm',
            showConfirmButton: false,
            timer: 1500,
          })
          this.getAllCustomers()
        }
        // this.$router.go(0)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style>
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
  width: 50%;
  height: 100%;
  position: absolute;

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
