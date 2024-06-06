"use client";

import {
  recruiterFormControls,
  candidateFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  initialCandidateAccountFormData,
} from "@/utils";
import React, { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";

const AccountInfo = ({ profileInfo }) => {
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateAccountFormData
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (profileInfo?.role === "recruiter")
      setRecruiterFormData(profileInfo?.recruiterInfo);
    if (profileInfo?.role === "candidate")
      setCandidateFormData(profileInfo?.candidateInfo);
  }, [profileInfo]);

  const handleUpdateAccount = async () => {
    try {
      setLoader(true);
      const data = await updateProfileAction(
        profileInfo?.role === "candidate"
          ? {
              _id: profileInfo?._id,
              userId: profileInfo?.userId,
              email: profileInfo?.email,
              role: profileInfo?.role,
              isPremiumUser: profileInfo?.isPremiumUser,
              memberShipType: profileInfo?.memberShipType,
              memberShipStartDate: profileInfo?.memberShipStartDate,
              memberShipEndDate: profileInfo?.memberShipEndDate,
              candidateInfo: {
                ...candidateFormData,
                resume: profileInfo?.candidateInfo?.resume,
              },
            }
          : {
              _id: profileInfo?._id,
              userId: profileInfo?.userId,
              email: profileInfo?.email,
              role: profileInfo?.role,
              isPremiumUser: profileInfo?.isPremiumUser,
              memberShipType: profileInfo?.memberShipType,
              memberShipStartDate: profileInfo?.memberShipStartDate,
              memberShipEndDate: profileInfo?.memberShipEndDate,
              recruiterInfo: {
                ...recruiterFormData,
              },
            },
        "/account"
      );
      if (data) {
        alert("profile updated successfully");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline justify-between pb-6 border-b pt-24">
        <h1 className="text-4xl tracking-tight text-gray-950 font-bold">
          Account Details
        </h1>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <CommonForm
            action={handleUpdateAccount}
            formControls={
              profileInfo?.role === "candidate"
                ? candidateFormControls.filter((item) => item.name !== "resume")
                : recruiterFormControls
            }
            formData={
              profileInfo?.role === "candidate"
                ? candidateFormData
                : recruiterFormData
            }
            setFormData={
              profileInfo?.role === "candidate"
                ? setCandidateFormData
                : setRecruiterFormData
            }
            buttonText={"Update"}
            loader={loader}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
