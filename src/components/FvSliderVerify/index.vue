<template>
  <transition name="el-fade-in-linear">
    <div v-if="visible" :class="['container', customClass]">
      <div class="verify-wrapper" v-loading="loading">
        <p class="title"><span>拖动下方滑块完成拼图</span><i class="el-icon-circle-close" @click="handleClose"></i></p>
        <div class="verify">
          <div class="verify--canvas" ref="canvas" :style="{ width: `${width}px`, height: `${height}px` }">
            <canvas ref="bgCanvas" v-show="!loading"></canvas>
            <canvas v-show="!loading" class="block-canvas" ref="blockCanvas" @mousedown.prevent="(e) => drag(e, 'blockCanvas', 'circle')"></canvas>
          </div>

          <div class="verify--slider">
            <div class="circle" ref="circle" @mousedown.prevent="(e) => drag(e, 'circle', 'blockCanvas')">
              <div class="arrow" :class="{ 'is-touch': isTouch }"></div>
            </div>
          </div>

          <div class="verify--operational">
            <i class="el-icon-refresh-right" @click="handleRefresh"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
const l = 42; // 滑块边长
const r = 9; // 滑块圆半径
const PI = Math.PI;
const L = l + r * 2 + 3; // 滑块实际边长

const Y = 70; // 滑块Y轴距离

