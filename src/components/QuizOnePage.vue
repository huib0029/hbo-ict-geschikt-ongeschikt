<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <!--container-->
        <section class="container">
          <!--questionBox-->
          <div class="questionBox" id="app">
            <!-- transition -->
            <transition
              :duration="{ enter: 500, leave: 300 }"
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut"
              mode="out-in"
            >
              <!--qusetionContainer-->
                <div
                        class="questionContainer" id="namePrompt"
                        v-if="!playerName"
                >
                <header>
                  <h1 class="title is-6">HBO-ICT quiz</h1>
                  <!--progress-->
                  <div class="progressContainer">
                    <progress
                      class="progress is-info is-small"
                      :value="1"
                      max="100"
                    >{{(questionIndex/quiz.questions.length)*100}}%</progress>
                    <p>{{((questionIndex/quiz.questions.length)*100).toFixed(0)}}% compleet</p>
                  </div>
                  <!--/progress-->
                </header>
                <!-- questionTitle -->
                <h2 class="titleContainer title">Wat is je naam?</h2>
                <!-- quizOptions -->
                <div class="optionContainer">
                  <div class="option-custom">
                    <v-text-field
                      outlined
                      counter
                      required
                      placeholder="Klaas Vaak"
                      v-model="playerNameTextField"
                      :hint="playerNameHint"
                      :persistent-hint="true"
                      maxlength="20"
                      :rules="[playerNameInputRules.required, 
                      playerNameInputRules.counter, 
                      playerNameInputRules.validation]"
                    ></v-text-field>
                  </div>
                </div>

                <!--quizFooter: navigation and progress-->
                <footer class="questionFooter">
                  <!--pagination-->
                  <nav class="pagination" role="navigation" aria-label="pagination">
                    <!-- next button -->
                    <v-btn
                      color="primary"
                      :block="true"
                      :disabled="!playerNameTextField || /\s/.test(playerNameTextField)"
                      @click="setPlayerName(playerNameTextField)"
                    >{{ 'Start de quiz!' }}</v-btn>
                  </nav>
                  <!--/pagination-->
                </footer>
              </div>
              <div
                class="questionContainer"
                v-if="playerName && !sessionFinished"
                v-bind:key="questionIndex"
              >
                <header>
                  <h1 class="title is-6">
                    HBO-ICT quiz
                    <br />
                    Naam: {{ playerName }}
                  </h1>
                  <!--progress-->
                  <div class="progressContainer">
                    <progress
                      class="progress is-info is-small"
                      :value="(questionIndex/quiz.questions.length)*100"
                      max="100"
                    >{{(questionIndex/quiz.questions.length)*100}}%</progress>
                    <p>{{((questionIndex/quiz.questions.length)*100).toFixed(0)}}% compleet</p>
                  </div>
                  <!--/progress-->
                </header>
                <!-- questionTitle -->
                <h2 class="titleContainer title">{{ quiz.questions[questionIndex].text }}</h2>

                <!-- quizOptions -->
                <div class="optionContainer">
                  <div
                    class="option"
                    v-for="(response, index) in quiz.questions[questionIndex].responses"
                    @click="selectOption(index)"
                    :class="{ 'is-selected': userResponses[questionIndex] == index}"
                    :key="index"
                  >{{ index | charIndex }}. {{ response.text }}</div>
                </div>

                <!--quizFooter: navigation and progress-->
                <footer class="questionFooter">
                  <!--pagination-->
                  <nav class="pagination" role="navigation" aria-label="pagination">
                    <!-- back button -->
                    <a
                      :class="(questionIndex > 0)?'button':'button disabled'"
                      @click="prev();"
                    >Terug</a>

                    <!-- next button -->
                    <a
                      class="button"
                      :class="(userResponses[questionIndex]==null)?'':'is-active'"
                      @click="next();"
                      :disabled="questionIndex>=quiz.questions.length"
                    >{{ (userResponses[questionIndex]==null)?'Echt geen idee!':'Volgende' }}</a>
                  </nav>
                  <!--/pagination-->
                </footer>
                <!--/quizFooter-->
              </div>
              <!--/questionContainer-->

              <!--quizCompletedResult-->
              <div
                v-if="sessionFinished"
                v-bind:key="questionIndex"
                class="quizCompleted has-text-centered"
              >
                <img :src="gifSrc" class="gif" />
                <br />

                <!-- quizCompletedIcon: Achievement Icon -->
                <span class="icon">
                  <i
                    class="fa"
                    :class="score()>5.5?'fa-check-circle-o is-active':'fa-times-circle'"
                  ></i>
                </span>

                <!--resultTitleBlock-->
                <h2 class="title">
                  <span v-if="score()>7">Je hebt het fantastisch gedaan {{ playerName }}!</span>
                  <span v-if="score()>5.5">Je hebt het goed gedaan {{ playerName }}!</span>
                  <span v-if="score()<5.5">
                    Je hebt het matig gedaan {{ playerName }}!
                    <br />Probeer de test opnieuw te maken, ik weet zeker dat je het kunt!
                  </span>
                </h2>

                <p class="subtitle">
                  Je hebt behaald: {{ score() }}
                  <br />
                  in {{ seconds }} seconden
                </p>
                <br />
                <a class="button" @click="restart()">
                  Nog een keer!
                  <i class="fa fa-refresh"></i>
                </a>
                <a class="button" @click="goTo('/leaderboard')">
                  Naar het leaderboard
                  <v-icon>mdi-account-badge-horizontal-outline</v-icon>
                </a>
                <!--/resultTitleBlock-->
              </div>
              <!--/quizCompetedResult-->
            </transition>
          </div>
        </section>
        <!--/container-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RANDOMGIFAPI from "../api/random_gif_api";
