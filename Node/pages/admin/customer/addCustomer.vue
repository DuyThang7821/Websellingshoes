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
        <h3 class="heading">Thêm khách hàng</h3>
     

        <div class="spacer"></div>

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
              v-model="dataSubmit.customerName"
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
            type="number" min=1
            class="form-control"
            v-model="dataSubmit.age"
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
              v-model="dataSubmit.customerSex"
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
              v-model="dataSubmit.avatar"
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
              v-model="dataSubmit.inStocks"
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
         
            <textarea type="text" class="form-control"  v-model="dataSubmit.description"></textarea>
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
   layout:"default_admin",
  middleware: ['isAuthorize'],

  data() {
    return {
      dataSubmit: {
        customerName: '',
        customerSex: null,
        age: 0,
        avatar: '',
        description: '',
        inStocks: 10,
      },
     
    }
  },
  
  methods: {
    

    async onSubmit() {
      try {
        await catalogApi.addCustomer(this.$axios, this.dataSubmit)
        this.$swal.fire({
        position: 'top-mid',
        icon: 'success',
        title: 'Đã thêm thành công khách hàng',
        showConfirmButton: false,
        timer: 1500,
      })
      //  this.$router.go(0)
        this.$router.push('/admin/customer/editCustomer')
      } catch (err) {
        alert('Error')
      }
    },
  },
}
</script>
