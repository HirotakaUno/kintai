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
                  <th class="text-left">Name</th>
                  <th class="text-left">Calories</th>
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

@Component
export default class Home extends Vue{

  private dialog = false;

  private created () {
    this.$vuetify.theme.dark = false
  }

}
</script>
