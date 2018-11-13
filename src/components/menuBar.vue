<template>
  <div class="menu-bar">
    <template v-if="navBar.length">
      <div class="menu-item" v-for="menu in navBar" :key="`${menu.title}:${menu.target}`">
        <div class="menu-title">
          <i :class="`${menu.icon} title-icon`" v-if="menu.icon" />{{ menu.title }}
        </div>

        <div class="menu-children" v-if="menu.children && menu.children.length">
          <div class="children-item" v-for="child in menu.children" :key="child.title">
            <i :class="`${child.icon} title-icon`" v-if="child.icon" />{{ child.title }}
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="menu-item"><div class="menu-title disabled">Unavailable</div></div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuBar',
  props: ['navBar'],
  data () {
    return {}
  }
}
</script>

<style lang="less">
@import url('../assets/style/index.less');

.menu-bar {
  display: flex;
  flex-direction: row;
  color: @TC;
  line-height: 30px;
  text-align: center;
  font-size: @NBFS;

  .title-icon {
    position: absolute;
    font-size: 20px;
    left: -25px;
    transition: all 0.3s;
  }

  .title-icon-hover {
    &:hover {
      .title-icon {
        left: 10px;
        color: @TC;
      }
    }
  }

  .hover {
    .SBS(fade(@BSC, 80));
  }

  .active (@color: @TC) {
    &:active {
      color: @color;
    }
  }

  .disabled {
    color: fade(@TC, 30);
    text-shadow: 0 0 0px !important;
    cursor: default !important;

    &:hover {
      color: fade(@TC, 30) !important;
    }
  }

  .menu-item {
    width: 150px;
    height: 40px;
    margin: 0 5px;

    &:hover {
      .menu-title, .menu-children {
        .hover
      }

      .menu-children {
        visibility: visible;
      }
    }

    .menu-title {
      position: relative;
      height: 30px;
      border-radius: 15px;
      overflow: hidden;
      cursor: pointer;
      .SBS(fade(@BSC, 60));
      .STS(@TC);
      .active;
      .title-icon-hover;
    }

    .menu-children {
      margin-top: 10px;
      border-radius: 15px;
      overflow: hidden;
      visibility: hidden;
      .SBS(fade(@BSC, 60));

      .children-item {
        position: relative;
        cursor: pointer;
        .active(#fff);
        .title-icon-hover;

        &:hover {
          .hover
        }
      }
    }
  }
}
</style>
