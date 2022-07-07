<template>
  <div>
    <div class="top">
      <van-nav-bar fixed>
        <template #title
          ><van-button
            type="default"
            icon="search"
            class="search-btn"
            to="/search"
            >搜索</van-button
          ></template
        >
      </van-nav-bar>
    </div>

    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in MyChannels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="menu" @click="isChannelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelShow"
      position="bottom"
      :style="{ height: '98%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPanel
        :channels="MyChannels"
        :active="active"
        :allArticleList="allArticleList"
        @change-active="
          active = $event;
          isChannelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel
    ></van-popup>
  </div>
</template>

<script>
import { getMyChannels, getAllArticleList } from '@/api/home'
import { getItem } from '@/utils/storage'
import ChannelPanel from '@/views/Home/compoents/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  async created () {
    this.getMyChannels()
    this.getAllArticleList()
  },
  data () {
    return {
      active: 0,
      MyChannels: [],
      isChannelShow: false,
      allArticleList: []
    }
  },
  methods: {
    async getMyChannels () {
      const channels = getItem(CHANNELS)

      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.MyChannels = channels
      } else {
        try {
          const res = await getMyChannels()
          // console.log(res)
          this.MyChannels = res.data.data.channels
          // console.log(this.MyChannels)
        } catch (err) {
          console.log(err)
        }
      }
    },
    async getAllArticleList () {
      try {
        const res = await getAllArticleList()
        // console.log('123')
        this.allArticleList = res.data.data.channels
        console.log(this.allArticleList)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {

  },

  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang='less'>
.top {
  .search-btn {
    width: 555px;
    height: 64px;
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 32px;
  }
}

/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid black;
}
/deep/ .van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: blue;
}
.menu {
  min-width: 100px;
  background: rgba(255, 255, 255, 0.9);
  height: 82px;
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  background: rgba(255, 255, 255, 0.9);
  height: 82px;
}
/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 90px;
  z-index: 99;
  border-bottom: 1px solid #000;
}
</style>
