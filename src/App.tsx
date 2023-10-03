import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./providers/UserProvider";
import { NotFoundPage } from "./pageComponents/NotFoundPage/NotFoundPage";
import { Layout } from "./Layout";
import { CartBlock } from "./pageComponents/CartBlock/CartBlock";
import { FavoritesBlock } from "./pageComponents/FavoritesBlock/FavoritesBlock";
import { BookPreview } from "./pageComponents/BookBlock/BookBlock";
import { MainPage } from "./pageComponents/MainPage/MainPage";
import { Catalog } from "./pageComponents/Catalog/Catalog";

function App() {
  return (
    <SnackbarProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="cart" element={<CartBlock />} />
            <Route path="favorites" element={<FavoritesBlock />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="book/:id" element={<BookPreview />} />
            <Route path="*" element={<Navigate to={`/404`} />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </SnackbarProvider>
  );
}

export default App;
