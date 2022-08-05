<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar route >
      <van-tabbar-item to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/layout/my" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
    <!-- 底部导航 -->
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
