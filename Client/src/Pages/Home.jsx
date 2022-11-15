import React from "react";
import Header from "../Components/Header/Header";
const user = localStorage.getItem("user");
console.log(user, "  bbb");
function Home() {
  return (
    <>
      <Header />
      <h1>Welcome to home</h1>
    </>
  );
}

export default Home;
