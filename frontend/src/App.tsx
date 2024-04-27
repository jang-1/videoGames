import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/Root";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Games from "./pages/Games";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Developers from "./pages/Developers";
import Stores from "./pages/Stores";
import SingleGame from "./pages/SingleGame";
import SingleDeveloper from "./pages/SingleDeveloper";
import SingleCreator from "./pages/SingleCreator";
import SingleStore from "./pages/SingleStore";
import { AuthContextProvider } from "./context/authContext";
import AddNews from "./pages/AddNews";
import SinglePost from "./pages/SinglePost";
import Contact from "./pages/Contact";

export const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
    ]
  },
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "/:id",
        element: <SinglePost/>,
      },
    ]
  },
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "/addnews",
        element: <AddNews/>,
      },
    ]
  },
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "/games",
        element: <Games/>,
      },
    ]
  },
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "/games/:id",
        element: <SingleGame/>,
      },
    ]
  },
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "/gamedevs",
        element: <Developers/>,
      },
    ]
  },

  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "/developers/:id",
        element: <SingleDeveloper/>,
      },
    ]
  },
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "/creators/:id",
        element: <SingleCreator/>,
      },
    ]
  },
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "/stores/:id",
        element: <SingleStore/>,
      },
    ]
  },
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "/stores",
        element: <Stores/>,
      },
    ]
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);


function App() {
  return (
    <QueryClientProvider client={queryClient}>
          <AuthContextProvider>

            <RouterProvider router={router} />  
          </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
