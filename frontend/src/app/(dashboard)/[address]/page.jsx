import { CREATORS } from "@/hooks/useCreators";

export default async function Page({ params }) {
  const { address } = params;
  const creator = CREATORS.find((creator) => creator.address === address);

  return (
    <div className="my-10 mx-14">
      <div className="flex gap-6">
        <img src={creator.avatar} alt="" className="w-32 h-32 rounded-md" />
        <div>
          <h2 className="text-4xl font-bold mb-2">{address}</h2>
          <p className="text-muted-foreground">{creator.description}</p>
        </div>
      </div>
    </div>
  );
}
