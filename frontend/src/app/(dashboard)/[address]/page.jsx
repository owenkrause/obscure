import { redirect } from "next/navigation";

export default function Page({ params }) {
  const { address } = params;
  redirect(`/${address}/posts`);
}
