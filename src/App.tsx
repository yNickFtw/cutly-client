import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from "./pages/Auth/Login/Login";
import { Register } from "./pages/Auth/Register/Register";
import useAuth from "./contexts/auth-context";
import { PrivateLayout } from "./layouts/PrivateLayout";
import { Toaster } from "./components/ui/toaster";
import { PublicLayout } from "./layouts/PublicLayout";
import { useEffect } from "react";
import useUser from "./contexts/user-contexts";
import { api } from "./api";
import { toast } from "./components/ui/use-toast";
import { IUser } from "./types/user/IUser";
import { CompanyBySlug } from "./pages/CompanyBySlug/CompanyBySlug";
import { HeaderHome } from "./pages/Home/_components/HeaderHome";
import { HeaderCompanyBySlug } from "./pages/CompanyBySlug/_components/HeaderCompanyBySlug";

const queryClient = new QueryClient();

const routes = [
  {
    path: "/",
    element: <Home />,
    isAuthenticatedRoute: true,
    hasNavbar: true,
    header: <HeaderHome />,
    title: "Minhas Empresas",
    className: "flex flex-row justify-between items-center",
  },
  {
    path: "/login",
    element: <Login />,
    isAuthenticatedRoute: false,
    hasNavbar: false,
    header: undefined,
    title: "Login",
  },
  {
    path: "/register",
    element: <Register />,
    isAuthenticatedRoute: false,
    hasNavbar: false,
    header: undefined,
    title: "Cadastro",
  },
  {
    path: "/:slug",
    element: <CompanyBySlug />,
    isAuthenticatedRoute: true,
    hasNavbar: true,
    header: <HeaderCompanyBySlug />,
    title: undefined,
  },
];

function App() {
  const { isLoggedIn, logout } = useAuth();
  const { user, setUser } = useUser();

  const token = localStorage.getItem("token") as string;

  useEffect(() => {
    async function execute() {
      try {
        if (isLoggedIn && !user) {
          const response = await api.get<{ message: string; user: IUser }>(
            `/users/logged`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status == 200) {
            setUser(response.data.user);
          }
        }

        return;
      } catch (error: any) {
        if (error.response.status == 401) {
          toast({
            title: error.response.data.message,
            variant: "destructive",
          });

          setUser(null);
          logout();
        }
      }
    }

    execute();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster />
        <BrowserRouter>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.isAuthenticatedRoute ? (
                    <PrivateLayout
                      component={route.element}
                      hasNavbar={route.hasNavbar}
                      header={route.header}
                      title={route.title}
                      className={route.className}
                    />
                  ) : (
                    <PublicLayout>{route.element}</PublicLayout>
                  )
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
