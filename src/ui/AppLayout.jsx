import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import Background from "./Background";

function AppLayout() {
  return (
    <Background>
      <Header logo="white" />
      <Outlet />
      <Footer />
    </Background>
  );
}

export default AppLayout;
