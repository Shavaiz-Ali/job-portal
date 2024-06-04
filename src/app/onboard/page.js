import { fetchProfileCreateAction } from "@/actions";
import OnBoard from "@/components/on-board";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const OnBoardPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfileCreateAction(user?.id);
  if (!user && !profileInfo) redirect("/");
  if (profileInfo?._id) {
    if (profileInfo?.role === "recruiter" && !profileInfo.isPremiumUser)
      redirect("/membership");
    else redirect("/");
  } else return <OnBoard />;
};

export default OnBoardPage;
