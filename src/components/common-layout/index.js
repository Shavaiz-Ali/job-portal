import React from "react";
import Header from "../header";
import { currentUser } from "@clerk/nextjs/server";
import { fetchProfileCreateAction } from "@/actions";

const CommonLayout = async ({ children }) => {
  const user = (await currentUser()) ? (
    await currentUser()
  ) : (
    null
  );
  const profileInfo = await fetchProfileCreateAction(user?.id);
  return (
    <div className="mx-auto max-w-7xl lg:px-8 p-6">
      <Header
        user={JSON.parse(JSON.stringify(user))}
        profileInfo={profileInfo}
      />
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;
