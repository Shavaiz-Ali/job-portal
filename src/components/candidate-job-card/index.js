"use client";

import React, { Fragment, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { createJobApplicationAction } from "@/actions";

const CandidateJobCard = ({ job, profileInfo, jobApplicationList }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleJobApply = async () => {
    await createJobApplicationAction(
      {
        recruiterUserID: job?.recruiterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobID: job?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );
    setOpenDrawer(false);
  };
  return (
    <Fragment>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <CommonCard
          icon={<JobIcon />}
          title={job?.title}
          description={job?.companyName}
          footerContent={
            <Button
              onClick={() => setOpenDrawer(true)}
              className=" flex h-11 items-center justify-center px-5"
            >
              View Details
            </Button>
          }
        />
        <DrawerContent className="p-6">
          <DrawerHeader className={"px-0"}>
            <div className="flex justify-between">
              <DrawerTitle className="text-4xl font-extrabold text-gray-800   ">
                {job?.title}
              </DrawerTitle>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleJobApply()}
                  disabled={jobApplicationList.findIndex(
                    (item) => item.jobID === job?._id
                  ) > -1 ? true : false}
                  className="disabled:opacity-50 disabled:cursor-not-allowed flex h-11 items-center justify-center px-5"
                >
                  {jobApplicationList.findIndex(
                    (item) => item.jobID === job?._id
                  ) > -1 ? "Applied" : "Apply"}
                </Button>
                <Button
                  className=" flex h-11 items-center justify-center px-5"
                  onClick={() => setOpenDrawer(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className="text-2xl font-medium text-gray-600">
            {job?.description}
            <span className="text-xl font-normal ml-4 text-gray-500">
              {job?.location}
            </span>
          </DrawerDescription>
          <div className="w-[150px] mt-6 flex justify-center items-center h-[40px] bg-black rounded-[4px]">
            <h2 className="text-xl font-bold text-white">{job?.type} Time</h2>
          </div>
          <h3 className="text-2xl font-medium text-black mt-3">
            Experience {job?.experience} Year
          </h3>
          <div className="flex gap-4 mt-6">
            {job?.skills.split(",").map((skill, index) => (
              <div
                className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                key={index}
              >
                <h2 className="text-[13px] font-medium text-white">{skill}</h2>
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};

export default CandidateJobCard;
