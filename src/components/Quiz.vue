<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row class="grey lighten-5" style="height: 300px;">
          <v-card class="mx-auto" :elevation="elevation" :width="width">
            <v-img
              v-if="media"
              class="white--text"
              height="200px"
              :src="require('../assets/julia-joppien-XFUqd0u5U7w-unsplash.jpg')"
            >
              <v-card-title class="align-end fill-height">Quiz zonder webcam</v-card-title>
            </v-img>
            <v-card-title v-else>Quiz zonder webcam</v-card-title>
            <v-card-text>Quiz zonder webcam oftwel de Microsoft Face-api</v-card-text>
            <v-card-actions v-if="actions">
              <v-btn @click="goTo('/quiz-one')" block color="primary">Start de Quiz!</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row class="grey lighten-5" style="height: 300px;">
          <v-card class="mx-auto" :elevation="elevation" :width="width" disabled>
            <v-img
              v-if="media"
              class="white--text"
              height="200px"
              :src="require('../assets/frank-busch-ChDWtI3N9w4-unsplash.jpg')"
            >
              <v-card-title class="align-end fill-height">Quiz met webcam AI</v-card-title>
            </v-img>
            <v-card-title v-else>Quiz met webcam AI</v-card-title>
            <v-card-text>Quiz met webcam AI / Microsoft Face-api</v-card-text>
            <v-card-actions align-center v-if="actions">
              <v-btn @click="goTo('/quiz-two')" block color="primary">Start de Quiz!</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { push } from "@/plugins/history";

export default {
  data: () => ({
    media: true,
    actions: true,
    elevation: 24,
    width: 500
  }),
  methods: {
    goTo(route) {
      push(route);
    }
  }
};
</script>
