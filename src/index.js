import Stage from './components/stage';
import ImageView from './components/imageView';
import stageView from './components/stageView';
import imgViewer from 'hexdo/lib/img-viewer'
import 'hexdo/lib/img-viewer/style.css'
import popup from 'hexdo/lib/popup'
import 'hexdo/lib/popup/style.css'

const Components = {
  Stage,
  ImageView,
  imgViewer,
  popup,
  stageView
};

const install = function(Vue, opts = {}) {
  Object.keys(Components).forEach((key) => {
    Vue.component(Components[key].name || key, Components[key]);
  });
};

// auto install
if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = Object.assign(Components, {install});   // eslint-disable-line no-undef
