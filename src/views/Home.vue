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
          <v-btn color="pink" dark fixed bottom right fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    drawer: null,
  }),
  created () {
    this.$vuetify.theme.dark = false
  },
}
</script>
