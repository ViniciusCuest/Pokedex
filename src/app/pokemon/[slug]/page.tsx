import RootLayout from "@/app/layout";

export default function Pokemon({ params }) {
  return (
    <RootLayout>
      <h1>{params.slug}</h1>
    </RootLayout>
  );
}
