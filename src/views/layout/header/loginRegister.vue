<template>
  <div id="login-register">
    <div class="user-photo">
      <i class="jm-user" />
    </div>

    <div class="login">
      <div class="title">Login</div>
      <input class="input" placeholder="Please input your accout" />
      <input class="input" placeholder="Please input your password" />
      <div class="remeber-psd"><i class="jm-unlock" />Remeber Password</div>
      <div class="tip">Register</div>
      <div class="btn">Confirm</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginRegister',
  data () {
    return {}
  }
}
</script>

<style lang="less">
@import url('../../../assets/style/index.less');

#login-register {
  color: @TC;

  .title {
    height: 30px;
    text-align: center;
    line-height: 30px;
  }

  .user-photo {
    display: flex;
    flex-direction: row;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    line-height: 30px;
    text-align: center;
    .SBS(fade(@BSC, 60));

    i {
      font-size: 30px;
      cursor: pointer;
      .STS(@TC);
    }
  }

  .login {
    position: fixed;
    width: 250px;
    border-radius: 15px;
    top: 60px;
    right: 10px;
    overflow: hidden;
    .SBS(fade(@BSC, 60));

    .input {
      width: 100%;
      margin-bottom: 5px;
      .SBS(fade(@BSC, 60));
    }
  }
}
</style>
