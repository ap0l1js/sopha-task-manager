import { Logo } from "@/components/logo";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative w-full lg:min-h-full ">
      <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12 bg-[#c10047]">
        <Image
          src="/phone.png"
          alt="sopha on phone"
          className="mx-auto"
          width={500}
          height={500}
        />
      </div>

      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#002E5D] sm:text-4xl">
              Gerenciamento de tarefas de uma forma simples.
            </h1>

            <p className="mt-2 text-base text-muted-foreground">
              Bem vindo de volta
            </p>

            <div className="mt-16 text-sm font-medium">
              <div className="flex justify-center my-12">
                <Logo size={80} />
              </div>

              <SignIn
                appearance={{
                  elements: {
                    rootBox: {
                      boxShadow: "none",
                      width: "100%",
                    },
                    card: {
                      border: "1px solid #e5e5e5",
                      boxShadow: "none",
                      width: "100%",
                    },
                  },
                }}
              />

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <Link
                  href="/"
                  className="text-sm font-medium text-[#002E5D] hover:text-blue-950"
                >
                  Voltar &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
