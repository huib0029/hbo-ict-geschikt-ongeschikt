<script>
export default {};

export const quiz = {
  user: "ICT'er",
  questions: [
    {
      text: "Wat is HTTP?",
      responses: [
        { text: "Hyper text transfer package" },
        { text: "Hyper text transfer protocol", correct: true },
        { text: "Hyphenation text test program" },
        { text: "Geen van bovenstaande" }
      ]
    },
    {
      text: "Waar staat ICT voor?",
      responses: [
        { text: "Information communnication translation" },
        { text: "Informatie communicatie technologie", correct: true},
        { text: "Information communnication trouble" },
        { text: "Geen van bovenstaande" }
      ]
    },
    {
      text: "Is Mac OS X open source?",
      responses: [
        { text: "Ja" },
        { text: "Nee", correct: true },
        { text: "Dat hangt van de versie af" },
      ]
    },
    {
      text: "Wat doe je als datascientist wanneer je data mist:",
      responses: [
        { text: "Even wat bijkopen" },
        { text: "Achter degene aan die de database heeft beheerd" },
        {
          text: "Gemiddeldes berekenen en toepassen voor de missende velden"
        },
        {
          text:
            "Bepalen wat de impact hiervan is en kijken of deze uitgesloten kan worden van verder onderzoek",
          correct: true
        },
        { text: "Geen van bovenstaande" }
      ]
    },
    {
      text: "Welk lectoraat van de opleiding HBO-ICT houdt zich bezig met het analyseren van data?",
      responses: [
        { text: "Ontwikkelingshulp" },
        { text: "Data Science", correct: true },
        { text: "Healthy Region" },
        { text: "Marine Biobased Specialties" },
        { text: "Kenniscentrum kusttoerisme" }
      ]
    },
    {
      text: "Kan je Windows programma's zonder omwegen draaien op Ubuntu?",
      responses: [
        { text: "Nee", correct: true },
        { text: "Ja" },
        { text: "Alleen als het webapps zijn" },
        { text: "Geen van bovenstaande" }
      ]
    },
    {
      text: "Welk besturingssysteem is verplicht voor deze opleiding?",
      responses: [
        { text: "Linux" },
        { text: "Mac OS" },
        { text: "Windows" },
        { text: "Chrome OS" },
        { text: "De terminal" },
        { text: "Geen van allen", correct: true }
      ]
    },
    {
      text: "Waar staat WWW voor?",
      responses: [
        { text: "Werkschuw Whizzkid Werkwijze" },
        { text: "Werpschijf werpen wedstrijd" },
        { text: "World Wide Web", correct: true },
        { text: "Wijntypes Wegwijzer Wijnclubs" },
        { text: "What? Where? When?" },
        { text: "Windows Wonder Wall" },
        { text: "Geen van allen" }
      ]
    },
    {
      text: "Wie is de huidige CEO van Microsoft?",
      responses: [
        { text: "Satya Nadella", correct: true  },
        { text: "Bill Gates" },
        { text: "Sundar Pichai"},
        { text: "Mark Zuckerberg" },
        { text: "Geen van allen" }
      ]
    },
    {
      text: "Welke van onderstaande antwoorden is geen streamingplatform",
      responses: [
        { text: "Facebook", correct: true },
        { text: "Youtube" },
        { text: "Netflix" },
        { text: "Spotify" }
      ]
    },
    {
      text: "Wat is ITIL?",
      responses: [
        { text: "Information Technology Infrastructure Library", correct: true },
        { text: "Apollo 13" },
        { text: "Een manier om te documenteren" },
        { text: "TopDesk" }
      ]
    }
  ]
};

export const userResponseSkelaton = Array(quiz.questions.length).fill(null);
</script>