<template>
  <div>
    <van-nav-bar title="登录" fixed>
      <!-- <van-icon name="cross" slot="left" /> -->
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <div class="top">
      <van-form @submit="onSubmit" ref="form">
        <van-field
          v-model.trim="mobile"
          name="mobile"
          placeholder="手机号"
          :rules="[
            { required: true, message: '请输入手机号' },
            {
              pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
              message: '手机格式不正确',
            },
          ]"
        >
          <i class="toutiao toutiao-shouji" slot="left-icon"></i>
        </van-field>

        <van-field
          v-model.trim="code"
          type="password"
          name="code"
          placeholder="验证码"
          :rules="[
            { required: true, message: '请填写验证码' },
            {
              pattern: /^\d{6}$/,
              message: '验证码格式有误',
            },
          ]"
        >
          <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
          <template #button>
            <van-count-down
              v-if="isCountDownShow"
              :time="time"
              format="ss s"
              @finish="isCountDownShow = false"
            />
            <van-button
              v-else
              @click="onSendSms"
              size="small"
              native-type="button"
              class="yzm"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button block native-type="submit" class="login-btn"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/User'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111',
      code: '246810',
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('成功')
        } catch (err) {
          this.$toast.fail('111失败')
        }
      } catch (err) {
        // this.$notify({ type: 'warning', message: err.message })
        this.$toast.fail(err.message)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.top {
  margin-top: 1.22667rem;
  margin-bottom: 50px;
}
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.95;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #fff;
  font-size: 30px;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
.yzm {
  position: fixed;
  right: 10px;
}
</style>
