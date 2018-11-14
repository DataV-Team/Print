<template>
  <div id="login-register">
    <div class="user-photo">
      <i class="jm-user" @click="showBox === 'login' ? showBox = '' : showBox = 'login'" />
    </div>

    <div :class="`login ${showBox === 'login' && 'show'}`">
      <div class="title">Login</div>
      <input-with-enter v-model="login.accout" type="text" placeholder="Please input your accout" />
      <input-with-enter v-model="login.password" type="password" placeholder="Please input your password" />
      <div class="remeber-psd" @click="remeberPSD = !remeberPSD">
        <i :class="`jm-${remeberPSD ? 'lock' : 'unlock'}`" />
        {{ remeberPSD ? 'Forget Password' : 'Remeber Password' }}
      </div>
      <div class="btn">Confirm</div>
      <div class="tip">
        <div @click="showBox = 'register'">Register</div>
        <div>Retrieve</div>
      </div>
    </div>

    <div :class="`register ${showBox === 'register' && 'show'}`">
      <div class="title">Register</div>
      <input-with-enter v-model="register.accout" type="text" placeholder="Please input your accout" />
      <input-with-enter v-model="register.password" type="password" placeholder="Please input your password" />
      <input-with-enter v-model="register.rePassword" type="password" placeholder="Please repeat your password" />
      <input-with-enter v-model="register.mail" type="text" placeholder="Please repeat your E-mail" />
      <div class="btn">Get verification code</div>
      <input-with-enter v-model="register.regCode" type="text" placeholder="Please input your code" />
      <div class="btn">Confirm</div>
    </div>
  </div>
</template>

<script>
// import md5 from 'MD5'

export default {
  name: 'LoginRegister',
  data () {
    return {
      // show box | login or register
      showBox: '',
      // login request params
      login: {
        accout: '',
        password: ''
      },
      // remeber password status
      remeberPSD: false,
      // register requst params
      register: {
        accout: '',
        password: '',
        rePassword: '',
        mail: '',
        regCode: ''
      }
    }
  }
}
</script>

<style lang="less">
@import url('../../../assets/style/index.less');

#login-register {
  position: relative;
  color: @TC;
  width: 30px;
  height: 30px;

  .active {
    &:active {
      color: @TC;
    }
  }

  .hover {
    &:hover {
      .SBS(fade(@BSC, 80));
    }
  }

  .show {
    position: absolute !important;
    transform: translate(47%) !important;
  }

  .title {
    height: 30px;
    text-align: center;
    line-height: 30px;
  }

  .btn {
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 5px 0px;
    cursor: pointer;
    .SBS(fade(@BSC, 60));
    .STS(@TC);
    .active;
    .hover;
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

  .login, .register {
    position: fixed;
    width: 250px;
    border-radius: 15px;
    top: 50px;
    right: 0%;
    transform: translate(105%);
    overflow: hidden;
    transition: all 0.3s;
    .SBS(fade(@BSC, 60));
    .hover;

    .input-with-enter {
      margin-bottom: 5px;
      .hover;
    }
  }

  .login {

    .remeber-psd, .tip {
      height: 20px;
      line-height: 20px;
      font-size: @LTFS;
      text-align: center;
      cursor: pointer;
    }

    .tip {
      display: flex;
      flex-direction: row;

      div {
        flex: 1;
        .STS(@TC);
        .active;
      }
    }
  }
}
</style>
