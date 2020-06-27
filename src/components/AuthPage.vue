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
  padding-bottom: 50px;
}
.window {
  background-color:whitesmoke;
  padding: 75px ;
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
  width: 175px;
  height: 25px;
  background-color: #e6e6e6;
}
.window__input{
  margin: 5px;
  text-transform: uppercase;
  background: transparent;
  border: none;
  outline: none;
}
.window__submit{
  margin-top: 10px;
  width: 175px;
  height: 25px;
  border-radius: 10px;
  background-color: lightgreen;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.window__submit__btn{
  text-transform: uppercase;
  background: transparent;
  border: none;
}
</style>
