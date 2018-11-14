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
  box-shadow: 0 0 3px green;
}
</style>
