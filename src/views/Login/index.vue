<template>
  <div class="login-container">
    <!-- nav-bar -->
    <van-nav-bar title="登录" />
    <!-- nav-bar -->
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号'},{pattern: /^1[3456789]\d{9}$/ , message:'手机号格式不正确'}]"
      />
      <van-field
        v-model="user.code"
        center
        clearable
        label="短信验证码"
        name="code"
        placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '请填写验证码'},{pattern: /^[0-9]{6}/,message:'验证码格式不正确'}]"
      >
      </van-field>
      <div style="margin: 16px">
        <van-button :disabled="loadingStatus" :loading="loadingStatus" text="登录" loading-text="登录" type="info" >登录</van-button>
      </div>
    </van-form>
    <!-- 表单 -->
  </div>
</template>

<script>
import { loginAPI } from '@/api/index'
import { setToken } from '@/utils/token'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      loadingStatus: false // 控制loading加载状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit (values) {
      try {
        // 表单验证通过后，发起登录请求
        // 展示登录状态
        this.loadingStatus = true
        const { data } = await loginAPI(values)
        // 请求成功后，将token存入本地
        setToken(data.data.token)
        // 提示登录成功
        await this.$toast.success('登录成功！')
        // 跳转到layout页面
        await this.$router.replace({
          path: '/layout/home'
        })
      } catch (err) {
        // 提示登录失败
        this.$toast.fail('登录失败！')
      } finally {
        this.loadingStatus = false
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-nav-bar__content {
  background-color: #2778fe;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-button{
  width: 7.5rem;
  height: 1rem;
  border-radius: .25rem;
}
</style>
