<template>
  <div id="app" class="app">
    <body>
      <header class="header-content">
      <div class="header-title">Test assignment</div>
      <div class="header__logout">
        <button v-if="isLoggedIn" class="header__logout__btn" @click="logout()" >Logout</button>
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
  data: () => ({
  }),
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
html{
    height: 100%;
    
}
body{
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
  justify-content: center;
  align-items: center;
  align-content: center;
  position: relative;
}
.header-title{
  font-size: 25px;
}
.view-content{
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
}
.footer-title{
  margin: 30px 0px 10px 10px;
  display: flex;
  justify-content: flex-start;
}
</style>
