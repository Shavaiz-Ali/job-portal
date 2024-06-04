"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { createJobAction } from "@/actions";

const PostNewJob = ({ profileInfo, user }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });

  const handlePostNewJobBtnValid = () => {
    if (jobFormData) {
      return Object.keys(jobFormData).every(
        (control) => jobFormData[control].trim() !== ""
      );
    }
  };

  const createNewJob = async () => {
    await createJobAction(
      {
        ...jobFormData,
        recruiterId: user?.id,
        applicants: [],
      },
      "/jobs"
    );
    setJobFormData({
      ...initialPostNewJobFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    });

    setOpenDialog(false);
  };
  return (
    <div>
      <Button
        onClick={() => setOpenDialog(true)}
        className="disabled:opacity-60 flex justify-center items-center px-5 h-11"
      >
        Post A Job
      </Button>
      <Dialog
        open={openDialog}
        onOpenChange={() => {
          setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
          });
          setOpenDialog(false);
        }}
      >
        <DialogContent className="sm:max-w-screen md:h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
                buttonText={"Add"}
                formData={jobFormData}
                setFormData={setJobFormData}
                formControls={postNewJobFormControls}
                isBtnDisabled={!handlePostNewJobBtnValid()}
                action={createNewJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostNewJob;
