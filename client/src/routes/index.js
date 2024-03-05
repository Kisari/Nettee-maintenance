import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Home from "../components/Home/Home";
import Thread from "../components/Thread/Thread";
import Profile from "../components/profile/Profile";
import QuickChallenge from "../components/Challenge/index";
import QuizPage from "../components/Challenge/QuizPageRender";
import Appointment from "../components/Scheduler/SchedulerPage";
import ChatSection from "../chat/ChatSection";

const publicRoutes = [
  { path: "/", component: Login, requireLogin: false },
  { path: "/home", component: Home },
  { path: "/home/:params", component: Home },
  { path: "/login", component: Login, requireLogin: false },
  { path: "/signup", component: Signup, requireLogin: false },
  { path: "/profile", component: Profile },
  { path: "/threads/:threadID/details", component: Thread },
  { path: "/qChallenge", component: QuickChallenge },
  { path: "/quizPage", component: QuizPage },
  { path: "/lChallenge", component: Appointment },
  // { path: "/chat", component: ChatSection },
];

export { publicRoutes };
