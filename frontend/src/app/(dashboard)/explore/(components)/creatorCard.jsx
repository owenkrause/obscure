export default function CreatorCard({ creator, variant = "square" }) {
  console.log(creator);
  return (
    <a href={`/${creator.address}`} className="hover:bg-muted p-3 rounded-2xl">
      <img className="rounded-xl" src={creator.avatar} alt="avatar" />
      <p className="font-bold px-2 mt-2">{creator.address}</p>
      <p className="px-2 text-sm text-muted-foreground">
        {creator.description}
      </p>
    </a>
  );
}
