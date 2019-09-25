<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>HZ HBO-ICT</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <span text-no-wrap class="font-weight-light">
      De grote HBO-ICT geschikt
        <v-icon>mdi-checkbox-marked-outline</v-icon> of ongeschikt
        <v-icon>mdi-checkbox-blank-outline</v-icon> tool
        </span>
    <v-spacer></v-spacer>
    <v-btn class="ma-2" outlined color="alert" href="" target="_blank">
          <v-icon>mdi-cached</v-icon>
      <span>Herstart quiz</span>
    </v-btn>
    <v-btn class="ma-2" outlined color="success" href="https://hz.nl/opleidingen/hbo-ict" target="_blank">
      <span>Schrijf je nu in!</span>
    </v-btn>
  </v-app-bar>
</template>