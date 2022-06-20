<template>
  <div class="home">
    <div style="position: relative; z-index: 9999">
      <el-button @click="isShowSelf = true">默认按钮</el-button>
      <el-button @click="$refs.fvSliderVerify.reset()">重置</el-button>
    </div>

    <FvSliderVerify
      ref="fvSliderVerify"
      :visible.sync="isShowSelf"
      :imgsFullPaths="['./images/0.png', './images/1.png']"
      :errImgPath="'./images/error.png'"
      :isFailReset="true"
      :width="width"
      :height="height"
      :success-msg="successMsg"
      :fail-msg="failMsg"
      @reload="reload"
      @success="success"
      @fail="fail"
    ></FvSliderVerify>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isShowSelf: false,
      width: 326,
      height: 204,
      imgsName: [],
      successMsg: '验证通过',
      failMsg: '请正确拼合图像',
    };
  },
  methods: {
    handlerClick() {
      console.log('handlerClick');
      this.isVerifyShow = true;
    },
    reload() {
      console.log('SliderVerify => reload');
    },
    show() {
      console.log('SliderVerify => show');
    },
    hide() {
      console.log('SliderVerify => close');
    },
    success() {
      console.log('SliderVerify => success');
    },
    fail() {
      console.log('SliderVerify => fail');
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: flex-end;
  width: 1200px;
}
</style>
