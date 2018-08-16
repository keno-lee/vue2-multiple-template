<template>
  <div class="test1">this is {{ name }}!</div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'test1'
      }
    }
  }
</script>

<style lang="scss">
  .test1 {
    color: brown;
    text-align: center;
  }
</style>