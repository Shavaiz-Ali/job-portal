"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const CandidateActivity = ({ jobList, jobApplicants }) => {
  const uniqueStatusArray = [
    ...new Set(
      jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1)
    ),
  ];
  return (
    <div className="mx-auto max-w-7xl">
      <Tabs defaultValue="Applied" className="w-full">
        <div className="flex items-baseline dark:border-white justify-between border-b pb-6 pt-24">
          <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
            Your Activity
          </h1>
        </div>
        <TabsList>
          {uniqueStatusArray.map((status, index) => (
            <TabsTrigger value={status} key={index}>
              {status}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CandidateActivity;
