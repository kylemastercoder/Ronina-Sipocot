import { Payroll } from "@prisma/client";
import React from "react";

interface PayrollFormProps {
  initialData: Payroll | null;
}

const PayrollForm: React.FC<PayrollFormProps> = ({ initialData }) => {
  return <div>{initialData?.salary}</div>;
};

export default PayrollForm;
