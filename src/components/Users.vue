<template>
  <div class="page">
    <div class="users">
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
      <div class="usersTable__toolbar__sortBtn" @click="sortTable(0)">
        <p>Sort by ID</p>
        <i id="arrow" class="arrow-up"></i>
      </div>
      <table class="usersTable" id="usersTable">
        <thead>
          <tr class="usersTable__headers">
            <th @click="sortTable(0)" class="sorting">
              ID
              <i id="arrow" class="arrow-up"></i>
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
          <tr v-for="user in users" v-bind:key="user.id">
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
      searchInput: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.getUsers();
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
      var arrow = document.getElementsByClassName("arrow-up");
      switching = true;
      dir = "asc";
      while (switching) {
        switching = false;
        rows = table.getElementsByTagName("tr");
        for (i = 1; i < rows.length - 1; i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("td")[n];
          y = rows[i + 1].getElementsByTagName("td")[n];
          if (dir == "asc") {
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
              shouldSwitch = true;
              arrow[0].style.transform='rotate(-135deg)';
              arrow[1].style.transform='rotate(-135deg)';
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
            arrow[0].style.transform='rotate(45deg)';
            arrow[1].style.transform='rotate(45deg)';
            dir = "desc";
            switching = true;
          }
        }
      }
    },
    searchUser() {
      let app = this;
      let filter;
      let table;
      let tr, td, i;
      filter = app.searchInput.toUpperCase();
      table = document.getElementById("usersTable");
      tr = table.getElementsByTagName("tr");

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
    },
    getUsers() {
      var app = this;
      axios
        .get(`https://emphasoft-test-assignment.herokuapp.com/api/v1/users/`, {
          headers: {
            Authorization: "Token " + localStorage.token
          }
        })
        .then(response => {
          console.log(response);
          app.users = response.data;
        })
        .catch(error => {
          alert(error + "\n Ошибка подключения");
          console.log("-----error-------");
          console.log(error);
        });
    }
  }
};
</script>


<style>
.usersTable__data tr:hover {
  background-color: #f5f5f5;
}
.usersTable__toolbar {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
}
.usersTable__toolbar__title {
  font-size: 30px;
  padding: 10px 0px 0px 15px;
  margin-right: 20px;
}
.page {
  /* align-items: center;
  justify-content: center;
  display: flex;
  flex-flow: column wrap; */
  margin: 10px;
}
.users {
  margin: auto;
  overflow: auto;
  min-width: 803px;
  padding: 10px;
  box-shadow: 0 0 15px rgba(122, 122, 122, 0.5);
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
.sorting {
  cursor: pointer;
  cursor: hand;
}
.sorting:hover {
  background: #f5f5f5;
}
.arrow-up {
  border: solid black;
  border-radius: 20%;
  border-width: 0px 3px 3px 0px;
  display: inline-block;
  padding: 3px;
  transform: rotate(-135deg);
}
.userTable__toolbar__search {
  width: 100%;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
}
.usersTable__toolbar__sortBtn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
  margin: auto auto 10px auto;
  font-family: arial, sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: rgb(68, 68, 68);
  text-decoration: none;
  user-select: none;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background: rgb(245, 245, 245) linear-gradient(#f4f4f4, #f1f1f1);
  transition: all 0.218s ease 0s;
}
@media only screen and (max-width: 2080px) {
  td {
    max-width: 100px;
    word-wrap: break-word;
  }
}
@media only screen and (max-width: 850px) {
  .users {
    min-width: 305px;
  }
  .userTable__toolbar__search {
    padding: 12px 20px 12px 10px;
  }
  .usersTable__toolbar__sortBtn{
    display: flex;
  }
  .arrow-up{
    margin-left: 10px;
  }
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  tr {
    border: 1px solid #ccc;
  }
  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
    margin: auto;
    min-height: 15px;
  }
  td:before {
    position: absolute;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }
  td:nth-of-type(1):before {
    content: "ID";
  }
  td:nth-of-type(2):before {
    content: "Username";
  }
  td:nth-of-type(3):before {
    content: "First name";
  }
  td:nth-of-type(4):before {
    content: "Last name";
  }
  td:nth-of-type(5):before {
    content: "Is active";
  }
  td:nth-of-type(6):before {
    content: "Last login";
  }
  td:nth-of-type(7):before {
    content: "Is superuser";
  }
}
</style>
