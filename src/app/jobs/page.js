import {
  fetchCandidateJobsAction,
  fetchJobApplicationForCandidateAction,
  fetchJobApplicationForRecruiterAction,
  fetchJobForRecruiterAction,
  fetchProfileCreateAction,
  filterCategoriesAction,
} from "@/actions";
import JobsListing from "@/components/job-listings";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const JobsPage = async ({ searchParams }) => {
  const user = await currentUser();
  const profileInfo = await fetchProfileCreateAction(user?.id);
  const jobsList =
    profileInfo?.role === "candidate"
      ? await fetchCandidateJobsAction(searchParams)
      : await fetchJobForRecruiterAction(user?.id);

  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationForCandidateAction(user?.id)
      : await fetchJobApplicationForRecruiterAction(user?.id);
  const fetchFilterCategories = await filterCategoriesAction();
  return (
    <JobsListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobsList={jobsList}
      jobApplicationList={getJobApplicationList}
      fetchFilterCategories={fetchFilterCategories}
    />
  );
};

export default JobsPage;
