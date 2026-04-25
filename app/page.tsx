import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Problem from "@/components/problem";
import Image from "next/image";

export default function Home() {
  return (
    <>
     <Navbar />
      <Hero />
      <Problem />
    </>
  );
}
