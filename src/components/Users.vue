<template>
<div class="page">
  <div class="users" style="overflow-x:auto;">
    <div class="usersTable__toolbar">
          <div class="usersTable__toolbar__title">Users</div>
          <input
            type="text"
            class="userTable__toolbar__search"
            v-model="searchInput"
            @keyup="searchUser()"
            placeholder="Search for username.."
          />
        </div>
    <table class="usersTable" id="usersTable">
      <thead>
        <tr class="usersTable__headers">
          <th @click="sortTable(0)">
            ID
            <i class="arrow"></i>
          </th>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "users",
  data() {
    return {
      users: [],
      searchInput:'',
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
          //console.log(response);
          app.authToken = response.data.token;
        })
        .catch(error => {
          alert(error + "\n Ошибка подключения");
          console.log("-----error-------");
          console.log(error);
        });
    },
    sortTable(n) {
      var table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
      table = document.getElementById("usersTable");
      switching = true;
      dir = "asc";
      while (switching) {
        switching = false;
        rows = table.getElementsByTagName("tr");
        for (i = 2; i < rows.length - 1; i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("td")[n];
          y = rows[i + 1].getElementsByTagName("td")[n];
          if (dir == "asc") {
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount++;
        } else {
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    },
    searchUser() {
      let app = this;
      let filter
      let table
      let tr, td, i;
      filter = app.searchInput.toUpperCase();
      table = document.getElementById("usersTable");
      tr = table.getElementsByTagName("tr");
      //console.log(filter, table, tr)
      // Loop through all table rows, and hide those who don't match the search query
      for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
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
tr:not(.usersTable__toolbar):hover {
  background-color: #f5f5f5;
}
.usersTable__toolbar{
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
}
.usersTable__toolbar__title {
  font-size: 30px;
  padding: 10px 0px 0px 15px;
  margin-right: 20px;
}
.users{
  padding: 10px;
  box-shadow: 0 0 15px rgba(122, 122, 122, 0.5);
}
.page {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-flow: column wrap;
  width: 940px;
  margin: 10px;
}
.usersTable {
  width: 100%;
  border-collapse: collapse;
}
.usersTable th {
  -webkit-user-select: none;
  height: 50px;
  text-align: left;
}
.usersTable th,
td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
}
.arrow {
  border: solid black;
  border-radius: 20%;
  border-width: 0px 3px 3px 0px;
  display: inline-block;
  padding: 3px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}
.userTable__toolbar__search{
  width: 100%; 
  font-size: 16px; 
  padding: 12px 20px 12px 40px; 
  border: 1px solid #ddd; 
  margin-bottom: 12px; 
}
</style>
