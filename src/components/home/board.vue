<template>
  <v-content>
    <v-container class="grey lighten-5">
      <v-row dense>
        <template v-for=" ( value , key ) in items">
          <v-col :key="key">
            <v-card class="mx-auto" max-width="400" :color="color(key)" @click="status(key)" >
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

import store from "@/store";

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

  private status(id: string){
    const user = store.getters.user;
    if(user.uid != id){
      return;
    }
    let status = "出社";
    if(this.items[id].status && this.items[id].status === "出社"){
      status = "退社";
    }

    const groupid = localStorage.groupid;

    console.log(id);
    firebase
      .firestore()
      .collection("groups")
      .doc(groupid)
      .collection("status")
      .doc(id)
      .set( { status: status },{ merge: true })
    
    const record = { type: status , date: firebase.firestore.Timestamp.now() };
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("record")
      .add(record)
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