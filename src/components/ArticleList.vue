<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          :title="item.title"
          value="内容1"
          label="描述信息1"
          v-for="(item, index) in ArticleList"
          :key="index"
        /> -->
        <ArticleItem
          v-for="(item, index) in ArticleList"
          :key="index"
          :article="item"
        >
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api/home'
let ele = null
let scollTop = 0
export default {
  name: 'Article',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
    // console.log(this.id)
    // console.log(this.timestamp)
  },
  mounted () {
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      scollTop = this.scrollTop
      // console.log(this.scrollTop)
    })
  },
  activated () {
    ele.scrollTop = scollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      ArticleList: [],
      loading: false,
      finished: false,
      refreshing: false

    }
  },
  methods: {
    async getArticleList () {
      if (this.refreshing) {
        this.ArticleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        // console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.ArticleList.push(...res.data.data.results)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      this.finished = false
      this.loading = true
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
/deep/.van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
