<template>
  <div class="dashboard-container">
    <div class="dashboard-text" style="text-align: center;margin-top: 300px;">
      <span>欢迎</span>
      <span style="color: #409EFF">&nbsp;&nbsp;{{name}}&nbsp;</span>
      <span>登录 萝卜教学系统</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
