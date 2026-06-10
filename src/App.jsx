import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Ranking from "./pages/Ranking";
import Register from "./pages/Register";
import Types from "./pages/TypesPhase";
import FollowedUsersRanking from "./pages/FollowedUsersRanking";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import Registered from "./pages/Registered";
import UserProfile from "./pages/UserProfile";
import Login from "./features/homepage/Login";
import ForgotPassword from "./features/homepage/ForgotPassword";
import AdminRoute from "./ui/AdminRoute";
import ResetPassowrd from "./features/homepage/ResetPassword";
import AdminPage from "./pages/AdminPage";
import AddMatch from "./features/admin/AddMatch";
import VerifyUsers from "./features/admin/VerifyUsers";
import AddAdvert from "./features/admin/AddAdvert";
import CheckAnswers from "./features/admin/CheckAnswers";
import TypesPhase from "./pages/TypesPhase";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            path="admin"
            element={
              <AdminRoute>
                <AppLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminPage />} />
            <Route path="weryfikacja" element={<VerifyUsers />} />
            <Route path="dodaj" element={<AddMatch />} />
            <Route path="rozlicz" element={<CheckAnswers />} />
            {/* <Route path="reklama" element={<AddAdvert />} /> */}
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="ranking" element={<Ranking />} />
            <Route path="profil" element={<Profile />} />
            <Route path="typy/kolejka/:phaseName" element={<TypesPhase />} />
            <Route path="obserwowani" element={<FollowedUsersRanking />} />
            <Route path="użytkownik/:userName" element={<UserProfile />} />
          </Route>

          <Route element={<AppLayout />}>
            <Route path="rejestracja" element={<Register />} />
            <Route index element={<HomePage />} />
            <Route path="wpisowe" element={<Registered />} />
            <Route path="forgot" element={<ForgotPassword />} />
            <Route path="reset" element={<ResetPassowrd />} />
            <Route path="logowanie" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              color: "#15803d",
              backgroundColor: "#f0fdf4",
              border: "2px solid #15803d",
            },
            iconTheme: {
              primary: "#15803d",
              secondary: "#f0fdf4",
            },
          },
          error: {
            duration: 5000,
            style: {
              color: "var(--color-error)",
              backgroundColor: "var(--color-input-error)",
              border: "2px solid var(--color-error)",
            },
            iconTheme: {
              primary: "var(--color-error)",
              secondary: "var(--color-input-error)",
            },
          },
          style: {
            fontSize: "1.6rem", // Poprawione font-size
            padding: "1.2rem 1.6rem",
            borderRadius: "8px",
            textAlign: "start",
            marginTop: "1.6rem",
            width: "40rem",
            fontWeight: "500",
            alignItems: "center",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
