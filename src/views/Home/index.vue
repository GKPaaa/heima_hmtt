<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="hotpink"
      placeholder="搜索"
      input-align="center"
      left-icon
    />
    <template> <van-icon name="chat-o" /> </template>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return { value: '' }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/ .van-search {
  padding-left: 83px;
  padding-right: 112px;
}
</style>
