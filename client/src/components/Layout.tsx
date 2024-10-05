import React from "react";
import NavigationBar from "../components/MainPage/NavigationBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <NavigationBar />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Outlet/> { /**? Здесь в будущум будут все страницы  */}
    </div>
    </div>
    </div>
  );
}
