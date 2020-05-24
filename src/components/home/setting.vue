<template>
  <v-content>
    <v-container>
      <v-card class="mx-auto">
        <v-container>
          <v-row justify="end">
            <v-btn
              color="success"
              class="mr-4"
              text
              @click="create"
              top left
            >
              グループ作成
            </v-btn>
          </v-row>
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-text-field
              v-model="groupid"
              :counter="20"
              label="Group"
              required
            ></v-text-field>


            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="save"
            >
              更新
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Users } from "@/types/Users";

import store from "@/store";

import firebase from "firebase";
// import moment from "moment";

@Component
export default class HomeSetting extends Vue {

  private valid? = null;
  private groupid = "";

  private user: Users = {};

  private created() {
    const user = store.getters.user;
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then( (documentSnapshot) => {
        const data = documentSnapshot.data();
        if(data){
          this.user = data;
          this.groupid = this.user.groupid? this.user.groupid : "";
        }
      })
  }
  
  private create() {
    const user = store.getters.user;
    console.log(user);
    firebase
      .firestore()
      .collection("groups")
      .add({
        owner: user.uid
      })
      .then(documentSnapshot => {
        console.log("Document written with ID: ", documentSnapshot.id);
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .set(
            { groupid: documentSnapshot.id },
            { merge: true }
          )
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });

        firebase
          .firestore()
          .collection("groups")
          .doc(documentSnapshot.id)
          .collection("status")
          .doc(user.uid)
          .set(
            { name: user.displayName },
            { merge: true }
          )
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
        this.groupid = documentSnapshot.id;
        localStorage.groupid = this.groupid;
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  private save(){
    const user = store.getters.user;
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set(
        { groupid: this.groupid },
        { merge: true }
      )
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

    firebase
      .firestore()
      .collection("groups")
      .doc(this.groupid)
      .collection("status")
      .doc(user.uid)
      .set(
        { name: user.displayName },
        { merge: true }
      )
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    localStorage.groupid = this.groupid;
  }
}
</script>

<style>

</style>