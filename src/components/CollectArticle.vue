<template>
  <van-loading v-if="isLoading" size=".53333rem"></van-loading>
  <van-icon
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onClick"
    v-else
  />
</template>

<script>
import { delCollect, addCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }

  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      if (this.is_collected) {
        try {
          await delCollect(this.$route.params.article_id)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addCollect(this.$route.params.article_id)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      }
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
