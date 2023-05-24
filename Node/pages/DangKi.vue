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
        <h3 class="heading">Đăng kí</h3>
        <p class="desc">Cùng nhau mua giày tại Tuyển shoes❤️</p>

        <div class="spacer"></div>

        <div class="form-group">
          <label for="fullname" class="form-label">Username</label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|max:255|alpha_dash"
            name="Username"
          >
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="VD: Trọng Tuyển"
              v-model="dataSubmit.accountName"
              class="form-control"
              
            />
            <p class="muted text-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email</label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|max:255|email"
            name="Email"
          >
            <input
              id="email"
              name="email"
              type="text"
              placeholder="VD: email@domain.com"
              v-model="dataSubmit.accountEmail"
              class="form-control"
              
            />
            <p class="muted text-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Mật khẩu</label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|max:25|min:6|alpha_dash"
            name="Password"
          >
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              v-model="dataSubmit.accountPassword"
              class="form-control"
              
            />

            <p class="muted text-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="password_confirmation" class="form-label"
            >Nhập lại mật khẩu</label
          >

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|max:25|min:6|alpha_dash"
            name="Password nhập lại"
          >
            <input
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Nhập lại mật khẩu"
              type="password"
              v-model="confirmation"
              class="form-control"
              
            />
            <p class="muted text-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <button type="submit" class="form-submit">Đăng kí</button>
        
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import catalogApi from '@/api/catalogApi'
export default {

  data() {
    return {
      dataSubmit: {
        accountName: '',
        accountEmail: '',
        accountPassword: null,
      },
      confirmation: null,
    }
  },

  methods: {
   
    async onSubmit() {
      try {
        if (this.dataSubmit.accountPassword !== this.confirmation) {
          
           this.$swal.fire({
          position: 'top-mid',
           icon: ' warning',
           title: 'Tài khoản hoặc mật khẩu nhập lại bị sai',
           showConfirmButton: false,
           timer: 1500,
      })
         
        } else {
          await catalogApi.addAccount(this.$axios, this.dataSubmit)
          this.$swal.fire({
          position: 'top-mid',
           icon: 'success',
           title: 'Bạn đã tạo tài khoản thành công',
           showConfirmButton: false,
           timer: 1500,
      })
          this.$router.push('/login')
          
        }
      } catch (err) {}
    },
  },
}
</script>
<style scoped>
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
  font-size: 1.2rem;
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
  font-size: 0.9rem;
}

.form-control {
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  outline: none;
  font-size: 0.9rem;
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
