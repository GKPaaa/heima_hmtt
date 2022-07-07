<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          size="small"
          round
          type="danger"
          plain
          @click="isShow = !isShow"
          >{{ isShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            class="inner"
            @click="onClick(index)"
            :style="{ color: active === index ? 'red' : '' }"
          >
            {{ item.name }}
            <van-icon
              @click="onClick(index)"
              name="close"
              v-if="index !== 0"
              :style="{ color: active === index ? 'red' : '' }"
              v-show="isShow"
            />
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendList" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            + {{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
import { saveChannels } from '@/api/home'
const CHANNELS = 'CHANNELS'
export default {
  props: {
    channels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    },
    allArticleList: {
      type: Array,
      require: true
    }
  },
  created () {
    this.recommendList = this.allArticleList.filter(item => this.channels.every(item1 => item1.id !== item.id))
  },
  data () {
    return {
      recommendList: [],
      isShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommendList.findIndex((item) => item.id === id)
      this.channels.push(this.recommendList[index])
      this.recommendList.splice(index, 1)
    },
    onClick (index) {
      if (this.isShow) {
        if (index === 0) return
        // 删除时间
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendList.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 切换高亮active
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) { // 登陆后
          // console.log('231')
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          // console.log(arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else { // 没有登录
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
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
  position: relative;
  .van-icon-close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
}
</style>
