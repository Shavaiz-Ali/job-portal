"use client";

import React, { Fragment, useEffect, useState } from "react";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import CandidateJobCard from "../candidate-job-card";
import { filterMenuDataArray, formUrlQuery } from "@/utils";
import { Menubar, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import { MenubarContent, MenubarItem } from "@radix-ui/react-menubar";
import { Label } from "../ui/label";
import { useRouter, useSearchParams } from "next/navigation";

const JobsListing = ({
  user,
  profileInfo,
  jobsList,
  jobApplicationList,
  fetchFilterCategories,
}) => {
  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (id, curOption) => {
    let copyFilterParams = { ...filterParams };
    const indexOfCurrentSection = Object.keys(copyFilterParams).indexOf(id);
    if (indexOfCurrentSection === -1) {
      copyFilterParams = {
        ...copyFilterParams,
        [id]: [curOption],
      };
    } else {
      const indexOfCurrentOption = copyFilterParams[id].indexOf(curOption);
      console.log("indexOfCurrentOption", indexOfCurrentOption);
      if (indexOfCurrentOption === -1) {
        copyFilterParams[id].push(curOption);
      } else {
        copyFilterParams[id].splice(indexOfCurrentOption, 1);
      }
    }
    setFilterParams(copyFilterParams);
    sessionStorage.setItem("filterParams", JSON.stringify(copyFilterParams));
  };

  useEffect(() => {
    setFilterParams(JSON.parse(sessionStorage.getItem("filterParams")));
  }, []);

  useEffect(() => {
    if (filterParams && Object.keys(filterParams).length > 0) {
      let url = "";
      url = formUrlQuery({
        params: searchParams.toString(),
        dataToAdd: filterParams,
      });
      router.push(url, { scroll: false });
    }
  }, [filterParams, searchParams]);

  const filterMenus = filterMenuDataArray.map((item) => ({
    id: item.id,
    name: item.label,
    options: [
      ...new Set(fetchFilterCategories.map((listItem) => listItem[item.id])),
    ],
  }));
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {profileInfo?.role === "candidate"
            ? "Explore All Jobs"
            : "Jobs Dashboard"}
        </h1>
        <div className="flex items-center">
          {profileInfo?.role === "candidate" ? (
            <Menubar>
              {filterMenus.map((filterMenu, index) => (
                <MenubarMenu key={index}>
                  <MenubarTrigger>{filterMenu.name}</MenubarTrigger>
                  <MenubarContent className="space-y-2 bg-white z-[999] p-5 border rounded ">
                    {filterMenu.options.map((option, index) => (
                      <MenubarItem
                        key={index}
                        className="flex items-center"
                        onClick={() => handleFilter(filterMenu.id, option)}
                      >
                        <div
                          className={`h-4 w-4 dark:border-white border rounded border-gray-900 ${
                            filterParams &&
                            Object.keys(filterParams).length > 0 &&
                            filterParams[filterMenu.id] &&
                            filterParams[filterMenu.id].indexOf(option) > -1
                              ? "bg-black dark:bg-white"
                              : ""
                          } `}
                        />
                        <Label className="ml-3 cursor-pointer text-sm text-gray-600">
                          {option}
                        </Label>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              ))}
            </Menubar>
          ) : (
            <PostNewJob user={user} profileInfo={profileInfo} />
          )}
        </div>
      </div>
      <div className="pt-6 pb-24">
        <div className="grid grid-col-1 gap-x-8 gap-y-10 lg:grid-cols-3">
          <div className="lg:col-span-4">
            <div className="container mx-auto p-0 space-y-8">
              <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                {jobsList && jobsList?.length > 0
                  ? jobsList.map((job) => (
                      <Fragment key={job._id}>
                        {profileInfo?.role === "candidate" ? (
                          <CandidateJobCard
                            jobApplicationList={jobApplicationList}
                            profileInfo={profileInfo}
                            job={job}
                          />
                        ) : (
                          <RecruiterJobCard
                            jobApplicationList={jobApplicationList}
                            profileInfo={profileInfo}
                            job={job}
                            user={user}
                          />
                        )}
                      </Fragment>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsListing;
