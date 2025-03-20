import UpdateProject from "@/components/dashboard/ManageProjects/UpdateProject";
import React from "react";

const UpdateProjectPage = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  return (
    <div>
      <UpdateProject projectId={projectId} />
    </div>
  );
};

export default UpdateProjectPage;
