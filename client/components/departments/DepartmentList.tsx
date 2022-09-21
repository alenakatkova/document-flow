import { InternalDepartmentFromDB } from "../../interfaces/internalDepartment";
import List from "@mui/material/List";
import React from "react";
import { DepartmentItem } from "./DepartmentItem";

interface DepartmentList {
  departments : InternalDepartmentFromDB[];
}

const DepartmentList = ({ departments } : DepartmentList) => {
  return (
      <List>
        {departments.map(department => (
            <DepartmentItem key={department.id} department={department} />
        ))}
      </List>
  )
};

export default DepartmentList;