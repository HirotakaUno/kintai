<template>
  <v-navigation-drawer v-model="ctrl" app temporary>
    <v-list >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="action(item.title)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop ,Vue } from "vue-property-decorator";

@Component
export default class Drawer extends Vue {
  
  @Prop()
  private drawer? = null;

  private items = [
          { title: 'Home', icon: 'dashboard' },
          { title: 'Setting', icon: 'settings' },
        ];

  get ctrl(){
    return this.drawer;
  }

  set ctrl(value){
    this.$emit('update:drawer', value)
  }

  private action(title: string){
    if(title === 'Home'){
      this.$router.push("/");
    }else if(title === 'Setting'){
      this.$router.push("/setting");
    }
  }

}
</script>

<style>

</style>