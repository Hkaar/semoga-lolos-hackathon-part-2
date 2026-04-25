import Hero from "@/components/hero";
import Problem from "@/components/problem";
import Navbar from "@/components/navbar";
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
