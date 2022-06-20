# fv-vue-cli

## 基本命令

```
npm install
npm run serve
npm run build
npm run lint
```

## 代码规范

vue-cli 自带的 eslint+prettier 再加上我自己配的 stylelint

## 版本注意事项

个人 node 版本 12.22.10 npm 6.14.16

## vue-cli 配置

See [Configuration Reference](https://cli.vuejs.org/config/).

## style

虽然配置了 less,scss,stylus 但开发只建议使用 scss,stylelint 只配置了 scss

## husky

commit 提交前会执行`npm run lint`检查代码

# 基于elementui的pc fv-slider-verify 验证插件

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

| prop 参数  | 默认值         | 描述                                                                                                                                        |
| ---------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| visible    | false          | 是否显示                                                                                                  |
| customClass    | ''          | class                                                                                                  |
| width      | 300px          | 图片宽度                                                                                                                                    |
| height     | 180px          | 图片高度                                                                                                                                    |
| imgsFullPaths   | []             | 图片地址，url地址或base64数组，如['http://xxx.com/a.png']       |
| errImgPath   | ''           | 加载失败图片地址，url地址或base64，如  http://xxx.com/error.png  |
| isFailReset   | false          | 失败之后，要不要锁定自动刷新，如果事 true，则需要手动执行 reset 方法                                                                        |
| successMsg | 验证通过       | 成功文案                                                                                                                                    |
| failMsg    | 请正确拼合图像 | 失败文案                                                                                                                                    |


回调方法
reload
success
fail

