<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
            >

                <!--container-->
                <section class="container">

                    <!--questionBox-->
                    <div class="questionBox" id="app">

                        <!-- transition -->
                        <transition :duration="{ enter: 500, leave: 300 }" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut"
                                    mode="out-in">

                            <!--qusetionContainer-->
                            <div class="questionContainer" v-if="questionIndex<quiz.questions.length" v-bind:key="questionIndex">

                                <header>
                                    <h1 class="title is-6">HBO-ICT quiz</h1>
                                    <!--progress-->
                                    <div class="progressContainer">
                                        <progress class="progress is-info is-small" :value="(questionIndex/quiz.questions.length)*100" max="100">
                                            {{(questionIndex/quiz.questions.length)*100}}%
                                        </progress>
                                        <p>{{((questionIndex/quiz.questions.length)*100).toFixed(0)}}% complete</p>
                                    </div>
                                    <!--/progress-->
                                </header>
                                <!-- questionTitle -->
                                <h2 class="titleContainer title">{{ quiz.questions[questionIndex].text }}</h2>

                                <!-- quizOptions -->
                                <div class="optionContainer">
                                    <div class="option" v-for="(response, index) in quiz.questions[questionIndex].responses"
                                         @click="selectOption(index)" :class="{ 'is-selected': userResponses[questionIndex] == index}" :key="index">
                                        {{ index | charIndex }}. {{ response.text }}
                                    </div>
                                </div>

                                <!--quizFooter: navigation and progress-->
                                <footer class="questionFooter">

                                    <!--pagination-->
                                    <nav class="pagination" role="navigation" aria-label="pagination">

                                        <!-- back button -->
                                        <a class="button" v-on:click="prev();" :disabled="questionIndex < 1">
                                            Terug
                                        </a>

                                        <!-- next button -->
                                        <a class="button" :class="(userResponses[questionIndex]==null)?'':'is-active'" v-on:click="next();"
                                           :disabled="questionIndex>=quiz.questions.length">
                                            {{ (userResponses[questionIndex]==null)?'Echt geen idee!':'Volgende' }}
                                        </a>

                                    </nav>
                                    <!--/pagination-->

                                </footer>
                                <!--/quizFooter-->

                            </div>
                            <!--/questionContainer-->

                            <!--quizCompletedResult-->
                            <div v-if="questionIndex >= quiz.questions.length" v-bind:key="questionIndex" class="quizCompleted has-text-centered">

                                <!-- quizCompletedIcon: Achievement Icon -->
                                <span class="icon">
                                    <i class="fa" :class="score()>3?'fa-check-circle-o is-active':'fa-times-circle'"></i>
                                </span>

                                <!--resultTitleBlock-->
                                <h2 class="title">
                                    Je hebt het {{ (score()>7?'fantastisch':(score()<4?'matig':'best goed')) }} gedaan! Blijf oefenen om je
                                    vaardigheden te verbeteren!
                                </h2>
                                <p class="subtitle">
                                    Je hebt behaald: {{ score() }}
                                </p>
                                <br>
                                <a class="button" @click="restart()">Nog een keer! <i class="fa fa-refresh"></i></a>
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
  var quiz = {
      user: 'ICT\'er',
      questions: [
        {
          text: 'Wat is HTTP?',
          responses: [
            { text: 'Hyper text transfer package' },
            { text: 'Hyper text transfer protocol', correct: true },
            { text: 'Hyphenation text test program' },
            { text: 'Geen van bovenstaande' }
          ]
        },
        {
          text: 'Waar staat CMS voor?',
          responses: [
            { text: 'Content Markup System' },
            { text: 'Content onderhoud Systeem' },
            { text: 'Content My Self' },
            { text: 'Content Management System', correct: true },
            { text: 'Geen van bovenstaande' }
          ]
        },
        {
          text: 'De uitkomst van een datascience project is vaak afhankelijk van:',
          responses: [
            { text: 'De scope van het project' },
            { text: 'De kwaliteit van de data', correct: true },
            { text: 'De gebruikte programmeertaal' },
            { text: 'De datascientist' },
            { text: 'Geen van bovenstaande' }
          ]
        },
        {
          text: 'Wat doe je als datascientist wanneer je data mist:',
          responses: [
            { text: 'Even wat bijkopen' },
            { text: 'Achter degene aan die de database heeft beheerd' },
            { text: 'Gemiddeldes berekenen en toepassen voor de missende velden' },
            { text: 'Bepalen wat de impact hiervan is en kijken of deze uitgesloten kan worden van verder onderzoek', correct: true },
            { text: 'Geen van bovenstaande' }
          ]
        },
        {
          text: 'Welk lectoraat is verbonden aan de opleiding HBO-ICT?',
          responses: [
            { text: 'Ontwikkelingshulp' },
            { text: 'Data Science', correct: true },
            { text: 'Business Intelligence & Analytics' },
            { text: 'Centure of bugs' },
            { text: 'Kenniscentrum kusttoerisme' }
          ]
        },
        {
          text: 'Welke van de volgende query\'s is goed?',
          responses: [
            { text: 'SELECT name from users', correct: true },
            { text: 'GET koffie FROM koffieapparaat' },
            { text: 'UPDATE studenten INSERT studiepunten=60 WHERE id=-1' },
            { text: 'Wordpress' },
            { text: 'Geen van bovenstaande' }
          ]
        },
        {
          text: 'Welk besturingssysteem is verplicht voor deze opleiding?',
          responses: [
            { text: 'Linux' },
            { text: 'Mac OS', },
            { text: 'Windows' },
            { text: 'Chrome OS' },
            { text: 'De terminal' },
            { text: 'Geen van allen', correct: true },
          ]
        },
        {
          text: 'Welke is geen webserver?',
          responses: [
            { text: 'Apache' },
            { text: 'NGINX', },
            { text: 'IIS' },
            { text: 'Kodi', correct: true },
            { text: 'Geen van allen' },
          ]
        },
        {
          text: 'Waar staat de comptentie BAN voor?',
          responses: [
            { text: 'Iemand bannen of wordt geband' },
            { text: 'Bedrijfsprocessen analyseren', },
            { text: 'Bedrijsprocessen achtereenvolgens noteren', correct: true },
            { text: 'Geen van allen' },
          ]
        },
        {
          text: 'Welk proces komt niet voor in een pakketselectie van software?',
          responses: [
            { text: 'Opstellen van Long List' },
            { text: 'Opstellen van Knock-Out criteria' },
            { text: 'Opstellen van requirements' },
            { text: 'ASMR toepassen (Autonomous Sensory Meridian Respons)', correct: true },
          ]
        },
        {
          text: 'Wat doet een Data Scientist?',
          responses: [
            { text: 'Data Science', correct: true },
            { text: 'Analytische filosofie' },
            { text: 'Software analyseren en ontwerpen' },
            { text: 'Proactief data verzamelen' },
          ]
        },
      ]
    },
    userResponseSkelaton = Array(quiz.questions.length).fill(null);

  export default {
    data: () => ({
      nextQuestion: '2',
      quiz: quiz,
      questionIndex: 0,
      userResponses: userResponseSkelaton,
      totalQuestions: quiz.questions.length,
      isActive: false
    }),

    filters: {
      charIndex: function (i) {
        return String.fromCharCode(97 + i);
      }
    },

    methods: {
      restart: function () {
        this.questionIndex = 0;
        this.userResponses = Array(this.quiz.questions.length).fill(null);
      },
      selectOption: function (index) {
        this.$set(this.userResponses, this.questionIndex, index);
        //console.log(this.userResponses);
      },
      next: function () {
        if (this.questionIndex < this.quiz.questions.length)
          this.questionIndex++;
      },

      prev: function () {
        if (this.quiz.questions.length > 0) this.questionIndex--;
      },

      // Return "true" count in userResponses
      score: function () {
        var score = 0;
        for (let i = 0; i < this.userResponses.length; i++) {
          if (typeof this.quiz.questions[i].responses[this.userResponses[i]] !== 'undefined'
            && this.quiz.questions[i].responses[this.userResponses[i]].correct) {
            score = score + 1;
          }
        }

        var grade = score / this.totalQuestions * 10;
        return grade.toFixed(1);

        // return this.userResponses.filter(function(val) { return val }).length;
      }
    }
  };

  $('document').ready(function () {

    console.log(quiz.questions.length);
    console.log(this.questionIndex);

    for (var i = 0; i < 500; i++) {
      create(i);
    }

    function create(i) {
      var width = Math.random() * 8;
      var height = width * 0.4;
      var colourIdx = Math.ceil(Math.random() * 3);
      var colour = "red";
      switch(colourIdx) {
        case 1:
          colour = "yellow";
          break;
        case 2:
          colour = "blue";
          break;
        default:
          colour = "red";
      }
      $('<div class="confetti-'+i+' '+colour+'"></div>').css({
        "width" : width+"px",
        "height" : height+"px",
        "top" : -Math.random()*20+"%",
        "left" : Math.random()*100+"%",
        "opacity" : Math.random()+0.5,
        "transform" : "rotate("+Math.random()*360+"deg)"
      }).appendTo('.v-application--wrap');

      drop(i);
    }

    function drop(x) {
      $('.confetti-'+x).animate({
        top: "100%",
        left: "+="+Math.random()*15+"%"
      }, Math.random()*3000 + 3000, function() {
        reset(x);
      });
    }

    function reset(x) {
      $('.confetti-'+x).animate({
        "top" : -Math.random()*20+"%",
        "left" : "-="+Math.random()*15+"%"
      }, 0, function() {
        drop(x);
      });
    }
  });
