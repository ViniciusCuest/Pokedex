interface Props {
  params: {
    slug: string;
  }
}

export default async function Pokemon({ params }: Props) {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  return (
    <h1>{params.slug}</h1>
  );
}
