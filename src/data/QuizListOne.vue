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
      // {
      //   text: 'Waar staat CMS voor?',
      //   responses: [
      //     { text: 'Content Markup System' },
      //     { text: 'Content onderhoud Systeem' },
      //     { text: 'Content My Self' },
      //     { text: 'Content Management System', correct: true },
      //     { text: 'Geen van bovenstaande' }
      //   ]
      // },
      {
        text:
          "De uitkomst van een datascience project is vaak afhankelijk van:",
        responses: [
          { text: "De scope van het project" },
          { text: "De kwaliteit van de data", correct: true },
          { text: "De gebruikte programmeertaal" },
          { text: "De datascientist" },
          { text: "Geen van bovenstaande" }
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
        text: "Welk lectoraat is verbonden aan de opleiding HBO-ICT?",
        responses: [
          { text: "Ontwikkelingshulp" },
          { text: "Data Science", correct: true },
          { text: "Business Intelligence & Analytics" },
          { text: "Centure of bugs" },
          { text: "Kenniscentrum kusttoerisme" }
        ]
      },
      {
        text: "Welke van de volgende query's is goed?",
        responses: [
          { text: "SELECT name from users", correct: true },
          { text: "GET koffie FROM koffieapparaat" },
          { text: "UPDATE studenten INSERT studiepunten=60 WHERE id=-1" },
          { text: "Wordpress" },
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
        text: "Welke is geen webserver?",
        responses: [
          { text: "Apache" },
          { text: "NGINX" },
          { text: "IIS" },
          { text: "Kodi", correct: true },
          { text: "Geen van allen" }
        ]
      },
      {
        text: "Waar staat de comptentie BAN voor?",
        responses: [
          { text: "Iemand bannen of wordt geband" },
          { text: "Bedrijfsprocessen analyseren" },
          { text: "Bedrijsprocessen achtereenvolgens noteren", correct: true },
          { text: "Geen van allen" }
        ]
      },
      {
        text: "Welk proces komt niet voor in een pakketselectie van software?",
        responses: [
          { text: "Opstellen van Long List" },
          { text: "Opstellen van Knock-Out criteria" },
          { text: "Opstellen van requirements" },
          {
            text: "ASMR toepassen (Autonomous Sensory Meridian Respons)",
            correct: true
          }
        ]
      },
      {
        text: "Wat doet een Data Scientist?",
        responses: [
          { text: "Data Science", correct: true },
          { text: "Analytische filosofie" },
          { text: "Software analyseren en ontwerpen" },
          { text: "Proactief data verzamelen" }
        ]
      }
    ]
  };

  export const userResponseSkelaton = Array(quiz.questions.length).fill(null);
  </script>