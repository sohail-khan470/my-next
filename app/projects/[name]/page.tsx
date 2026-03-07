import React from "react";

const ProjectDetails = async ({ params }) => {
  const { name } = await params;
  return <div>{name}</div>;
};

export default ProjectDetails;
