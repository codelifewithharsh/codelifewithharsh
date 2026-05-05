import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolkitContent from "./ToolkitContent";

export const metadata: Metadata = {
  title: "Toolkit | Harsh",
  description:
    "Everything I use to build, learn, and ship AI products - curated for developers who want to actually get things done.",
};

export default function ToolkitPage() {
  return (
    <>
      <Navbar />
      <ToolkitContent />
      <Footer />
    </>
  );
}
