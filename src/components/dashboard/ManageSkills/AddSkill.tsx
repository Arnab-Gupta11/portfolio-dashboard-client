/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddSkillMutation } from "@/redux/features/skills/skills.api";
import { TSkillFormData } from "@/types/skill.types";
import imageUpload from "@/utils/imageUpload";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";

export const skillCategories = ["Frontend", "Backend", "Languages", "Tools"];

const AddSkill = () => {
  const [loading, setLoading] = useState(false);
  const [addNewSkill] = useAddSkillMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSkillFormData>();

  const onSubmit = async (data: TSkillFormData) => {
    try {
      setLoading(true);
      const image = data.icon[0];
      const imageData = await imageUpload(image);
      const skillInfo = {
        label: data.label,
        icon: imageData,
        progress: data.progress,
        category: data.category,
      };
      const res = await addNewSkill(skillInfo).unwrap();
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
        <Button className="mt-5">
          <Plus />
          <span>Add Skill</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] xs:max-w-[425px] bg-[#F4F8FB] dark:bg-dark-bg-primary rounded-lg shadow-md ">
        <DialogHeader className=" text-left">
          <DialogTitle className="text-base sm:text-lg bs:text-xl font-bold text-light-text-100 dark:text-dark-text-100">Add Skills</DialogTitle>
          <DialogDescription>Add your technical skills</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="w-full mb-5">
            <Label>
              Skill Name <span className="text-red-700">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Enter skill name"
              className="mt-1.5 dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-secondary-txt"
              {...register("label", { required: true })}
            />
            {errors.label && <span className="text-red-600 text-xs font-medium mt-0 ml-1">Skill Name is required</span>}
          </div>
          <div className="w-full mb-5">
            <Label>
              Skill Category <span className="text-red-700">*</span>
            </Label>
            <select
              className="flex h-9 bg-[#F4F8FB] dark:bg-dark-bg-primary w-full rounded-md px-3 py-1.5  md:text-sm hover:cursor-pointer mt-1.5 focus-visible:outline-none border dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-primary-txt shadow-sm"
              {...register("category", { required: true })}
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
            {errors.category && <span className="text-red-600 text-xs font-medium mt-0 ml-1">Category is required</span>}
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
              <input className="hidden" id="file_input" type="file" accept="image/*" {...register("icon", { required: true })} />
            </div>
            {errors.icon && <span className="text-red-600 text-xs font-medium mt-0 ml-1">Skill icon image is required</span>}
          </div>
          <div className="w-full">
            <Label>
              Skill Progress <span className="text-red-700">*</span>
            </Label>
            <Input
              type="number"
              placeholder="Enter skill progress"
              className="mt-1.5 dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-secondary-txt"
              {...register("progress", {
                required: "Skill Progress is required",
                min: { value: 1, message: "Progress must be greater than 1" },
                max: { value: 100, message: "Progress must be less than 100" },
              })}
            />
            {errors.progress && <span className="text-red-600 text-xs font-medium mt-0 ml-1">{errors.progress.message}</span>}
          </div>

          <div className=" mt-8">
            <Button type="submit" disabled={loading} className="sm-mx:w-full w-32">
              {loading ? <BiLoaderCircle className="animate-spin" /> : "Add Skill"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkill;
