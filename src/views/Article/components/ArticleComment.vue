<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="item in commentList"
        :key="item.com_id"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>

      <!-- <van-cell v-for="item in commentList" :key="item.com_id">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">hello</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">
              {{ item.pubdate | dataformate }}
            </span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment'
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['a', 'c'].includes(value) // 只能用a或者c才能通过校验
      }
    },
    source: {
      type: [Number, String],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        offset: null,
        limit: 5,
        type: this.type,
        source: this.source

      },
      loading: false,
      finished: false
      // commentList: []
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        // 数据已全部加载完毕，则直接将finish设置为true即可，就不会再更新
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        // console.log(res)
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)
        // 本次返回的结果的最后一个评论id作为请求下一页数据的offset参数
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false // 每当当前页面数据拿回来。就让loading的转圈效果关闭
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommentList() // 到底触发。获取下一页的数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    CommentItem
  },
  mounted () {
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
