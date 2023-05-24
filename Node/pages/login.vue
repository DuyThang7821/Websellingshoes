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
        
        <h3 class="heading">  Đăng nhập </h3>
        <p class="desc">Cùng nhau  mua giày tại Tuyển shoes❤️</p>

        <div class="spacer"></div>

        <div class="form-group">
          <label for="email" class="form-label">Tài khoản /Email</label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|max:255"
            name="Tài khoản/Email"
          >
            <input
              v-model="dataSubmit.username"
              id="email"
              name="email"
              type="text"
              placeholder="VD: email@domain.com"
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
            rules="required|max:25|min:4|alpha_dash"
            name="Password"
          >
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              class="form-control"
              v-model="dataSubmit.password"
            />
            <p class="muted text-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
         
        </div>

        

        <b-button type="submit" squared variant="outline-primary" class="form-submit">Đăng nhập</b-button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import accountApi from '@/api/accountApi'
export default {
  data() {
    return {
      dataSubmit: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions({
      setToken: 'user/setToken',
      setRole: 'user/setRole',
    }),
    async onSubmit() {
      try {
        const data = await accountApi.login(this.$axios, this.dataSubmit)
        console.log(data.access_token)
        await this.setToken(data.access_token)
        await this.setRole(data.role)
        if(data.role === 'admin' || data.role === 'saler'){
         
         
         this.$router.push('/admin')
        }
        else {
          this.$swal.fire({
        position: 'top-mid',
        icon: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500,
      })
          this.$router.push('/')
          
        }
        
      } catch (err) {
        console.log(err)
        alert('Sai tên đăng nhập hoặc mật khẩu')
      }
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

