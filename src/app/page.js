import { fetchProfileCreateAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (user) {
    const profileInfo = await fetchProfileCreateAction(user?.id);
    if (user && !profileInfo?._id) redirect("/onboard");
  }
  return <section>main</section>;
}
