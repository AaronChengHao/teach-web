<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getRole } from '@/utils/auth'
export default {
  name: 'App',
  created() {
    this.$router.options.routes.map((route) => {
      let role = getRole()
      if (role === 'student' && route.role === 's') {
        route.hidden = false
      }
      if (role === 'teacher' && route.role === 't') {
        route.hidden = false
      }
    })
  }
}
</script>
