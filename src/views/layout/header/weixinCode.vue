<template>
  <div id="weixin-code">
    <div class="small-photo">
      <img class="photo" src="../../../assets/img/jm.jpg" @click="$router.push('/home/frontCover')" />
      <img class="qr-code" src="../../../assets/img/qrCode.png" @click="largeCardStatus = !largeCardStatus" />
    </div>

    <div :class="`large-card ${largeCardStatus && 'show-large-card'}`">
      <img class="card-photo" src="../../../assets/img/jm.jpg" >
      <img class="card-qr-code" src="../../../assets/img/qrCode.png" />
      <div class="info">Te: 15565769752</div>
      <div class="info">E-mail: 15565769752</div>
      <div class="info">Welcome to contact me</div>
      <div class="close-btn" @click="largeCardStatus = false"><i class="jm-fork" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeixinCode',
  data () {
    return {
      largeCardStatus: false
    }
  }
}
</script>

<style lang="less">
@import url('../../../assets/style/index.less');

#weixin-code {
  position: relative;
  color: @TC;

  .show-large-card {
    visibility: visible !important;
    opacity: 1 !important;
    transform: rotate(0deg) !important;
  }

  .small-photo {
    height: 65px;

    &:hover {
      .qr-code {
        visibility: visible;
      }
    }

    .photo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-top: 5px;
      .SBS(fade(@BSC, 60));
      cursor: pointer;
    }

    .qr-code {
      visibility: hidden;
      position: absolute;
      width: 100px;
      height: 100px;
      top: 65px;
      left: -25px;
      cursor: pointer;
      .SBS(fade(@BSC, 60));
    }
  }

  .large-card {
    visibility: hidden;
    opacity: 0;
    transform: rotate(-360deg);
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -100px;
    width: 200px;
    height: 300px;
    border-radius: 15px;
    overflow: hidden;
    transition: all 0.3s ease;
    z-index: 9;
    .SBS(fade(@BSC, 60));

    &:hover {
      .SBS(fade(@BSC, 80));
    }

    .card-photo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-top: 5px;
      margin-left: 50%;
      transform: translate(-50%);
      .SBS(fade(@BSC, 60));
    }

    .card-qr-code {
      margin-top: 5px;
      width: 150px;
      height: 150px;
      margin-left: 25px;
      margin-bottom: 5px;
      background-color: fade(@QRCBC, 50);
      .SBS(fade(@BSC, 60));
    }

    .info {
      font-size: @WXCFS;
      text-align: center;
      line-height: 17px;
      cursor: default;
      .STS(@TC);
    }

    .close-btn {
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
      .STS(@TC);
      .SBS(fade(@BSC, 60));

      &:active {
        color: @TC;
      }
    }
  }
}
</style>
