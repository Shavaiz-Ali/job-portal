"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CommonForm from "../common-form";
import {
  candidateFormControls,
  initialCandidateFormData,
  intialRecruiterFormData,
  recruiterFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileCreateAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://iklbjnoopszqonqmjtvr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrbGJqbm9vcHN6cW9ucW1qdHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNjYwNzAsImV4cCI6MjAzMjY0MjA3MH0.vMz9oIyfZarc-wwWwEAsca_QD8zQIe_hdLU32pD6C2A"
);

const OnBoard = () => {
  const [currentTab, setCurrentTab] = useState("canditate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    intialRecruiterFormData
  );
  const [candiateFormData, setCandiateFormData] = useState(
    initialCandidateFormData
  );
  const [file, setFile] = useState(null);

  const currentAuthUser = useUser();
  const { user } = currentAuthUser;

  const handleTabChange = (curVal) => {
    setCurrentTab(curVal);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleUploadResumeInSupabase = async () => {
    const { data, error } = await supabaseClient.storage
      .from("job-portal-2")
      .upload(`/pubic/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    console.log(data, error);

    if (data) {
      setCandiateFormData({
        ...candiateFormData,
        resume: data.path,
      });
    }
  };

  useEffect(() => {
    if (file) handleUploadResumeInSupabase();
  }, [file]);

  const handleRecruiterFormValid = () => {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== "" &&
      recruiterFormData.companyName.trim() !== ""
    );
  };

  const handleCandiateFormValid = () => {
    if(candiateFormData){
      return Object.keys(candiateFormData).every(
        (key) => candiateFormData[key] !== ""
      );
    }
  };

  // console.log(candiateFormData)

  const createProfileAction = async () => {
    const data =
      currentTab === "canditate"
        ? {
            candidateInfo: candiateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress.emailAddress,
          };

    await createProfileCreateAction(data, "/onboard");
  };
  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-ful">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gary-900">
              Welcome to onboard page
            </h1>
            <TabsList>
              <TabsTrigger value="canditate">Canditate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="canditate">
          <CommonForm
            formControls={candidateFormControls}
            buttonText="Onboard as canditate"
            btnType={"submit"}
            formData={candiateFormData}
            setFormData={setCandiateFormData}
            handleFileChange={handleFileChange}
            action={createProfileAction}
            isBtnDisabled={!handleCandiateFormValid()}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <CommonForm
            formControls={recruiterFormControls}
            buttonText="Onboard as recruiter"
            btnType={"submit"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!handleRecruiterFormValid()}
            action={createProfileAction}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnBoard;
