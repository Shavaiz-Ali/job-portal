"use server";

import { dbConnecttion } from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

// Create profile action
export const createProfileCreateAction = async (formData, pathToRevalidate) => {
  await dbConnecttion();
  try {
    if (!formData || !pathToRevalidate) {
      // Corrected to logical OR
      return {
        success: false,
        message: "Something is missing! Please try again",
      };
    } else {
      await Profile.create(formData);
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "Profile created successfully",
      };
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

export const fetchProfileCreateAction = async (id) => {
  await dbConnecttion();
  try {
    const profile = await Profile.findOne({ userId: id });
    return JSON.parse(JSON.stringify(profile));
  } catch (error) {
    console.error(error); // Log the error for debugging
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

// Create job action
export const createJobAction = async (formData, pathToRevalidate) => {
  await dbConnecttion();
  try {
    if (!formData || !pathToRevalidate) {
      // Corrected to logical OR
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
    console.error(error); // Log the error for debugging
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

export const deleteSingleJobAction = async (jobID, id, pathToRevalidate) => {
  await dbConnecttion(); // Assuming this is a typo and should be dbConnection()
  try {
    // Find the job by ID and delete it if it belongs to the specified recruiter
    const deletedJob = await Job.findOneAndDelete({
      _id: jobID,
      recruiterId: id,
    });

    if (!deletedJob) {
      return {
        success: false,
        message: "Job not found or you don't have permission to delete it",
      };
    }
    revalidatePath(pathToRevalidate);
    return {
      success: true,
      message: "Job deleted successfully",
    };
  } catch (error) {
    console.error(error); // Log the error for debugging
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

// Fetch job for recruiter action
export const fetchJobForRecruiterAction = async (id) => {
  await dbConnecttion();
  try {
    const jobs = await Job.find({ recruiterId: id });
    return JSON.parse(JSON.stringify(jobs));
  } catch (error) {
    console.error(error); // Log the error for debugging
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

// Fetch candidate jobs action
export const fetchCandidateJobsAction = async (filterParams = {}) => {
  await dbConnecttion();
  try {
    let updatedParams = {};
    Object.keys(filterParams).forEach((filterKey) => {
      updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
    });
    console.log(updatedParams, "updatedParams");
    const result = await Job.find(
      filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
    );
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error(error); // Log the error for debugging
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

// Create job application action
export const createJobApplicationAction = async (data, pathToRevalidate) => {
  await dbConnecttion();
  try {
    await Application.create(data);
    revalidatePath(pathToRevalidate);
    return {
      success: true,
      message: "Application created successfully",
    };
  } catch (error) {
    console.error(error); // Log the error for debugging
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

// Fetch job application for candidate
export const fetchJobApplicationForCandidateAction = async (id) => {
  await dbConnecttion();
  try {
    const applications = await Application.find({ candidateUserID: id });
    return JSON.parse(JSON.stringify(applications));
  } catch (error) {
    console.error(error); // Log the error for debugging
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

// Fetch job application for recruiter
export const fetchJobApplicationForRecruiterAction = async (id) => {
  await dbConnecttion();
  try {
    const applications = await Application.find({ recruiterUserID: id });
    return JSON.parse(JSON.stringify(applications));
  } catch (error) {
    console.error(error); // Log the error for debugging
    return {
      success: false,
      message: "Internal server error",
    };
  }
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
  try {
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
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
    };
  }
}

// get candidate details by candidate Id
export const getCandidateDetailsByIdAction = async (id) => {
  await dbConnecttion();
  try {
    const candidate = await Profile.findOne({ userId: id });
    return JSON.parse(JSON.stringify(candidate));
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

//filter categories
export const filterCategoriesAction = async () => {
  await dbConnecttion();
  try {
    const categories = await Job.find({});
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

//update profile action

export async function updateProfileAction(data, pathToRevalidate) {
  await dbConnecttion();
  try {
    if (!data)
      return {
        success: false,
        message: "Something is missing! Please try again",
      };
    const {
      userId,
      role,
      email,
      isPremiumUser,
      memberShipType,
      memberShipStartDate,
      memberShipEndDate,
      recruiterInfo,
      candidateInfo,
      _id,
    } = data;

    const updatedData = await Profile.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        userId,
        role,
        email,
        isPremiumUser,
        memberShipType,
        memberShipStartDate,
        memberShipEndDate,
        recruiterInfo,
        candidateInfo,
      },
      { new: true }
    );
    revalidatePath(pathToRevalidate);

    return {
      success: true,
      message: "updated successfully",
      updatedData,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
      error: error,
    };
  }
}

//create stripe price id based on tier selection
export async function createPriceIdAction(data) {
  const session = await stripe.prices.create({
    currency: "inr",
    unit_amount: data?.amount * 100,
    recurring: {
      interval: "year",
    },
    product_data: {
      name: "Premium Plan",
    },
  });

  return {
    success: true,
    id: session?.id,
  };
}

//create payment logic
export async function createStripePaymentAction(data) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    success_url: `${process.env.URL}/membership` + "?status=success",
    cancel_url: `${process.env.URL}/membership` + "?status=cancel",
  });

  return {
    success: true,
    id: session?.id,
  };
}
