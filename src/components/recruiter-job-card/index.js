"use client";

import React, { useState } from "react";
import CommonCard from "../common-card";
import { Button } from "../ui/button";
import JobIcon from "../job-icon";
import JobApplicants from "../job-applicants";
import { Delius_Unicase } from "next/font/google";
import { deleteSingleJobAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { Alert } from "../alert";

const RecruiterJobCard = ({ job, jobApplicationList, user }) => {
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loader, setLoader] = useState(false);
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);

  const handleDeleteJob = async () => {
    setLoader(true);
    const data = await deleteSingleJobAction(job?._id, user?.id, "/jobs");
    if (data) {
      setLoader(false);
    }
  };
  return (
    <div>
      <CommonCard
        icon={<JobIcon />}
        title={job?.title}
        footerContent={
          <div className="flex justify-between items-center w-full">
            <Button
              onClick={() => setShowApplicantsDrawer(true)}
              className=" dark:bg-[#fffa27] disabled:opacity-55 disabled:cursor-not-allowed flex h-11 items-center justify-center px-5"
              disabled={
                jobApplicationList.filter((item) => item.jobID === job?._id)
                  .length === 0
              }
            >
              {
                jobApplicationList.filter((item) => item.jobID === job?._id)
                  .length
              }{" "}
              Applicants
            </Button>
            <Alert
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              handleDeleteJob={handleDeleteJob}
              loader={loader}
            />
          </div>
        }
      />
      <JobApplicants
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        setShowCurrentCandidateDetailsModal={
          setShowCurrentCandidateDetailsModal
        }
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        job={job}
        jobApplicationList={jobApplicationList.filter(
          (item) => item.jobID === job?._id
        )}
      />
      {/* {openDialog && (
        <Alert
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          handleDeleteJob={handleDeleteJob}
        />
      )} */}
    </div>
  );
};

export default RecruiterJobCard;
