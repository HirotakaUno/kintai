import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import ja from 'vuetify/src/locale/ja'

export default new Vuetify({
  lang: {
    locales: { ja },
    current: 'ja',
  },
});
