import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { Banner } from "./components/Banner";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Banner />
      <br></br>
      <About />
    </>
  );
}