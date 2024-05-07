import "./App.css";
import "../src/Pages/CMS/Service/Service.css";
import { Suspense, lazy } from "react";
import Loading from "./Loading";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { check_token } from "./Store/authSlice";

const Header = lazy(() => import("./Pages/Layout/Header/Header"));
const Home = lazy(() => import("./Pages/CMS/Home/Home"));
const About = lazy(() => import("./Pages/CMS/About/About"));
const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const Registration = lazy(() =>
  import("./Pages/Auth/Registration/Registration")
);
const Blog = lazy(() => import("./Pages/CMS/Blog/Blog"));
const BlogData = lazy(() => import("./Pages/CMS/BlogData/BlogData"));
const Contact = lazy(() => import("./Pages/CMS/Contact/Contact"));
const CourseEnrollmentForm = lazy(() =>
  import("./Pages/CMS/CourseEnrollmentForm/CourseEnrollmentForm")
);
const Courses = lazy(() => import("./Pages/CMS/Courses/Courses"));
const Footer = lazy(() => import("./Pages/Layout/Footer/Footer"));

function Private({ children }) {
  // console.log(children);
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  return token != null || token != undefined ? (
    children
  ) : (
    <>
      <Navigate to="/" />
      {toast.error("please login first")}
    </>
  );
}

const publicRoute = [
  {
    path: "/",
    Component: <Home />,
  },
  {
    path: "/Login",
    Component: <Login />,
  },
  {
    path: "/Registration",
    Component: <Registration />,
  },
];
const privateRoute = [
  {
    path: "/About",
    Component: <About />,
  },
  {
    path: "/Courses",
    Component: <Courses />,
  },
  {
    path: "/Courses/:id",
    Component: <CourseEnrollmentForm />,
  },
  {
    path: "/Blog",
    Component: <Blog />,
  },
  {
    path: "/blogdata/:id",
    Component: <BlogData />,
  },
  {
    path: "/Contact",
    Component: <Contact />,
  },
];

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(check_token());
  }, [dispatch]);
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Header />
        <Routes>
          {publicRoute.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.Component} />
            );
          })}
          {privateRoute.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<Private>{route.Component}</Private>}
              />
            );
          })}
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
