import Hero from "@/components/hero";
import Problem from "@/components/problem";
import Navbar from "@/components/navbar";
import Image from "next/image";
import HowItWorks from "@/components/how-it-works";

export default function Home() {
  return (
    <>
    <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
    </>
  );
}
