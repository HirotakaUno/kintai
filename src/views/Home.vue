<template>
  <v-app class="home">
    <Drawer :drawer.sync="drawer"></Drawer>
    <v-app-bar app clipped-lef>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>kintai</v-toolbar-title>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component , Vue } from 'vue-property-decorator';
import Drawer from "@/components/drawer.vue"

@Component({
  components: {
    Drawer
  }
})
export default class Home extends Vue{
  private drawer? = null;
}
</script>
