<template>
  <v-content>
    <v-container class="grey lighten-5">
      <v-row dense>
        <template v-for=" ( value , key ) in items">
          <v-col :key="key">
            <v-card class="mx-auto" max-width="400" :color="color(key)" >
              <v-card-title>
                {{ value.name }}
              </v-card-title>
              <v-card-text>
                {{ value.status }}
              </v-card-text>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Status } from "@/types/Status";

import firebase from "firebase";
// import moment from "moment";

@Component
export default class HomeBoard extends Vue {

  private items: { [key: string]: Status } = {}

  private created(){
//    const user = store.getters.user;
    const groupid = localStorage.groupid;
    firebase
      .firestore()
      .collection("groups")
      .doc(groupid)
      .collection("status")
      .onSnapshot( (querySnapshot) => {
        this.items = {};
        querySnapshot.forEach( (doc) => {
          this.items[doc.id] = doc.data();
      });
    });  
  }

  private color(id: string){
    if(this.items[id].status && this.items[id].status === "出社"){
      return "amber";
    }
    return "blue-grey"
  }

}
</script>

<style>

</style>