import { quiz, userResponseSkelaton } from "../data/QuizListOne";
import { confetti, deleteConfetti } from "../plugins/confetti";
import { push } from "../plugins/history";

export default {
  data: () => ({
    nextQuestion: "2",
    quiz: quiz,
    questionIndex: 0,
    userResponses: userResponseSkelaton,
    totalQuestions: quiz.questions.length,
    isActive: false,
    gifSrc: "",
    startTime: 0,
    endTime: 0,
    seconds: 0,
    playerName: "",
    playerNameHint: "Alleen letters of cijfers, geen spaties",
    playerNameInputRules: {
      validationPattern: /^([a-zA-Z0-9])*$/,
      required: value => !!value || "Verplicht.",
      counter: value => (value || "").length <= 20 || "Maximaal 20 karakters",
      validation: value => {
        const pattern = /^([a-zA-Z0-9])*$/;
        return pattern.test(value) || "Vul alleen letters en/of cijfers in!";
      }
    },
    playerNameTextField: "",
    sessionFinished: false
  }),

  mounted() {
    this.restart();
  },

  filters: {
    charIndex: function(i) {
      return String.fromCharCode(97 + i);
    }
  },

  methods: {
    setPlayerName: function(name) {
      if (!this.playerNameInputRules.validationPattern.test(name)) {
        return;
      } else {
        this.playerName = name;
      }
    },

    restart: function() {
      this.questionIndex = 0;
      this.startTime = 0;
      this.endTime = 0;
      this.seconds = 0;
      this.playerName = "";
      this.playerNameTextField = "";
      this.userResponses = Array(this.quiz.questions.length).fill(null);
      deleteConfetti();
      this.sessionFinished = false;
    },

    selectOption: function(index) {
      this.$set(this.userResponses, this.questionIndex, index);
    },

    next: function() {
      if (this.questionIndex === 0) {
        this.startTime = new Date().getTime();
      }
      if (this.questionIndex < this.quiz.questions.length) {
        this.questionIndex++;
      }
      if (this.questionIndex === this.quiz.questions.length) {
        this.endTime = new Date().getTime();
        this.seconds = (this.endTime - this.startTime) / 1000;
        this.generateGif(this.score());
        this.saveDataToLocalStorage(this.score());
        confetti(this.score());
        this.sessionFinished = true;
      }
    },

    prev: function() {
      if (this.questionIndex > 0) {
        this.questionIndex--;
      }
      if (this.questionIndex < 1) {
        return;
      }
    },

    // Return "true" count in userResponses
    score: function() {
      var score = 0;
      for (let i = 0; i < this.userResponses.length; i++) {
        if (
          typeof this.quiz.questions[i].responses[this.userResponses[i]] !==
            "undefined" &&
          this.quiz.questions[i].responses[this.userResponses[i]].correct
        ) {
          score = score + 1;
        }
      }

      var grade = (score / this.totalQuestions) * 10;

      return grade.toFixed(1);
    },

    generateGif: function(score) {
      let tag;
      if (score < 5.5) {
        tag = "false";
      }
      if (score > 5.5) {
        tag = "good";
      }
      if (score > 7) {
        tag = "fantastic";
      }
      RANDOMGIFAPI.get("", {
        params: {
          tag: tag,
          rating: "g",
          api_key: "KQPBZKwPcJLRpW0L4u3quJGsxfMUDsIy"
        }
      }).then(response => {
        let id = response.data.data.id;
        this.gifSrc = "https://i.giphy.com/" + id + ".gif";
      });
    },

    goTo(route) {
      push(route);
    },

    saveDataToLocalStorage(score) {
      let a = [];
      let correctAnswers = 0;
      let wrongAnswers = 0;
      // Parse the serialized data back into an aray of objects
      a = JSON.parse(localStorage.getItem("leaderboard"));
      // Push the new data (whether it be an object or anything else) onto the array
      for (let i = 0; i < this.userResponses.length; i++) {
        if (
          typeof this.quiz.questions[i].responses[this.userResponses[i]] !==
            "undefined" &&
          this.quiz.questions[i].responses[this.userResponses[i]].correct
        ) {
          correctAnswers = correctAnswers + 1;
        }
      }

      for (let i = 0; i < this.userResponses.length; i++) {
        if (
          typeof this.quiz.questions[i].responses[this.userResponses[i]] !==
            "undefined" &&
          !this.quiz.questions[i].responses[this.userResponses[i]].correct
        ) {
          wrongAnswers = wrongAnswers + 1;
        }
      }

      let userdata = {
        playerName: this.playerName,
        score: score,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        seconds: this.seconds
      };

      a.push(userdata);

      // Re-serialize the array back into a string and store it in localStorage
      localStorage.setItem("leaderboard", JSON.stringify(a));
    }
  }
};
</script>

<style lang="scss">
@import "../scss/quiz.scss";
</style>
