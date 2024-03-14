import { Medal } from "lucide-react";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          Nº 1 Em Gerenciamento de Tarefas
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          O jeito mais facil de gerenciar os
        </h1>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          <span className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
            projectos
          </span>{" "}
          da sua{" "}
          <span className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
            loja
          </span>
        </h1>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Controlar os prazos combinados, documentos, contratos, agendamentos,
        conversas, tudo em um só lugar.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Criar conta</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
