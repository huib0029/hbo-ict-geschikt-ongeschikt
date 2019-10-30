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
                class="questionContainer"
                v-if="questionIndex<quiz.questions.length"
                v-bind:key="questionIndex"
              >
                <header>
                  <h1 class="title is-6">HBO-ICT quiz</h1>
                  <!--progress-->
                  <div class="progressContainer">
                    <progress
                      class="progress is-info is-small"
                      :value="(questionIndex/quiz.questions.length)*100"
                      max="100"
                    >{{(questionIndex/quiz.questions.length)*100}}%</progress>
                    <p>{{((questionIndex/quiz.questions.length)*100).toFixed(0)}}% complete</p>
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
                    <a class="button" v-on:click="prev();" :disabled="questionIndex < 1">Terug</a>

                    <!-- next button -->
                    <a
                      class="button"
                      :class="(userResponses[questionIndex]==null)?'':'is-active'"
                      v-on:click="next();"
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
                v-if="questionIndex >= quiz.questions.length"
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
                  <span v-if="score()>7">Je hebt het fantastisch gedaan!</span>
                  <span v-if="score()>5.5">Je hebt het goed gedaan!</span>
                  <span v-if="score()<5.5">
                    Je hebt het matig gedaan!
                    <br />Probeer de test opnieuw te maken, ik weet zeker dat je het kan!
                  </span>
                </h2>

                <p class="subtitle">Je hebt behaald: {{ score() }}</p>
                <br />
                <a class="button" @click="restart()">
                  Nog een keer!
                  <i class="fa fa-refresh"></i>
                </a>
                <!--/resultTitleBlock-->
              </div>
              <!--/quizCompetedResult-->
            </transition>
          </div>
          <!--/questionBox-->
        </section>
        <!--/container-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RANDOMGIFAPI from "../api/random_gif_api";
import { quiz, userResponseSkelaton } from "../data/QuizListOne";

export default {
  data: () => ({
    nextQuestion: "2",
    quiz: quiz,
    questionIndex: 0,
    userResponses: userResponseSkelaton,
    totalQuestions: quiz.questions.length,
    isActive: false,
    gifSrc: ""
  }),

  filters: {
    charIndex: function(i) {
      return String.fromCharCode(97 + i);
    }
  },

  methods: {
    restart: function() {
      this.questionIndex = 0;
      this.userResponses = Array(this.quiz.questions.length).fill(null);
    },
    selectOption: function(index) {
      this.$set(this.userResponses, this.questionIndex, index);
      //console.log(this.userResponses);
    },
    next: function() {
      if (this.questionIndex < this.quiz.questions.length) {
        this.questionIndex++;
      }
      if (this.questionIndex === this.quiz.questions.length) {
        this.generateGif(this.score());
      }
    },

    prev: function() {
      if (this.quiz.questions.length > 0) this.questionIndex--;
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

      // return this.userResponses.filter(function(val) { return val }).length;
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
    }
  }
};
</script>

<style lang="scss">
@import "../scss/quiz.scss";
</style>
