/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import imageUpload from "@/utils/imageUpload";
import { Button } from "@/components/ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAddNewProjectsMutation } from "@/redux/features/projects/project.api";
const AddNewProject = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [addNewProject] = useAddNewProjectsMutation(undefined);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const image = data.image[0];
      const imageData = await imageUpload(image);
      const projectInfo = {
        name: data.name,
        description: data.description,
        image: imageData,
        type: data.type,
        technologies: data.technologies,
        clientGithubLink: data.clientGithubLink,
        serverGithubLink: data.serverGithubLink,
        liveLink: data.liveLink,
      };
      const res = await addNewProject(projectInfo).unwrap();
      if (res?.success === true) {
        toast.success(res?.message);
        reset();
        router.push("/dashboard/projects");
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-0">
      <div className="pt-10 px-4 bs:px-0">
        <div className="flex items-center justify-between mb-5 pt-8 md:px-14">
          <h2 className="text-base sm:text-lg bs:text-xl font-bold text-light-text-100 dark:text-dark-text-100 ">Add New Project</h2>
          <Button onClick={() => router.push("/dashboard/projects")}>
            <IoMdArrowRoundBack />
          </Button>
        </div>

        <form
          className=" shadow-light-container-shadow dark:shadow-dark-container-shadow md:px-14   rounded-md pb-10"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          {/* form row */}
          <div className="mb-3 md:mb-5">
            <div className="w-full">
              <Label>
                Project Name<span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Enter project Name"
                className="mt-1.5 dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-secondary-txt"
                {...register("name", { required: true })}
              />
              {errors.name && <span className="text-red-600 text-xs font-medium mt-0 ml-1">Project Name is required</span>}
            </div>
          </div>
          {/* form row */}
          <div className="mb-3 md:mb-5">
            <Label>
              Project Description<span className="text-red-700">*</span>
            </Label>
            <textarea
              className="w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:shadow-md disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:text-dark-secondary-txt text-light-secondary-txt mt-1.5 dark:border-[#1e232e] placeholder:text-muted-foreground  focus-visible:ring-1 focus-visible:ring-ring "
              id=""
              cols={30}
              rows={8}
              placeholder="Write your project description...."
              {...register("description", { required: true })}
            />
            {errors.description && <span className="text-red-600 text-xs font-medium mt-0 ml-1">Project Description is required</span>}
          </div>

          {/* form row */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 mb-3 md:mb-5">
            <div className="w-full md:w-1/2">
              <div className="flex flex-col gap-3 mt-1">
                {/* File Upload Button */}
                <Label>
                  Upload Project Image<span className="text-red-700">*</span>
                </Label>
                <label
                  htmlFor="file_input"
                  className="cursor-pointer flex items-center justify-center px-4 py-2  text-slate-700 font-medium rounded-lg text-base transition-all duration-300 flex-1 w-full  border-[#dddcdc] border dark:border-[#1e232e]"
                >
                  <FiUpload className="w-3 h-3 xs:w-5 xs:h-5 mr-2" />
                  {/* Display Selected File Name */}
                  <p className="text-sm text-slate-500 font-medium ">{watch("image")?.[0]?.name ? `${watch("image")[0].name}` : "Select Image"}</p>
                </label>

                {/* Hidden File Input */}
                <input className="hidden" id="file_input" type="file" accept="image/*" {...register("image", { required: true })} />
              </div>
              {errors.image && <span className="text-red-600 text-xs font-medium mt-0 ml-1">Project Image is required</span>}
            </div>
            <div className="w-full md:w-1/2">
              <Label>
                Project Type<span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Enter blog category"
                className="mt-1.5 dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-secondary-txt"
                {...register("type", { required: true })}
              />
              {errors.type && <span className="text-red-600 text-xs font-medium mt-0 ml-1">Project Type is required</span>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 mb-3 md:mb-5">
            <div className="w-full md:w-1/2">
              <Label>
                Technologies<span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Technology1, Technology2, Technology3, ..."
                className="mt-1.5 dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-secondary-txt"
                {...register("technologies", { required: true })}
              />
              {errors.technologies && <span className="text-red-600 text-xs font-medium mt-0 ml-1">Technologies are required</span>}
            </div>
            <div className="w-full md:w-1/2">
              <Label>
                Project Live Link<span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Enter project live link"
                className="mt-1.5 dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-secondary-txt"
                {...register("liveLink", { required: true })}
              />
              {errors.liveLink && <span className="text-red-600 text-xs font-medium mt-0 ml-1">Project Live Link is required</span>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 mb-3 md:mb-5">
            <div className="w-full md:w-1/2">
              <Label>Client Github Repo Link</Label>
              <Input
                type="text"
                placeholder="Enter Client github repo link"
                className="mt-1.5 dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-secondary-txt"
                {...register("clientGithubLink")}
              />
            </div>
            <div className="w-full md:w-1/2">
              <Label>Server Github Repo Link</Label>
              <Input
                type="text"
                placeholder="Enter Server github repo link"
                className="mt-1.5 dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-secondary-txt"
                {...register("serverGithubLink")}
              />
            </div>
          </div>

          {/* button */}
          <div className=" mt-8 ">
            <Button type="submit" disabled={loading} className="sm-mx:w-full w-32">
              {loading ? <BiLoaderCircle className="animate-spin" /> : "Add Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProject;
