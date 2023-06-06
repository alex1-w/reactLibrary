import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import { UserProvider } from './providers/UserProvider';
// import { HomePage } from '../src/pages/HomePage'
import { NotFoundPage } from './pageComponents/NotFoundPage/NotFoundPage';
import { Layout } from './Layout';
import { CartBlock } from './pageComponents/CartBlock/CartBlock';
import { FavoritesBlock } from './pageComponents/FavoritesBlock/FavoritesBlock';
import { BookPreview } from './pageComponents/BookBlock/BookBlock';
import { MainPage } from './pageComponents/MainPage/MainPage';

function App() {
  return (

    <SnackbarProvider>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path='cart' element={<CartBlock />} />
            <Route path='favorites' element={<FavoritesBlock />} />
            <Route path='book/:id' element={<BookPreview />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </SnackbarProvider>

  );
}

export default App;
