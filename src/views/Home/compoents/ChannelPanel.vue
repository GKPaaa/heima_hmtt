<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button size="small" round type="danger" plain>编辑</van-button>
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="index">
          <div class="inner">{{ item.name }}</div>
        </van-col>
      </van-row>
    </div>

    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6">
          <div class="inner">+123</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    channels: {
      type: Array,
      require: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 0 24px;
  margin-bottom: 16px;
  h3 {
    font-size: 32px;
    font-weight: 400;
    color: #333;
  }
  .van-button {
    width: 104px;
    height: 48px;
    border-radius: 20px;
  }
}
.inner {
  width: 160px;
  height: 86px;
  background: #f4f5f6;
  font-size: 28px;
  text-align: center;
  line-height: 86px;
  border-radius: 6px;
  color: #222;
  margin-left: 14px;
  margin-bottom: 22px;
}
</style>
