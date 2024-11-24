import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import Hero from "./pages/Hero";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import LandingHomePage from "./pages/LandingHomePage";
import PostCollection from "./pages/PostCollection";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import { useAuthStore } from "./store/useAuthStore";
import LandingNavBar from "./components/LandingNavBar";
import NotFound from "./pages/NotFound";
// import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const location = useLocation();
  const currentPath = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);

  //as for Now did for ui purpose i it may couse performance issue you can remove 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="relative">
      {!authUser ? (
        <div className="fixed top-0 z-40 w-full ">
          {currentPath === "/" ? (
            <div
              className={`sticky top-0 left-0 z-20 w-full transition-all duration-300 ease-in-out ${
                isScrolled ? "bg-black text-white shadow-md" : "bg-transparent"
              }`}
            >
              <NavBar />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : authUser && currentPath !== "/" ? (
        <LandingNavBar />
      ) : (
        <div
          className={`fixed top-0 left-0 z-40  w-full transition-all duration-300 ease-in-out ${
            isScrolled ? "bg-black text-white shadow-md" : "bg-transparent"
          }`}
        >
          <NavBar />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />

        <Route
          path="/home"
          element={authUser ? <LandingHomePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/collection"
          element={authUser ? <PostCollection /> : <Navigate to="/login" />}
        />
        <Route
          path="/createpost"
          element={authUser ? <CreatePost /> : <Navigate to="/login" />}
        />
         <Route path="*" element={<NotFound />} />
      </Routes>
      {currentPath === "/login" || currentPath === "/signup" ? "" : <Footer />}
      {/* <Toaster /> */}
    </div>
  );
};
export default App;
