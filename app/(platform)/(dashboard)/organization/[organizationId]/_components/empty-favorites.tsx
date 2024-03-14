import Image from "next/image";

export const EmptyFavorites = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" height={140} width={140} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">Sem boards favoritos</h2>
      <p className="text-muted-foreground textg-sm mt-2">
        Favorite boards para visualizar aqui
      </p>
    </div>
  );
};
