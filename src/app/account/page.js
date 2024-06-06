import { fetchProfileCreateAction, getCandidateDetailsByIdAction } from "@/actions";
import AccountInfo from "@/components/account-info";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Account = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfileCreateAction(user?.id);
  if (!profileInfo) redirect("/onboard");
  const data = await getCandidateDetailsByIdAction(user?.id);
  return <AccountInfo profileInfo={profileInfo} apiData={data} />;
};

export default Account;