export default {
  name: 'FvSliderVerify',
  props: {
    customClass: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 180,
    },
    // 完整的图片资源路径
    imgsFullPaths: {
      type: Array,
      required: true,
      default: () => [],
    },
    errImgPath: {
      type: String,
      default:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUYAAADMBAMAAAD9pRfJAAAAG1BMVEXMzMyWlpa3t7eqqqqjo6OcnJyxsbHFxcW+vr5pfZwxAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACkklEQVR4nO3YvW/UMBjHcffekvHMNVfGnhBipUXsvUqFlSzAyEkg1px4KWOZ+Ldx4sc+J47ogHiuSN/PkudyHn5KbMe2MQAAAAAAAAAAAAAAAAAAAAAAAAAA/K0nN9X1sTPc45N1Hvn69rYxxctVUjjfb6pXjRk0UPXVdp53P6xdmo09TQpjvrR/n0rI5L6i2mdchQgTKxl9YUrf4L3pN9A0s+JcIuxDRl+Yn/L/nek10LQLGd9IhG3I6Isi/P/O9BooaiO8bX7sZNS4i5WMUrjnXH0unoZc8b6iheuJbjgUta18hMqufqXFxtord9nGziD3FZ3IiP5mbdNFsNWdSYvaP7RZ7AxyX9HGPz/jBusHH+HMmKSYyNX1icfpfU0XYfauu1caxncspmHmvPCzU2ygSF5hm2HZ/azCfV+c+D5gjJtx0vuKivCY3DR41kVYh4xruS2Z5n6GjA30TOKr23cvXXrdodjJB6h96edpAz2L8P1wL3XdRZAREYrYXyf+iR9hyExDd3PvcmX8kkEy+mIbnltpZVAttTPGr7V8PLKMdXhuhR9dZBw1TzJWYxkPmaxMTmS8J6Mdy/gA3vUsjut+tP8q4wOYe6ZxDveyjPkcrp5xMVjGZBnzb6F6xjKuKRYvLscy5msK9YxFXJuFNcUgY742U894GBM7WZsNMuZrXP2Mob8Np5ZQlNleQT/jXgbNPOxnBhnzPZd+xqnfWBfbsC8cZsz2rvoZ2zOA6+4MYN2LEIv2DOBZegagn7F9Tt7VeMZCzqzinvYIGRdh1dOMZ8zPpPQzhkOp1/0IhyzZ2Z5+RFNu2whxy5plzM9Ij6D8WFeXzR8apGfNAAAAAAAAAAAAAAAAAAAAAAAAAPBv/QaZO2i/1ArspAAAAABJRU5ErkJggg==',
    },
    // 失败之后是否自动刷新
    isFailReset: {
      type: Boolean,
      default: false,
    },
    resetDelayTime: {
      type: Number,
      default: 1500,
    },
    successMsg: {
      type: String,
      default: '验证通过',
    },
    failMsg: {
      type: String,
      default: '请正确拼合图像',
    },
  },
  data() {
    return {
      eventLock: false, // 锁住事件，除了关闭，不让操作其他的事件
      blkTilesW: null,
      isTouch: false,
      bgRandom: 0,
      loading: false,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.initCanvas();
        });
      }
    },
  },
  beforeDestroy() {
    if (this.failTimer) clearTimeout(this.failTimer);
  },
  methods: {
    initCanvas() {
      this.loading = true;

      const bgCanvas = this.$refs.bgCanvas;
      const bgCtx = bgCanvas.getContext('2d');

      const block_canvas = this.$refs.blockCanvas;
      const blockCtx = block_canvas.getContext('2d');

      const random = (max, min) => {
        return Math.floor(Math.random() * (min - max) + max);
      };

      const bgRandom = random(0, this.imgsFullPaths.length);
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = this.imgsFullPaths[bgRandom];
      img.onerror = () => {
        img.src = this.errImgPath;
      };
      const width = this.width;
      const height = this.height;

      /**
       * 滑块随机受控图形区间内 x轴
       * L + 10 滑块边长 + 10px间隙
       */
      const blkTilesW = random(L + 10, width - (L + 10));
      this.blkTilesW = blkTilesW;

      bgCanvas.width = width;
      bgCanvas.height = height;
      block_canvas.width = width;
      block_canvas.height = height;

      img.onload = () => {
        this.loading = false;

        this.draw(bgCtx, { x: blkTilesW, y: Y, r: r }, 'fill');
        this.draw(blockCtx, { x: blkTilesW, y: Y, r: r }, 'clip');

        bgCtx.drawImage(img, 1, 1, width, height);
        blockCtx.drawImage(img, 0, 0, width, height);

        // 提取滑块放至左侧 并重置滑块画布宽度
        const y = Y - r * 2 - 1;
        const ImageData = blockCtx.getImageData(blkTilesW - 3, y, L, L);
        block_canvas.width = L;
        blockCtx.putImageData(ImageData, 0, y);
      };

      this.$refs.circle.style.left = 0;
      this.$refs.blockCanvas.style.left = 0;
    },
    drag(event, targetId, linkageId) {
      if (this.eventLock) return;

      this.isTouch = true;
      const targetDom = this.$refs[targetId];
      const linkageDom = this.$refs[linkageId];

      let x = 0;
      const move = (moveEV) => {
        x = moveEV.x - event.x;
        /**
         * 滑块拖动限定
         *
         */
        if (x >= this.width - L || x <= -2) return false;
        targetDom.style.left = x + 'px';
        linkageDom.style.left = x + 'px';
      };

      const up = () => {
        this.isTouch = false;
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);

        document.removeEventListener('touchmove', move);
        document.removeEventListener('touchend', up);

        // 图块契合度 左右5 偏差
        const intervalMax = this.blkTilesW + 5;
        const intervalMin = this.blkTilesW - 5;

        let isSuccess = false;

        if (x >= intervalMin && x <= intervalMax) {
          isSuccess = true;
          this.eventLock = true;
          this.$emit('success');
        } else {
          isSuccess = false;
          this.$emit('fail');
        }

        this.loadingInstance = this.$loading({
          target: this.$refs.canvas,
          text: isSuccess ? this.successMsg : this.failMsg,
          spinner: isSuccess ? 'el-icon-check' : 'el-icon-close',
        });
        if (!isSuccess) {
          if (!this.isFailReset) {
            this.failTimer = setTimeout(() => {
              this.reset();
            }, this.resetDelayTime);
          }
        }
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    },
    draw(ctx, xy, type) {
      const x = xy.x,
        y = xy.y;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
      ctx.lineTo(x + l, y);
      ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
      ctx.lineTo(x + l, y + l);
      ctx.lineTo(x, y + l);
      ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
      ctx.lineTo(x, y);
      ctx.lineWidth = 1;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.stroke();
      ctx.globalCompositeOperation = 'destination-over';
      type === 'fill' ? ctx.fill() : ctx.clip();
    },
    handleClose() {
      if (this.eventLock) return;

      this.$emit('update:visible', false);
      this.reset();
    },
    handleRefresh() {
      if (this.eventLock) return;

      this.reset();
      this.$emit('reload');
    },
    reset() {
      if (this.loadingInstance) this.loadingInstance.close();

      this.eventLock = false;
      if (this.failTimer) clearTimeout(this.failTimer);
      this.failTimer = null;

      this.initCanvas();
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(0 0 0 / 50%);

  &::v-deep {
    .el-loading-text {
      font-weight: bold;
    }

    .el-icon-close {
      margin-bottom: 16px;
      font-size: 50px;
      font-weight: bold;
      color: #f56c6c;
    }

    .el-icon-check {
      margin-bottom: 16px;
      font-size: 30px;
      font-weight: bold;
      color: #5cb87a;
    }
  }

  .verify-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    overflow: hidden;
    padding: 24px;
    background-color: #fff;

    .title {
      display: flex;
      justify-content: space-between;
      padding: 0;
      margin: 0 0 16px;
      line-height: 1;
      font-size: 18px;
      color: #333;
    }

    .verify {
      position: relative;

      &--canvas {
        position: relative;
        line-height: 0;

        .block-canvas {
          position: absolute;
          left: 0;
          cursor: pointer;
        }
      }

      &--slider {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 28px;
        width: 100%;
        height: 16px;
        background: #e3e3e3;
        border-radius: 11px;

        .circle {
          position: absolute;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          cursor: pointer;

          .verticals {
            display: flex;
            align-items: center;

            img {
              width: 8px;
              height: 16px;
            }
          }

          .arrow {
            width: 64px;
            height: 32px;
            background: #3860f4;
            border-radius: 16px;
            box-shadow: 0 0 6px 0 #486ae6;

            &.is-touch {
              transition: transform 0.1s;
              transform: scale(1.1);
            }
          }
        }
      }

      &--operational {
        display: flex;
        justify-content: flex-end;
        margin: 24px 0 3px;
      }
    }
  }
}

.el-icon-refresh-right,
.el-icon-circle-close {
  color: #a1a7bb;
  cursor: pointer;
}
</style>
