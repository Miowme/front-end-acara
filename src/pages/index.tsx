import { Inter } from "next/font/google";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Home from "@/components/views/Home";

const HomePage = () => {
  return (
    <LandingPageLayout title="Home">
      <Home />
    </LandingPageLayout>
  );
}

export default HomePage;