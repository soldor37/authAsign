<template>
  <div class="auth">
    <form class="window" @submit.prevent="submitAuth">
      <span class="window__title">Authentification</span>
      <div
        class="window__wrap-input"
        v-bind:class="{'is-invalid': submitted && $v.user.login.$error }"
      >
        <input type="text" v-model="user.login" placeholder="Login" class="window__input" />
      </div>
      <div v-if="submitted && !$v.user.login.required" class="invalid-feedback">
        <span v-if="!$v.user.login.required">Login is required</span>
        <span v-if="!$v.user.login.minLength">Login must be at least 1 character</span>
        <span v-if="!$v.user.login.maxLength">Login must be maximum 150 characters long</span>
      </div>
      <div
        class="window__wrap-input"
        v-bind:class="{'is-invalid': submitted && $v.user.password.$error }"
      >
        <input type="password" v-model="user.password" placeholder="Password" class="window__input" />
      </div>
      <div v-if="submitted && !$v.user.password.required" class="invalid-feedback">
        <span v-if="!$v.user.password.required">Password is required</span>
        <span v-if="!$v.user.password.minLength">Password must be at least 1 character</span>
        <span v-if="!$v.user.password.maxLength">Password must be maximum 128 characters long</span>
      </div>
      <div class="window__submit">
        <button class="window__submit__btn" type="submit">Submit</button>
      </div>
      <div v-if="wrongUserData" class="invalid-feedback">
        <span>Wrong login and/or password</span>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "auth",
  data() {
    return {
      user: {
        login: "",
        password: ""
      },

      submitted: false,
      wrongUserData: false
    };
  },
  validations: {
    user: {
      login: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(150)
      },
      password: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(128)
      }
    }
  },
  methods: {
    submitAuth() {
      this.submitted = true;
      this.wrongUserData = false;
      // event.preventDefault();
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        let username = this.user.login;
        let password = this.user.password;
        this.$store
          .dispatch("login", { username, password })
          .then(() => this.$router.push("/users"))
          .catch(err => {
            this.wrongUserData = true;
            console.log(err);
          });
      }
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
  /* width: 175px;
  height: 25px; */
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
.is-invalid {
  border: 1px solid crimson;
}
.invalid-feedback {
  margin-top: 5px;
  font-size: 14px;
  color: crimson;
}
@media only screen and (max-width: 670px) {
  .window {
    padding: 15px;
  }
}
</style>
