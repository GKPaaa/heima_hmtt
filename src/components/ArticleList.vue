<template>
  <van-cell-group>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          :title="item.title"
          value="内容1"
          label="描述信息1"
          v-for="(item, index) in ArticleList"
          :key="index"
        />
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import { getArticleList } from '@/api/home'
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
    console.log(this.id)
    console.log(this.timestamp)
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
        console.log(res)
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
  components: {}
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
