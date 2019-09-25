<template>
  <v-app>
    <Toolbar/>
    <v-content>
      <Quiz/>
    </v-content>
  </v-app>
</template>

<script>
import Quiz from './components/Quiz';
import Toolbar from './layout/Toolbar'

export default {
  name: 'App',
  components: {
    Quiz,
    Toolbar
  },
  data: () => ({
    //
  }),
};
</script>
