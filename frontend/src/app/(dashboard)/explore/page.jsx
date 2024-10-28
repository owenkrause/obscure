import CreatorCard from "./(components)/creatorCard";
import { CREATORS } from "@/hooks/useCreators";

export default function Explore() {
  return (
    <div className="m-10">
      <h2 className="text-2xl font-bold ml-3">Featured Creators</h2>
      <div className="grid grid-cols-4 mt-1">
        {CREATORS.map((creator) => (
          <CreatorCard creator={creator} />
        ))}
      </div>
    </div>
  );
}
