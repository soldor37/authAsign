<template>
  <div class="users">
    {{testUsers}}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "users",
  data() {
    return {
      users: [],
      testUsers: [
        {
          id: 0,
          username: "test1",
          first_name: "Gera",
          last_name: "asdasd",
          password: "asdasdasd34",
          is_active: true,
          last_login: "2020-06-27T14:31:59.700Z",
          is_superuser: true
        },
        {
          id: 1,
          username: "test2",
          first_name: "vadim",
          last_name: "asdasd3434",
          password: "fgfgergr",
          is_active: true,
          last_login: "2020-06-27T14:31:59.700Z",
          is_superuser: false
        }
      ],
      authData: {
        username: "test_super",
        password: "Nf<U4f<rDbtDxAPn"
      },
      authToken: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.getToken();
      //  this.getUsers();
    },
    getToken() {
      var app = this;
      axios
        .post(
          `http://emphasoft-test-assignment.herokuapp.com/api-token-auth/`,
          app.authData
        )
        .then(response => {
          console.log(response);
          app.authToken = response.data.token;
        })
        .catch(error => {
          alert(error + "\n Ошибка подключения");
          console.log("-----error-------");
          console.log(error);
        });
    }
    // getUsers() {
    //   var app = this;
    //   axios
    //     .get(`http://emphasoft-test-assignment.herokuapp.com/api/v1/users/`, {
    //       headers: {
    //         Authorization: app.authToken,
    //       }
    //     })
    //     .then(response => {
    //       console.log(response);
    //       app.users = response.data;
    //     })
    //     .catch(error => {
    //       alert(error + "\n Ошибка подключения");
    //       console.log("-----error-------");
    //       console.log(error);
    //     });
    // },
  }
};
</script>


<style>
</style>
