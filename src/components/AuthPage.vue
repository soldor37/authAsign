<template>
  <div class="auth">
    <form class="window">
      <span class="window__title">Authentification</span>
      <div class="window__wrap-input">
        <input type="text" v-model="user.login" placeholder="Login" class="window__input" />
      </div>
      <div class="window__wrap-input">
        <input type="password" v-model="user.password" placeholder="Password" class="window__input" />
      </div>
      <div class="window__submit">
        <button class="window__submit__btn" @click="submitAuth()">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "auth",
  data() {
    return {
      user: {
        login: "",
        password: ""
      }
    };
  },
  methods: {
    submitAuth() {
      event.preventDefault();
      let username = this.user.login;
      let password = this.user.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/users"))
        .catch(err => console.log(err));
    }
  }
};
</script>


<style>
.auth {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: 10px;
}
.window__title {
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 40px;
}
.window {
  background-color: whitesmoke;
  padding: 70px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(122, 122, 122, 0.5);
}
.window__wrap-input {
  margin-top: 10px;
  border-radius: 10px;
  width: 275px;
  height: 35px;
  background-color: #e6e6e6;
  display: flex;
  justify-content: center;
}
.window__input {
  margin: 5px;
  background: transparent;
  border: none;
  outline: none;
}
.window__wrap-input:hover {
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1);
}
.window__submit {
  margin-top: 20px;
  margin-bottom: 10px;
  width: 175px;
  height: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.window__submit__btn:hover {
  color: rgb(24, 24, 24);
  border: 1px solid rgb(198, 198, 198);
  background: #f7f7f7 linear-gradient(#f7f7f7, #f1f1f1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.window__submit__btn:focus {
  outline: none;
}
.window__submit__btn {
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
  .window {
    padding: 15px;
  }
}
</style>
