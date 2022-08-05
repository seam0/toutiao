<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar left-text="返回" left-arrow fixed placeholder>
      <template v-slot:left>
        <div style="color: #fff">IT头条</div>
      </template>
      <template #right>
        <van-icon color="#fff" size="0.7rem" name="search" />
      </template>
    </van-nav-bar>
    <!-- 顶部导航 -->
    <!-- 标签页 -->
    <van-tabs
      v-model="activeName"
      sticky
      offset-top="1.23rem"
    >
      <van-tab
        v-for="item in userChannels"
        :key="item.id"
        :title="item.name"
        :name="item.id"
      >
        <!-- 文章列表 -->
        <article-list :id="item.id"></article-list>
        <!-- 文章列表 -->
      </van-tab>
    </van-tabs>
    <!-- 标签页 -->
  </div>
</template>

<script>
import { getUserChannelsAPI } from '@/api/index'
import { getToken } from '@/utils/token'
import articleList from './components/articleList.vue'
export default {
  components: {
    articleList
  },
  data () {
    return {
      activeName: 0,
      userChannels: [], // 存放用户频道列表数据
      articleList: [] // 存放文章列表数据
    }
  },
  async created () {
    const token = await getToken()
    // 获取用户频道列表的方法
    const { data } = await getUserChannelsAPI(token)
    this.userChannels = data.data.channels
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  background-color: #1989fa;
}
</style>
