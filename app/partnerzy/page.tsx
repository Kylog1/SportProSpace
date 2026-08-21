import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Partnerzy } from "@/components/sections/Partnerzy";

export const metadata: Metadata = {
  title: "Partnerzy - Sport Space Pro",
  description:
    "Poznaj FootLog, aplikację do monitorowania formy młodych piłkarzy oraz bezpłatny Pro Audyt dojrzałości operacyjnej akademii piłkarskich.",
  alternates: {
    canonical: "https://sportspacepro.pl/partnerzy",
  },
  openGraph: {
    title: "Partnerzy - Sport Space Pro",
    description:
      "FootLog to aplikacja dla młodych piłkarzy, rodziców i trenerów oraz bezpłatny Pro Audyt dojrzałości operacyjnej akademii piłkarskich.",
    type: "website",
  },
};

export default function PartnerzyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <Partnerzy />
      </main>
      <Footer />
    </>
  );
}
