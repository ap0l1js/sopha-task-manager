import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
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
