<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="youzan-shield" to="/home" size="40px"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="video" to="/video" size="40px"
        >视频</van-tabbar-item
      >
      <van-tabbar-item icon="chat" to="/question" size="40px"
        >问答</van-tabbar-item
      >
      <van-tabbar-item icon="manager" to="/my" size="40px"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return { active: 0 }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>

</style>