</script>



<style lang="scss">
    $trans_duration: 0.3s;
    $primary_color: #3D5AFE;

    @import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
    @import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");


    .button {
        transition: $trans_duration;
    }

    .title,
    .subtitle {
        font-family: Montserrat, sans-serif;
        font-weight: normal;
    }

    .animated {
        transition-duration: $trans_duration/2;
    }

    .container {
        margin: 0 0.5rem;
    }

    .questionBox {

        max-width: 30rem;
        width: 30rem;
        min-height: 30rem;

        background: #FAFAFA;
        position: relative;
        display: flex;

        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

        header {
            background: rgba(0, 0, 0, 0.025);
            padding: 1.5rem;
            text-align: center;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);

            h1 {
                font-weight: bold;
                margin-bottom: 1rem !important;
            }

            .progressContainer {
                width: 60%;
                margin: 0 auto;

                > progress {
                    margin: 0;
                    border-radius: 5rem;
                    overflow: hidden;
                    border: none;

                    color: $primary_color;

                    &::-moz-progress-bar {
                        background: $primary_color;
                    }

                    &::-webkit-progress-value {
                        background: $primary_color;
                    }
                }

                > p {
                    margin: 0;
                    margin-top: 0.5rem;
                }
            }
        }

        .titleContainer {
            text-align: center;
            margin: 0 auto;
            padding: 1.5rem;

        }

        .quizForm {
            display: block;
            white-space: normal;

            height: 100%;
            width: 100%;

            .quizFormContainer {
                height: 100%;
                margin: 15px 18px;

                .field-label {
                    text-align: left;
                    margin-bottom: 0.5rem;
                }
            }
        }

        .quizCompleted {
            width: 100%;
            padding: 1rem;
            text-align: center;

            > .icon {
                color: #FF5252;
                font-size: 5rem;

                .is-active {
                    color: #00E676;
                }
            }
        }

        .questionContainer {
            white-space: normal;

            height: 100%;
            width: 100%;

            .optionContainer {
                margin-top: 12px;
                flex-grow: 1;

                .option {
                    border-radius: 290486px;
                    padding: 9px 18px;
                    margin: 0 18px;
                    margin-bottom: 12px;
                    transition: $trans_duration;
                    cursor: pointer;
                    background-color: rgba(0, 0, 0, 0.05);
                    color: rgba(0, 0, 0, 0.85);
                    border: transparent 1px solid;

                    &.is-selected {
                        border-color: rgba(black, 0.25);
                        background-color: white;
                    }

                    &:hover {
                        background-color: rgba(0, 0, 0, 0.1);
                    }

                    &:active {
                        transform: scaleX(0.9);
                    }
                }
            }

            .questionFooter {
                background: rgba(0, 0, 0, 0.025);
                border-top: 1px solid rgba(0, 0, 0, 0.1);
                width: 100%;
                align-self: flex-end;

                .pagination {
                    //padding: 10px 15px;
                    margin: 15px 25px;
                }
            }
        }
    }

    .pagination {
        display: flex;
        justify-content: space-between;
    }

    .button {
        padding: 0.5rem 1rem;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 5rem;
        margin: 0 0.25rem;

        transition: 0.3s;

        &:hover {
            cursor: pointer;
            background: #ECEFF1;
            border-color: rgba(0, 0, 0, 0.25);
        }

        &.is-active {
            background: $primary_color;
            color: white;
            border-color: transparent;

            &:hover {
                background: darken($primary_color, 10%);

            }
        }
    }

    @media screen and (min-width: 769px) {
        .questionBox {
            align-items: center;
            justify-content: center;

            .questionContainer {
                display: flex;
                flex-direction: column;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .sidebar {
            height: auto !important;
            border-radius: 6px 6px 0px 0px;
        }
    }

    .wrapper {
        position: relative;
        min-height: 100vh;
    }

    [class|="confetti"] {
        position: absolute;
    }

    .red {
        background-color: #E94A3F;
    }

    .yellow {
        background-color: #FAA040;
    }

    .blue {
        background-color: #5FC9F5;
    }

</style>
