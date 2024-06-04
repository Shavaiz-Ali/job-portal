"use client";

import React, { useState } from "react";
import CommonCard from "../common-card";
import { Button } from "../ui/button";
import JobIcon from "../job-icon";
import JobApplicants from "../job-applicants";

const RecruiterJobCard = ({ job, jobApplicationList }) => {
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);
  return (
    <div>
      <CommonCard
        icon={<JobIcon />}
        title={job?.title}
        footerContent={
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
    </div>
  );
};

export default RecruiterJobCard;
