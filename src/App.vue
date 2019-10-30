<template>
  <v-app>
    <Toolbar />
    <v-content>
      <app-router></app-router>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./layout/Toolbar";
import AppRouter from "./plugins/router";

export default {
  name: "App",
  components: {
    Toolbar,
    AppRouter
  },
  mounted() {
    if (!localStorage.leaderboard) {
      const a = [];
      a.push(JSON.parse(localStorage.getItem("leaderboard")));
      localStorage.setItem("leaderboard", JSON.stringify(a));
    }
  }
};
</script>
