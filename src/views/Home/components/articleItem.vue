<template>
  <div class="articleItem">
    <!-- 弹出组件面板 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      :cancel-text="cancel"
      @select="onSelect"
      @cancel="onCancel"
      @close="onClose"
    />
    <!-- 弹出组件面板 -->
    <van-cell-group>
      <van-cell>
        <template #title>
          <div class="artTitle">
            <div class="title">{{ artObj.title }}</div>
            <img
              v-if="artObj.cover.type === 1"
              :src="artObj.cover.images[0]"
              alt=""
            />
          </div>
          <div class="imgs" v-if="artObj.cover.type > 1">
            <img
              :src="img"
              alt=""
              v-for="img in artObj.cover.images"
              :key="img.index"
            />
          </div>
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #label>
          <div class="box">
            <div class="left">
              <span> {{ artObj.aut_name }}</span>
              <span> {{ artObj.comm_count }}评论</span>
              <span> {{ setTimeAgo(artObj.pubdate) }}</span>
            </div>
            <div class="right">
              <van-icon name="cross" @click="show = true" />
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date.js'
import { firstActions, secondActions } from '@/api/reports.js'
export default {
  props: {
    artObj: { Array, Object }
  },
  data () {
    return {
      show: false,
      cancel: '取消',
      actions: firstActions
    }
  },
  methods: {
    setTimeAgo: timeAgo,
    onSelect (item) {
      if (item.name === '举报') {
        this.actions = secondActions
        this.cancel = '返回'
      } else if (item.name === '不感兴趣') {
        // 将id传递给父组件
        this.$emit('dislikeId', this.artObj.art_id)
        // 关闭弹窗
        this.show = false
      } else {
        // 二级菜单
        console.log(item)
        this.show = false
        // 将文章ID以及举报类型传递给父组件
        this.$emit('report', [{ type: item.value }, { id: this.artObj.art_id }])
      }
    },
    // 点击取消按钮时触发
    onCancel () {
      if (this.cancel === '返回') {
        this.show = true
        this.actions = firstActions
        this.cancel = '取消'
      }
    },
    // 关闭面板时触发
    onClose () {
    // 关闭面板时将一级菜单返回原来的数据
      this.actions = firstActions
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-cell {
  text-align: left;
}
.artTitle {
  display: flex;
  justify-content: space-between;
}
img {
  width: 2.5rem;
  height: 1.5rem;
}
.imgs {
  display: flex;
  justify-content: space-around;
}
.box {
  display: flex;
  justify-content: space-between;
}
</style>
