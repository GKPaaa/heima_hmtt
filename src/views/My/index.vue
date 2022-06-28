<template>
  <div>
    <!-- 登录和登录做两个div，根据是否有token来决定显示哪一个。为了避免修改一个对另外产生影响，再设置另外不同的类名 -->
    <div class="header header-login" v-if="user && user.token">
      <!-- 这个来设置登录后的状态 -->
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userInfo.fans_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <div class="header header-notlogin" v-else>
      <!-- 这个来写未登录的状态 -->
      <div class="inner" @click="$router.push({ path: '/login' })">
        <img src="@/assets/1.jpg" />
        <p>登录/注册</p>
      </div>
    </div>
    <van-grid clickable :column-num="2">
      <van-grid-item icon="star-o" text="收藏">
        <template #icon>
          <van-icon name="star-o" color="hotpink" size="0.6rem" />
        </template>

        <template #text>
          <p style="font-size: 0.37rem">收藏</p>
        </template>
      </van-grid-item>
      <van-grid-item icon="underway-o" text="历史">
        <template #icon>
          <van-icon name="underway-o" color="gold" size="0.6rem" />
        </template>

        <template #text>
          <p style="font-size: 0.37rem">历史</p>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button
      type="default"
      size="large"
      class="logout"
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/User'
export default {
  name: 'MY',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        // console.log('res', res.data.data)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    logout () {
      Dialog.confirm({
        title: '标题',
        message: '弹窗内容'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  // background-image: ;
  background: rgb(50, 150, 250, 0.7) url("@/assets/3.jpg") no-repeat;
  background-size: cover;
  // background: cyan url("@/assets/3.png") no-repeat;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
    // display: block;
  }
  p {
    font-size: 28px;
    font-weight: 400;
    color: hotpink;
    padding: 0;
    margin: 0;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    padding-left: 32px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 55px;
    .button {
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      line-height: 33px;
      text-align: center;
      font-weight: 400;
      font-size: 20px;
      color: #666;
      background-color: #fff;
    }
    .left {
      // .van-image {
      //   vertical-align: middle;
      // }
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: 400;
        color: hotpink;
      }
    }
  }
  .list {
    display: flex;
    li {
      text-align: center;
      flex: 1;
      p {
        font-weight: 400;
        color: blue;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.van-cell-group {
  margin: 9px 0 3px 0;
}
.logout {
  color: red;
}
</style>
