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
          <div class="container" id="modal" v-show="isShow">
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
                    <label for="fullname" class="form-label">Tên đầy đủ</label>

                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|max:255"
                      name="Tên đầy đủ"
                    >
                      <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        placeholder="VD: Trọng Tuyển"
                        class="form-control"
                        v-model="account.accountName"
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
                        class="form-control"
                        v-model="account.accountEmail"
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
                      rules="required|max:25"
                      name="Password"
                    >
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        class="form-control"
                        v-model="account.accountPassword"
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
      </div>
    </div>

    <!-- Start: Account -->
    <div class="container">
      <div class="row">
        <b-card-group
          v-for="(account, index) in listAccounts"
          :key="index"
          class="col-12 col-md-4 mb-3"
        >
          <Account :account="account" />

          <b-card style="max-width: 11rem">
            <b-button
              style="max-width: 5rem"
              class="btn btn-primary"
              variant="warning"
              @click="editAccountById(account.accountId)"
            >
              Edit
            </b-button>
            <b-button
              style="max-width: 5rem"
              class="btn btn-primary"
              variant="warning"
              @click="deleteAccountById(account.accountId)"
            >
              Delete
            </b-button>
          </b-card>
        </b-card-group>
      </div>
    </div>
    <!-- End: Account -->
  </main>
</template>
<script>
import Account from '@/components/index/Account.vue'
import accountApi from '@/api/accountApi'

export default {
  components: { Account },
  layout: 'default_admin',
  middleware: ['isAuthorize'],

  data() {
    return {
      dataSubmit: {
        accountName: '',
        accountEmail: '',
        accountPassword: null,
      },

      isShow: true,
      listAccounts: [],

      account: {
        accountId: '',
        accountName: '',
        accountEmail: '',
        accountPassword: null,
      },
    }
  },
  async created() {
    await this.getAllAccounts()
    await this.editAccountById()
    
  },
  mounted() {},
  methods: {
    // hàm này dùng để load các tài khoản lên trang
    async getAllAccounts() {
      try {
        const { data } = await accountApi.getAccounts(this.$axios)
        console.log(data)

        this.listAccounts = data
      } catch (err) {
        console.log(err)
      }
    },

    async editAccountById(index) {
      try {
        this.isShow = !this.isShow
        const { data } = await accountApi.getAccountById(this.$axios, index)

        console.log(data)

        this.account = data
      } catch (err) {
        console.log(err)
      }
    },
    async onSubmit() {
      try {
        this.isShow = !this.isShow
        // alert(this.account.accountId)
        await accountApi.editAccount(
          this.$axios,
          this.account.accountId,
          this.account
        )

        this.$swal.fire({
          position: 'top-mid',
          icon: 'success',
          title: 'Đã chỉnh sửa thành công tài khoản',
          showConfirmButton: false,
          timer: 1500,
        })
        this.$router.go(0)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteAccountById(accountId) {
      try {
        await accountApi.deleteAccount(this.$axios, accountId)
         const a = confirm('Bạn có muốn xóa')
        if (a === true) {
           await accountApi.deleteAccount(this.$axios, accountId)
           this.$swal.fire({
            position: 'top-mid',
            icon: 'success',
            title: 'Đã xóa thành công sản phẩm',
            showConfirmButton: false,
            timer: 1500,
          })
           this.$router.go(0)
          this.getAllAccounts()
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
  margin-top: 50px;
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
