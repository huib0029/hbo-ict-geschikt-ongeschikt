<template>
  <v-card class="mx-auto" :elevation="elevation">
    <v-img
      v-if="media"
      class="white--text"
      height="200px"
      :src="require('../assets/photo-1533237264985-ee62f6d342bb.jpg')"
    >
      <v-card-title class="align-end fill-height">Leaderboard HBO-ICT</v-card-title>
    </v-img>
    <v-card-title v-else>Leaderboard HBO-ICT</v-card-title>
    <v-data-table
      :headers="headers"
      :items="playerData"
      :items-per-page="15"
      class="elevation-1"
      :sort-by="['score', 'seconds']"
      :sort-desc="[true, false]"
      multi-sort
      must-sort
      dense
    >
      <template v-slot:item.rank="{ item }">
        <v-chip :color="getColor(item.rank)" dark>{{item.rank}}</v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  mounted: function() {
    this.generatePlayerData();
    this.generateRank();
  },
  data: () => ({
    media: true,
    elevation: 24,
    headers: [
      {
        text: "#",
        align: "left",
        sortable: false,
        value: "rank"
      },
      { text: "Speler", value: "playerName", sortable: false },
      { text: "Cijfer", value: "score", sortable: true },
      { text: "Aantal vragen goed", value: "correctAnswers", sortable: false },
      { text: "Aantal vragen fout", value: "wrongAnswers", sortable: false },
      {
        text: "Aantal vragen onbeantwoord",
        value: "emptyAnswers",
        sortable: false
      },
      { text: "Tijd (seconden)", value: "seconds", sortable: true }
    ],
    playerData: []
  }),
  methods: {
    generatePlayerData: function() {
      let data = JSON.parse(localStorage.leaderboard);
      delete data[0];
      return (this.playerData = data);
    },
    generateRank: function() {
      let index = 0;
      let data = this.playerData;
      let sortBy = [
        {
          prop: "score",
          direction: -1
        },
        {
          prop: "seconds",
          direction: 1
        }
      ];
      data.sort(function(a, b) {
        let i = 0,
          result = 0;
        while (i < sortBy.length && result === 0) {
          result =
            sortBy[i].direction *
            (a[sortBy[i].prop].toString() < b[sortBy[i].prop].toString()
              ? -1
              : a[sortBy[i].prop].toString() > b[sortBy[i].prop].toString()
              ? 1
              : 0);
          i++;
        }
        return result;
      });
      data.forEach(element => {
        index += 1;
        element.rank = index;
      });
    },
    getColor(rank) {
      if (rank === 1) {
        return "#FFD700";
      }
      if (rank === 2) {
        return "#C0C0C0";
      }
      if (rank === 3) {
        return "#cd7f32";
      }
      if (rank > 3) {
        return;
      }
    }
  }
};
</script>