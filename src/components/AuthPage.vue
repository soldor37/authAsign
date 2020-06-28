<template>
  <div class="auth">
    <form class="window">
      <span class="window__title">
        Authentification
      </span>
      <div class="window__wrap-input">
        <input type="text" placeholder="Login" class="window__input"/>
      </div>
      <div class="window__wrap-input">
        <input type="password" placeholder="Password" class="window__input"/>
      </div>
      <div class="window__submit">
        <button type="submit" class="window__submit__btn">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {

};
</script>


<style>
.auth{
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: 10px;
}
.window__title{
  font-size: 20px;
  padding-bottom: 40px;
}
.window {
  background-color:whitesmoke;
  padding: 70px ;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(122,122,122,0.5);
}
.window__wrap-input{
  margin-top: 10px;
  border-radius: 10px;
  width: 275px;
  height: 35px;
  background-color: #e6e6e6;
  display: flex;
  justify-content: center;
}
.window__input{
  margin: 5px;
  text-transform: uppercase;
  background: transparent;
  border: none;
  outline: none;
}
.window__wrap-input:hover{
  box-shadow: 0 3px 2px rgba(0,0,0,.1);
}
.window__submit{
  margin-top: 20px;
  width: 175px;
  height: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.window__submit__btn:hover{
  color: rgb(24,24,24);
  border: 1px solid rgb(198,198,198);
  background: #f7f7f7 linear-gradient(#f7f7f7, #f1f1f1);
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
}
.window__submit__btn:focus {
  outline: none;
}
.window__submit__btn{
  display: inline-block;
  font-family: arial,sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: rgb(68,68,68);
  text-decoration: none;
  user-select: none;
  padding: 10px 15px;
  outline: none;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 2px;
  background: rgb(245,245,245) linear-gradient(#f4f4f4, #f1f1f1);
  transition: all .218s ease 0s;
}
</style>
