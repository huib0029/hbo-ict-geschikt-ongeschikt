import { listen } from "./history";
import Quiz from '@/components/Quiz';
import QuizOnePage from '@/components/QuizOnePage';
import QuizTwoPage from '@/components/QuizTwoPage';
import Leaderboard from '@/components/Leaderboard';

const routes = {
    "/": Quiz,
    "/quiz-one": QuizOnePage,
    "/quiz-two": QuizTwoPage,
    "/leaderboard": Leaderboard
};

export default {
    created() {
        listen((route, previousRoute) => {
            this.previousRoute = previousRoute
            this.current = route
        });

        window.addEventListener(
            "popstate",
            // eslint-disable-next-line
            event => (this.current = window.location.pathname)
        );
    },
    data() {
        return {
            current: window.location.pathname
        };
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