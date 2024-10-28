import { CREATORS } from "@/hooks/useCreators";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navigation from "./navigation";

export default async function Layout({ params, children }) {
  const { address } = params;
  const creator = CREATORS.find((creator) => creator.address === address);

  if (!creator) redirect("/explore");

  return (
    <div className="my-10 w-full">
      <div className="flex gap-6 mx-24">
        <img src={creator.avatar} alt="" className="w-32 h-32 rounded-md" />
        <div>
          <h2 className="text-4xl font-bold mb-2">{address}</h2>
          <p className="text-muted-foreground">{creator.description}</p>
        </div>
      </div>
      <Navigation />
      {children}
    </div>
  );
}
