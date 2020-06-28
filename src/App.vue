<template>
<div id="app" class="app">
  <body>
    <header class="header-content">
      <div class="header-title">Test assignment</div>
      <div class="header__logout">
        <button v-if="isLoggedIn" class="header__logout__btn" @click="logout()">Logout</button>
      </div>
    </header>
    <content class="view-content">
      <router-view></router-view>
    </content>
    <footer class="footer-content">
      <div class="footer-title">
        <span class="footer-title__text">© 2020</span>
      </div>
    </footer>
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
  },
  
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
.header-content {
  background-color: skyblue;
  height: 70px;
  margin: 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  position: relative;
  box-shadow: 0 0 15px rgba(122, 122, 122, 0.5);
}
.header-title {
  font-size: 25px;
  margin-left: 45%;
}
.view-content {
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.footer-content {
  position: relative;
  background-color: skyblue;
  height: 70px;
  margin: 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  box-shadow: 0 0 15px rgba(122, 122, 122, 0.5);
}
.footer-title {
  margin: 30px 0px 10px 10px;
  display: flex;
  justify-content: flex-start;
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
</style>
