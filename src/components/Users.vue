<template>
  <div class="users" style="overflow-x:auto;">
  <table class="usersTable">
    <thead>
      <tr class="usersTable__toolbar">
        <div class="usersTable__toolbar__title">Users</div>
      </tr>
      <tr class="usersTable__headers">
        <th>ID</th>
        <th>Username</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Is active</th>
        <th>Last login</th>
        <th>Is superuser</th>
      </tr>
    </thead>
    <tbody class="usersTable__data">
      <tr v-for="user in testUsers" v-bind:key="user.id">
        <td>{{user.id}}</td>
        <td>{{user.username}}</td>
        <td>{{user.first_name}}</td>
        <td>{{user.last_name}}</td>
        <td>{{user.is_active}}</td>
        <td>{{user.last_login}}</td>
        <td>{{user.is_superuser}}</td>
      </tr>
    </tbody>
  </table>
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
      authToken: "",
      
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
          //console.log(response);
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
tr:not(.usersTable__toolbar):hover {background-color: #f5f5f5;}
.usersTable__toolbar__title{
  font-size: 30px;
  padding: 10px 0px 0px 15px;
}
.users{
  align-items: center;
  justify-content: center;
  display: flex;
  width: 940px;
  margin: 10px;
}
.usersTable{
  width: 90%;
  border-collapse: collapse;
  box-shadow: 0 0 15px rgba(122,122,122,0.5);
}
.usersTable th{
  height: 50px;
  text-align: left;
}
.usersTable th, td{
  padding: 15px;
  border-bottom: 1px solid #ddd;
}
</style>
