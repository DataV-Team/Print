<template>
  <div id="middle-content">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style lang="less">
#middle-content {
  flex: 1;
  height: 100%;
}
</style>
