import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <DataProvider>
        <ProductProvider>
          <Routes>
            <Route path='/' element={<SignInPage />} />
          </Routes>
        </ProductProvider>
      </DataProvider>
    </BrowserRouter >
  );
}

export default App;
