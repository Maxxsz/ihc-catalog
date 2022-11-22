import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";
import ResultList from "./ResultList";
import InstrumentDetail from "./InstrumentDetail";


function AppRoutes(){
   return(
       <BrowserRouter>
            <Routes>
              <Route element={ <Login/> }  path="/admin" exact />
              <Route element={ <Home/> }  path="/" exact />
              <Route element={ <Admin/> }  path="/admin_dboard" exact />
              <Route element={ <ResultList/> }  path="/result/:subID" exact />
              <Route element={ <InstrumentDetail/> }  path="/instrument_detail" exact />
            </Routes>
       </BrowserRouter>
   )
}

export default AppRoutes
