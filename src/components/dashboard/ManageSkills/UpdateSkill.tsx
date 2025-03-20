/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateSkillMutation } from "@/redux/features/skills/skills.api";
import { TSkillFormData, TSkills } from "@/types/skill.types";
import imageUpload from "@/utils/imageUpload";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";

export const skillCategories = ["Frontend", "Backend", "Languages", "Tools"];

const UpdateSkill = ({ data }: { data: TSkills }) => {
  const [loading, setLoading] = useState(false);
  const [updateSkill] = useUpdateSkillMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSkillFormData>();

  const onSubmit = async (formData: TSkillFormData) => {
    try {
      setLoading(true);
      let imageData;
      const image = formData.icon[0];
      if (data.icon[0]) {
        imageData = await imageUpload(image);
      }

      const skillInfo = {
        label: formData.label || data?.label,
        icon: imageData || data?.icon,
        progress: formData.progress || data?.progress,
        category: formData.category || data?.category,
      };
      const res = await updateSkill({ id: data?._id, data: skillInfo }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-slate-700 hover:text-slate-900 dark:text-dark-primary-txt dark:hover:text-dark-secondary-txt border border-slate-300 dark:border-[#293553] px-2 rounded-md py-1 shadow-sm dark:dark:shadow-slate-800">
          Update
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] xs:max-w-[425px] bg-[#F4F8FB] dark:bg-dark-bg-primary rounded-lg shadow-md ">
        <DialogHeader className=" text-left">
          <DialogTitle className="text-base sm:text-lg bs:text-xl font-bold text-light-text-100 dark:text-dark-text-100">Update Skill</DialogTitle>
          <DialogDescription>Update your technical skills</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="w-full mb-5">
            <Label>
              Skill Name <span className="text-red-700">*</span>
            </Label>
            <Input
              defaultValue={data?.label}
              type="text"
              placeholder="Enter skill name"
              className="mt-1.5 dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-secondary-txt"
              {...register("label")}
            />
          </div>
          <div className="w-full mb-5">
            <Label>
              Skill Category <span className="text-red-700">*</span>
            </Label>
            <select
              defaultValue={data?.category}
              className="flex h-9 bg-[#F4F8FB] dark:bg-dark-bg-primary w-full rounded-md px-3 py-1.5  md:text-sm hover:cursor-pointer mt-1.5 focus-visible:outline-none border dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-primary-txt shadow-sm"
              {...register("category")}
            >
              <option value="" className="text-slate-300 dark:text-slate-800">
                Select category
              </option>
              {skillCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full mb-5">
            <div className="flex flex-col gap-3">
              {/* File Upload Button */}
              <Label>
                Upload Skill Icon Image <span className="text-red-700">*</span>
              </Label>
              <label
                htmlFor="file_input"
                className="cursor-pointer flex items-center justify-center px-4 py-2  text-slate-700 font-medium rounded-lg text-base transition-all duration-300 flex-1 w-full  border-[#dddcdc] border dark:border-[#1e232e]"
              >
                <FiUpload className="w-3 h-3 xs:w-5 xs:h-5 mr-2" />
                {/* Display Selected File Name */}
                <p className="text-sm text-slate-500 font-medium ">{watch("icon")?.[0]?.name ? `${watch("icon")[0].name}` : "Select Image"}</p>
              </label>

              {/* Hidden File Input */}
              <input className="hidden" id="file_input" type="file" accept="image/*" {...register("icon")} />
            </div>
          </div>
          <div className="w-full">
            <Label>
              Skill Progress <span className="text-red-700">*</span>
            </Label>
            <Input
              defaultValue={data?.progress}
              type="number"
              placeholder="Enter skill progress"
              className="mt-1.5 dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-secondary-txt"
              {...register("progress", {
                min: { value: 1, message: "Progress must be greater than 1" },
                max: { value: 100, message: "Progress must be less than 100" },
              })}
            />
            {errors.progress && <span className="text-red-600 text-xs font-medium mt-0 ml-1">{errors.progress.message}</span>}
          </div>

          <div className=" mt-8">
            <Button type="submit" disabled={loading} className="sm-mx:w-full w-32">
              {loading ? <BiLoaderCircle className="animate-spin" /> : "Update Skill"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSkill;
