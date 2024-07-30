import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/index';
import Discografia from './pages/Discografia';
import Albuns from './pages/Albuns';
import Faixas from './pages/Faixas';
import Contato from './pages/Contato';
import Biografia from './pages/Biografia';

export default function AppRoutes() {
  return (
    // <BrowserRouter>
    //   <Routes >
    //     <Route path="/" element={<Home />} />
    //     <Route path="/Discografia" element={<Discografia />} />
    //     <Route path="/albuns" element={<Albuns />} />
    //     <Route path="/faixas" element={<Faixas />} />
    //     <Route path="/contato" element={<Contato />} />
    //     <Route path="/biografia" element={<Biografia />} />
    //   </Routes >
    // </BrowserRouter>
    <BrowserRouter>
        <Discografia />
        <Routes>
        <Route path="/albuns" element={<Albuns />} />
        <Route path="/faixas" element={<Faixas />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/biografia" element={<Biografia />} />
        </Routes>
    </BrowserRouter>
  );
}