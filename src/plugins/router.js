import QuizOnePage from './components/QuizOnePage';
import QuizTwoPage from './components/QuizTwoPage';

const routes = {
  "/quiz-one": QuizOnePage,
  "/quiz-two": QuizTwoPage
};

export default {
  data() {
    return { current: window.location.pathname };
  },
  computed: {
    routedComponent() {
      return routes[this.current];
    }
  },
  render(createElement) {
    return createElement(this.routedComponent);
  }
};
