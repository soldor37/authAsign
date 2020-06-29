<template>
<div id="app" class="app">
  <body>
    <div class="header-content">
      <div class="header-title">Test assignment</div>
      <div class="header__logout">
        <button v-if="isLoggedIn" class="header__logout__btn" @click="logout()">Logout</button>
      </div>
    </div>
    <header class="header"></header>
    <content class="view-content">
      <router-view></router-view>
    </content>
    <footer class="footer-content"></footer>
    <div class="footer-title">
      <span class="footer-title__text">© 2020</span>
    </div>
  </body>
</div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/auth");
      });
    }
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  }
};
</script>

<style>
html {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: auto;
}
/* .app{
  display: flex;
  flex-flow: column wrap;
  margin: -10px;
} */
header {
  background-color: skyblue;
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 70px;
  margin: 0px;
  box-shadow: 0 0 15px rgba(122, 122, 122, 0.5);
}
.header-content {
  z-index: 5;
  height: 70px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  position: fixed;
}
.header-title {
  font-size: 25px;
  margin-left: 25px;
}
.view-content {
  padding-top: 10%;
  padding-bottom: 10%;
  /* flex: 1; */
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.footer-content {
  left: 0;
  bottom: 0;
  width: 100%;
  position: fixed;
  z-index: 1;
  background-color: skyblue;
  height: 70px;
  margin: 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 0 15px rgba(122, 122, 122, 0.5);
}
.footer-title {
  left: 0;
  bottom: 0;
  height: 70px;
  width: 100%;
  z-index: 5;
  position: fixed;
  padding-left: 6px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.header__logout {
  align-self: center;
  margin-right: 15px;
}
.header__logout__btn:hover {
  color: rgb(24, 24, 24);
  border: 1px solid rgb(198, 198, 198);
  background: #f7f7f7 linear-gradient(#f7f7f7, #f1f1f1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.header__logout__btn:focus {
  outline: none;
}
.header__logout__btn {
  display: inline-block;
  font-family: arial, sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: rgb(68, 68, 68);
  text-decoration: none;
  user-select: none;
  padding: 10px 15px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  background: rgb(245, 245, 245) linear-gradient(#f4f4f4, #f1f1f1);
  transition: all 0.218s ease 0s;
}
@media only screen and (max-width: 670px) {
  .view-content {
    padding-top: 20%;
  }
  .footer-content, .footer-title {
    height: 35px;
  }
}
</style>
