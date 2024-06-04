"use client";
import React, { Fragment } from "react";
import JobIcon from "../job-icon";
import JobApplicants from "../job-applicants";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  getCandidateDetailsByIdAction,
  updateJobApplicationAction,
} from "@/actions";
import { createClient } from "@supabase/supabase-js";
const supabaseClient = createClient(
  "https://iklbjnoopszqonqmjtvr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrbGJqbm9vcHN6cW9ucW1qdHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNjYwNzAsImV4cCI6MjAzMjY0MjA3MH0.vMz9oIyfZarc-wwWwEAsca_QD8zQIe_hdLU32pD6C2A"
);
const CandidateList = ({
  jobApplicationList,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) => {
  const handleFetchCandidateDetails = async (id) => {
    const data = await getCandidateDetailsByIdAction(id);
    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  };

  const handlePreviewResume = () => {
    const { data } = supabaseClient.storage
      .from("job-portal-2")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("target", "_blank");
    a.setAttribute("download", "Resume.pdf");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpdateJobStatus = async (getCurrentStatus) => {
    let copyJobApplicants = [...jobApplicationList];
    const indexOfCurrentJobApplicant = copyJobApplicants.findIndex(
      (item) => item.candidateUserID === currentCandidateDetails?.userId
    );
    const jobApplicantsToUpdate = {
      ...copyJobApplicants[indexOfCurrentJobApplicant],
      status:
        copyJobApplicants[indexOfCurrentJobApplicant].status.concat(
          getCurrentStatus
        ),
    };

    console.log(jobApplicantsToUpdate, "jobApplicantsToUpdate");
    await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
  };

  console.log("updated data", jobApplicationList);
  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplicationList && jobApplicationList.length > 0
          ? jobApplicationList.map((jobApplication) => (
              <div
                className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4"
                key={jobApplication.id}
              >
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold dark:text-black">
                    {jobApplication?.name}
                  </h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplication?.candidateUserID
                      )
                    }
                    className="dark:bg-[#fffa27]  flex h-11 items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : ""}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent>
          <div>
            <h1 className="text-2xl font-bold dark:text-white text-black">
              {currentCandidateDetails?.candidateInfo.name},
              {currentCandidateDetails?.email}
            </h1>
            <p className="text-xl font-medium dark:text-white text-black">
              {currentCandidateDetails?.candidateInfo.currentCompany}
            </p>
            <p className="text-sm font-normal dark:text-white text-black">
              {currentCandidateDetails?.candidateInfo.currentJobLocation}
            </p>
            <p className="dark:text-white">
              Total Experience:{" "}
              {currentCandidateDetails?.candidateInfo.totalExperience} Years
            </p>
            <p className="dark:text-white">
              Salary: {currentCandidateDetails?.candidateInfo.currentSalary} LPA
            </p>
            <p>
              Notice Period:{" "}
              {currentCandidateDetails?.candidateInfo.noticePeriod} Days
            </p>
            <div className="mt-6">
              <h3 className="mb-3 dark:text-white">Previous Companies:</h3>
              <div className="flex flex-wrap  gap-4">
                {currentCandidateDetails?.candidateInfo.previousCompanies
                  .split(",")
                  .map((skill, index) => (
                    <div
                      className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                      key={index}
                    >
                      <h2 className="text-[13px] font-medium text-white">
                        {skill}
                      </h2>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="mb-3">Skills:</h3>
              <div className="flex flex-wrap  gap-4">
                {currentCandidateDetails?.candidateInfo.skills
                  .split(",")
                  .map((skill, index) => (
                    <div
                      className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                      key={index}
                    >
                      <h2 className="text-[13px] font-medium text-white">
                        {skill}
                      </h2>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handlePreviewResume}
              className=" flex h-11 items-center justify-center px-5"
            >
              Resume
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("selected")}
              className=" disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={
                jobApplicationList
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected") ||
                jobApplicationList
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
                  ? true
                  : false
              }
            >
              {jobApplicationList
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("selected")
                ? "Selected"
                : "Select"}
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("rejected")}
              className=" disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={
                jobApplicationList
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected") ||
                jobApplicationList
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
                  ? true
                  : false
              }
            >
              {jobApplicationList
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("rejected")
                ? "Rejected"
                : "Reject"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default CandidateList;
