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

# fv-slider-verify 验证插件

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
    // 绝对路径的图片地址URL
    // 例如 http://www.xxx.com/static/
    imgsPath: {
      type: String,
      default: '',
    },
    // 图片名字
    // pic.png
    imgsName: {
      type: Array,
      default: () => [],
    },
    failLock: {
      type: Boolean,
      default: false,
    },
    successMsg: {
      type: String,
      default: '验证通过',
    },
    failMsg: {
      type: String,
      default: '请正确拼合图像',
    },

| prop 参数  | 默认值         | 描述                                                                                                                                        |
| ---------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| visible    | false          | 是否显示                                                                                                                                    |
| width      | 300px          | 图片宽度                                                                                                                                    |
| height     | 180px          | 图片高度                                                                                                                                    |
| imgsPath   | ''             | 图片的 url 地址前缀，不要加上图片名，例如 http://www.xxx.com/static/                                                                        |
| imgsName   | []             | 图片名字数组，例如['pic1.png','pic2.png']，如果为空数组，则取内部预置的图片，如果不为空数组，则从当前插件 js 文件下的 images 文件夹下取图片 |
| failLock   | false          | 失败之后，要不要锁定自动刷新，如果事 true，则需要手动执行 reset 方法                                                                        |
| successMsg | 验证通过       | 成功文案                                                                                                                                    |
| failMsg    | 请正确拼合图像 | 失败文案                                                                                                                                    |
