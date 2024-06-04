import {
  fetchCandidateJobsAction,
  fetchJobApplicationForCandidateAction,
} from "@/actions";
import CandidateActivity from "@/components/candidate-activity";
import { currentUser } from "@clerk/nextjs/dist/types/server";
import React from "react";

const Activity = async () => {
  const user = currentUser();
  const jobList = await fetchCandidateJobsAction();
  const jobApplicants = await fetchJobApplicationForCandidateAction();
  return <CandidateActivity jobList={jobList} jobApplicants={jobApplicants}/>;
};

export default Activity;
