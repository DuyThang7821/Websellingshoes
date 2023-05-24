<template>
  <div class="container">
    <section class="box-main1" id="slide" style="font-size: 1rem; color: Crimson">
      <h3 class="title-main"><a href="">Thông tin liên hệ</a></h3>
        <b-card-img
          src="https://anhdep123.com/wp-content/uploads/2021/01/anh-giay-adidas.jpg"
          alt="Image"
          style="width: 600px"
          
        ></b-card-img>
      <div class="contact-desc">
        <h4 style="margin-top: 15px; margin-bottom: 10px">
          Một vài thông tin về công ty:
        </h4>
        <p> Địa chỉ: 634 Quang Trung Quảng Ngãi</p>
        <p>Địa chỉ công ty : 535 Tôn Đức Thắng Đà Nẵng</p>
        <p>
          Email : Liên hệ các vấn đề về đặt hàng online :
          trongtuyenlekhiet@gmail.com
        </p>
        <p>
          Email : Liên hệ các vấn đề về kênh cửa hàng, đại lý (offline) :
          chamsockhachhang@Tuyenshoes.com.vn
        </p>

        <p>Thời gian tư vấn: Thứ hai đến thứ bảy: từ 7h30 đến 16h30.</p>

        <p>Hotline : 19008198</p>

        <p>Sđt: 0946439269</p>
        <div class="contact">
          <form action="" class="contact__form">
            <label class="contact__label">Họ và tên</label> <br />
            <input
              v-model="information.name"
              id="username"
              class="contact__item"
              type="text"
              name="username"
              placeholder="Điền tên của bạn"
              value=""
            />
            <p class="contact__error" id="error-name"></p>
            <br />
            <label class="contact__label">Email</label> <br />
            <input
              v-model="information.email"
              id="email"
              class="contact__item"
              type="email"
              name="email"
              placeholder="Điền email của bạn"
              value=""
            />
            <p class="contact__error" id="error-email"></p>
            <br />
            <label for="">Tin nhắn</label> <br />
            <textarea
              v-model="information.mess"
              id="mess"
              class="contact__item"
              cols="30"
              rows="5"
              value=""
              placeholder="Bạn muốn nhắn gì tới Tuyen shoes ?"
            ></textarea>
            <p class="contact__error" id="error-mess"></p>
            <br />
            <button @click="sendInformation" class="btn btn-danger">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      information: {
        name: '',
        email: '',
        mess: '',
      },
    }
  },
  method: {
      sendInformation(){
          this.$swal.fire({
        position: 'top-mid',
        icon: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500,
      })
      }
  }
}
</script>
