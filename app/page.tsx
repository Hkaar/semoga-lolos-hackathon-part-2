import Hero from "@/components/hero";
import Problem from "@/components/problem";
import Image from "next/image";
import HowItWorks from "@/components/how-it-works";
import WhyItMatters from "@/components/why-it-matters";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <WhyItMatters />
      <Footer />
    </>
  );
}
