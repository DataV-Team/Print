<template>
  <div class="input-with-enter">
    <input :type="type"
      :disabled="disabled"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      @dblclick="$emit('input', '')"
      @keyup.enter="$emit('enter')" />
  </div>
</template>

<script>
export default {
  name: 'InputWithEnter',
  props: ['value', 'type', 'disabled', 'placeholder']
}
</script>

<style lang="less">
@import url('../assets/style/index.less');

.input-with-enter {
  .SBS(fade(@BSC, 60));
}
</style>
