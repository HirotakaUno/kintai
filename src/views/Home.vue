<template>
  <v-app class="home">
    <v-app-bar app clipped-lef>
      <v-toolbar-title>kintai</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-card
          class="mx-auto"
          max-width="800"
        >
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">時間</th>
                  <th class="text-left">区分</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in desserts" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
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
              <v-form v-model="valid">
                <v-select
                  :items="items"
                  label="記録区分"
                  prepend-icon="directions_run"
                  v-model="type"
                ></v-select>
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="time"
                    label="時間"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="time"
                  full-width
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
      
  </v-app>
</template>

<script lang="ts">
import { Component , Vue } from 'vue-property-decorator';

import { Record } from '@/types/Record'

import firebase from "firebase";
import moment from "moment";

@Component
export default class Home extends Vue{

  private dialog = false;
  private menu2 = false;

  private items = [ "出社" , "退社" ];

  private type = '出社';
  private time? = moment().format("HH:mm");
  
  private record: Record = {};

  private created () {
    this.$vuetify.theme.dark = false
  }

  private save() {
    this.record.type = this.type;
    this.record.date = firebase.firestore.Timestamp.fromDate(moment(this.time,"HH:mm").toDate());
  }

}
</script>
