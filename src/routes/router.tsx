import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import SearchResults from "../pages/SearchResults/SearchResults";
import RecipeDetails from "../pages/RecipeDetails/RecipeDetails";
import Favorites from "../pages/Favorites/Favorites";
import { MainLayout } from "../layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "search", element: <SearchResults /> },
      { path: "recipe/:id", element: <RecipeDetails /> },
      { path: "favorites", element: <Favorites /> },
    ],
  },
]);
