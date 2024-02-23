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

const queryClient = new QueryClient()


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
        path: "/stores",
        element: <Stores/>,
      },
    ]
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
