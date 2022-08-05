<!-- 文章列表组件 -->
<template>
  <van-list
    class="artcleList"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 文章列表中的每一项 -->
      <ArticleItem
        v-for="obj in list"
        :key="obj.art_id"
        :artObj="obj"
        @dislikeId = "dislikeIdFn"
        @report = "reportFn"
      ></ArticleItem>
      <!-- 文章列表中的每一项 -->
    </van-pull-refresh>
  </van-list>
</template>
<!-- 文章列表组件 -->
<script>
import { getArticleListAPI, disLikeAticleAPI, reportAticleAPI } from '@/api/index'
import ArticleItem from './articleItem.vue'
import { getToken } from '@/utils/token'
export default {
  props: { id: Number },
  data () {
    return {
      list: [], // 数据列表
      loading: false, // 是否处于加载状态
      finished: false, // 是否加载完成
      timestamp: Date.parse(new Date()), // 用于分页的时间戳
      isLoading: false
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    // 获取文章列表
    async getArticleList (id, timestamp, isLoading) {
      const data = await getArticleListAPI(id, timestamp)
      // 首先判断请求回来的数据是否为最后一页，如果数组为零，说明没有数据了
      if (data.data.data.results.length < 10) {
        // 关闭加载状态
        this.loading = false
        // 将是否加载完成状态设置为true
        this.finished = true
        return
      }
      // 还有数据，将list中原有数据和新页数据合并起来存入data
      this.list = [...this.list, ...data.data.data.results]
      // 更换上一页时间戳，请求下一页数据
      this.timestamp = isLoading || data.data.data.pre_timestamp
      // 关闭加载状态
      this.loading = false
    },
    // 上拉加载更多
    onLoad () {
      if (this.list.length === 0) {
        return
      }
      this.getArticleList(this.id, this.timestamp)
    },
    // 下拉刷新
    async onRefresh () {
      this.isLoading = true
      // 清空列表数据
      this.list = []
      // 重新加载数据
      await this.getArticleList(this.id, Date.parse(new Date()))
      this.isLoading = false
    },
    // 不感兴趣
    async dislikeIdFn (id) {
      const token = getToken()
      // 接收用户点击传递过来的不感兴趣信息
      await disLikeAticleAPI(id, token)
      // 请求接口后反馈信息给用户
      this.$notify({ type: 'success', message: '操作成功' })
    },
    // 举办
    async reportFn (value) {
      console.log(value)
      const token = getToken()
      await reportAticleAPI(value[1].id, value[0].type, 'jubao', token)
      this.$notify({ type: 'success', message: '举报成功' })
    }
  },
  created () {
    // 页面刚创建时请求列表数据回写
    this.getArticleList(this.id, this.timestamp)
  }
}
</script>

<style lang="less" scoped>
.artcleList {
  width: 100%;
  box-sizing: border-box;
  // border: 1px solid red;
  padding-bottom: 1.25rem;
}
</style>
