import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const AllStudents = lazy(() => import("../pages/AllStudents"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/all-students",
    component: Registration,
  },
  // {
  //   path: "/article/:id/:title",
  //   component: Article,
  // },
  // {
  //   path: "/profile",
  //   component: Profile,
  // },
  // {
  //   path: "/dues",
  //   component: Dues,
  // },
  // {
  //   path: "/souvernirs",
  //   component: Souverniers,
  // },
  // {
  //   path: "/articles",
  //   component: Articles,
  // },
  // {
  //   path: "/executivesandpatrons",
  //   component: ChangePassword,
  // },
  // {
  //   path: "/developers",
  //   component: Developers,
  // },
  // {
  //   path: "/handouts",
  //   component: Handouts,
  // },
  // {
  //   path: "/past-questions",
  //   component: PastQuestions,
  // },
  // {
  //   path: "/messages",
  //   component: Messages,
  // },

  // {
  //   path: "/404",
  //   component: Page404,
  // },
];

export default routes;
