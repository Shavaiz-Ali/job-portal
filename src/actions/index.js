"use server";

import { dbConnecttion } from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

//create profile acrion

export const createProfileCreateAction = async (formData, pathToRevalidate) => {
  await dbConnecttion();
  try {
    if (!formData && pathToRevalidate) {
      return {
        success: false,
        message: "Something is missing! Please try again",
      };
    } else {
      await Profile.create(formData);
      revalidatePath(pathToRevalidate);
    }
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

export const fetchProfileCreateAction = async (id) => {
  await dbConnecttion();
  const profile = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(profile));
};

//create job action
export const createJobAction = async (formData, pathToRevalidate) => {
  await dbConnecttion();
  try {
    if (!formData && pathToRevalidate) {
      return {
        success: false,
        message: "Something is missing! Please try again",
      };
    } else {
      await Job.create(formData);
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "Job created successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

//fetchJobForRecruiterAction

export const fetchJobForRecruiterAction = async (id) => {
  await dbConnecttion();
  const jobs = await Job.find({ recruiterId: id });
  return JSON.parse(JSON.stringify(jobs));
};

//candite jobs fetch

export const fetchCandidateJobsAction = async () => {
  await dbConnecttion();
  const jobs = await Job.find({});
  return JSON.parse(JSON.stringify(jobs));
};

//job applicaiton action

export const createJobApplicationAction = async (data, pathToRevalidate) => {
  await dbConnecttion();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
};

//fetch job application for candidate

export const fetchJobApplicationForCandidateAction = async (id) => {
  await dbConnecttion();
  const applications = await Application.find({ candidateUserID: id });
  return JSON.parse(JSON.stringify(applications));
};

//fetch job application for Recruiter

export const fetchJobApplicationForRecruiterAction = async (id) => {
  await dbConnecttion();
  const applications = await Application.find({ recruiterUserID: id });
  return JSON.parse(JSON.stringify(applications));
};

//update job application
export async function updateJobApplicationAction(data, pathToRevalidate) {
  await dbConnecttion();
  const {
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    _id,
    jobAppliedDate,
  } = data;
  await Application.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jobAppliedDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}
// get candidate details by candidate Id

export const getCandidateDetailsByIdAction = async (id) => {
  await dbConnecttion();
  const candidate = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(candidate));
};
