import {
  fetchCandidateJobsAction,
  fetchJobApplicationForCandidateAction,
} from "@/actions";
import CandidateActivity from "@/components/candidate-activity";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Activity = async () => {
  const user = await currentUser();
  console.log("this is id", user);

  const jobList = await fetchCandidateJobsAction();
  const jobApplicants = await fetchJobApplicationForCandidateAction(user?.id);
  return <CandidateActivity jobList={jobList} jobApplicants={jobApplicants} />;
};

export default Activity;
