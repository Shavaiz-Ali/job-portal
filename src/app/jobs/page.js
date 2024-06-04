import {
  fetchCandidateJobsAction,
  fetchJobApplicationForCandidateAction,
  fetchJobApplicationForRecruiterAction,
  fetchJobForRecruiterAction,
  fetchProfileCreateAction,
} from "@/actions";
import JobsListing from "@/components/job-listings";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const JobsPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfileCreateAction(user?.id);
  // console.log(profileInfo)
  const jobsList =
    profileInfo?.role === "candidate"
      ? await fetchCandidateJobsAction()
      : await fetchJobForRecruiterAction(user?.id);

  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationForCandidateAction(user?.id)
      : await fetchJobApplicationForRecruiterAction(user?.id);

  return (
    <JobsListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobsList={jobsList}
      jobApplicationList={getJobApplicationList}
    />
  );
};

export default JobsPage;
