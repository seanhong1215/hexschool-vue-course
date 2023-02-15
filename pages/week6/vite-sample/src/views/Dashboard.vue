<template>
  <div>
    <h1>你現在在後台頁面</h1>
    <div id="nav">
      <router-link to="/">回到前台</router-link> |
      <router-link to="/admin/products">後台產品列表</router-link> |
      <router-link to="/admin/orders">後台訂單</router-link> |
      <a href="#" @click.prevent="signout">登出</a>
    </div>
    <router-view v-if="checkSuccess"></router-view>
  </div>
</template>

<script>

export default {
  name: "Dashboard",
  data() {
    return {
      checkSuccess: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexschool\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`;
        this.$http
          .post(`${import.meta.env.VITE_API}api/user/check`, {
            api_token: this.token,
          })
          .then(() => {
            this.checkSuccess = true;
          })
          .catch((err) => {
            alert(err.response.data.message);
            this.$router.push("/login");
          });
      } else {
        alert("您尚未登入。");
        this.$router.push("/login");
      }
    },
    signout() {
      document.cookie = "hexToken=;expires=;";
      alert("token 已清除");
      this.$router.push("/login");
    },
  },
};
</script>
