import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: {
            boxShadow: "none",
          },
          card: {
            border: "1px solid #e5e5e5",
            boxShadow: "none",
            width: "100%",
          },
        },
      }}
    />
  );
}
