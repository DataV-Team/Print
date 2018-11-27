<template>
  <div :class="`loading ${mask && 'mask'}`">
    <div class="loading-animation-container">
      <svg width="100px" height="100px">
        <circle class="circle-one" />
        <circle class="circle-two" />
        <circle class="circle-thr" />
        <circle class="circle-center" />
        <circle class="circle-point" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['mask']
}
</script>

<style lang="less">
@import url('../assets/style/index.less');

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;

  &.mask {
    background-color: fade(gray, 30);
  }

  .loading-animation-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  circle {
    cx: 50;
    cy: 50;
    fill: transparent;
    stroke-width: 5px;
    transform-origin: center center;
    stroke-linecap: round;
    transform: rotate(0deg);
  }

  .circle-one {
    r: 45;
    stroke: @SOC;
    stroke-dasharray: 0 0 0 282;
    animation: circle-one 3s ease-in-out infinite;
  }

  .circle-two {
    r: 37;
    stroke: @STC;
    stroke-dasharray: 0 0 0 232;
    animation: circle-two 3s ease-in-out infinite;
  }

  .circle-thr {
    r: 29;
    stroke: @STHC;
    stroke-dasharray: 0 0 0 182;
    animation: circle-thr 3s ease-in-out infinite;
  }

  .circle-center {
    r: 15;
    stroke: @SOC;
    stroke-dasharray: 9.4;
    animation: circle-center 1.5s linear infinite;
  }

  .circle-point {
    r: 3;
    stroke: @SOC;
    animation: circle-center 1.5s linear infinite;
  }

  @keyframes circle-one {
    100% {
      stroke-dasharray: 0 282 282 0;
      transform: rotate(360deg);
    }
  }

  @keyframes circle-two {
    100% {
      stroke-dasharray: 0 232 232 0;
      transform: rotate(360deg);
    }
  }

  @keyframes circle-thr {
    100% {
      stroke-dasharray: 0 182 182 0;
      transform: rotate(360deg);
    }
  }

  @keyframes circle-center {
    33% {
      stroke: @STC;
    }
    66% {
      stroke: @STHC;
    }
    100% {
      stroke: @SOC;
      transform: rotate(360deg);
    }
  }
}
</style>
