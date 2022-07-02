<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.back()"
        @search="onSearch"
        autofocus
        @focus="isSearch = false"
      />
    </form>
    <searchHistory v-if="searchText === ''" @search="onSearch"></searchHistory>

    <template v-else>
      <searchResult v-if="isSearch" :searchText="searchText"></searchResult>
      <searchSuggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></searchSuggest>
    </template>
  </div>
</template>

<script>
import searchHistory from './compoent/searchHistory.vue'
import searchSuggest from './compoent/searchSuggest.vue'
import searchResult from './compoent/searchResult.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false
    }
  },
  methods: {
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    searchSuggest,
    searchHistory,
    searchResult
  }
}
</script>

<style scoped lang='less'>
</style>
