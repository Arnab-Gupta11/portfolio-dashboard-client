import UpdateBlog from "@/components/dashboard/ManageBlogs/UpdateBlog";
import React from "react";

const UpdateProductPage = async ({ params }: { params: Promise<{ blogId: string }> }) => {
  const { blogId } = await params;
  return (
    <div>
      <UpdateBlog blogId={blogId} />
    </div>
  );
};

export default UpdateProductPage;
