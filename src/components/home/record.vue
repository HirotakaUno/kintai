<template>
  <v-content>
    <v-container>
      <v-alert
        v-model="alert"
        dismissible
        color="cyan"
        border="left"
        elevation="2"
        colored-border
        icon="notifications"
      >{{ alertmsg }}</v-alert>
      <v-card class="mx-auto">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">時間</th>
                <th class="text-left">区分</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value , key) in records" :key="key">
                <td>{{ dateformat(value.date) }}</td>
                <td>{{ value.type }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-container>
    <v-fab-transition>
      <v-btn color="pink" dark fixed bottom right fab @click.stop="dialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">記録</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form>
              <v-select :items="items" label="記録区分" prepend-icon="directions_run" v-model="type"></v-select>
              <v-row>
                <v-col cols="12" md="6">
                  <v-dialog
                    ref="dialogdate"
                    v-model="datemodal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="Picker in dialog"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="datemodal = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialogdate.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" md="6">
                  <v-dialog
                    ref="dialogtime"
                    v-model="timemodal"
                    :return-value.sync="time"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="time"
                        label="Picker in dialog"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker v-if="timemodal" v-model="time" full-width>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="timemodal = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialogtime.save(time)">OK</v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Record } from "@/types/Record";

import store from "@/store";

import firebase from "firebase";
import moment from "moment";

@Component
export default class HomeRecord extends Vue {
  private dialog = false;
  private datemodal = false;
  private timemodal = false;

  private alert = false;
  private alertmsg = "";

  private items = ["出社", "退社"];

  private records: { [key: string]: Record } = {};

  private type = "出社";
  private date? = moment().format("YYYY-MM-DD");
  private time? = moment().format("HH:mm");

  private record: Record = {};

  private created() {
    this.$vuetify.theme.dark = false;
    const user = store.getters.user;
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("record")
      .orderBy("date", "desc")
      .onSnapshot(querySnapshot => {
        this.records = {};
        querySnapshot.forEach(doc => {
          this.records[doc.id] = doc.data();
        });
      });

    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data();
        console.info(data);
        if(data){
          localStorage.groupid = data.groupid;
        }
      });
  }

  private dateformat(date: firebase.firestore.Timestamp) {
    return moment(date.toDate()).format("YYYY/MM/DD HH:mm");
  }

  private save() {
    this.record.type = this.type;
    this.record.date = firebase.firestore.Timestamp.fromDate(
      moment(this.date + " " + this.time, "YYYY-MM-DD HH:mm").toDate()
    );
    this.dialog = false;
    console.info(this.record);

    const user = store.getters.user;

    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("record")
      .add(this.record)
      .then(() => {
        this.alertmsg = "記録しました。";
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }
}
</script>