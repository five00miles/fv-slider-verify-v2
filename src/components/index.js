import FvSliderVerify from './FvSliderVerify/index.vue';

const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component(FvSliderVerify.name, FvSliderVerify);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { install };

export default {
  install,
};
