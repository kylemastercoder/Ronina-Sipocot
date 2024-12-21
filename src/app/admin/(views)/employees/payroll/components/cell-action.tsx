/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { PayrollColumn } from "./column";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Printer, Trash } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/ui/alert-modal";
import { Modal } from "@/components/ui/modal";

interface CellActionProps {
  data: PayrollColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);
  const onCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    toast.success("Data copied to the clipboard");
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/product/${data.id}`);
      router.refresh();
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const totalDeductions = data.benefits + data.others;
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={isLoading}
        onConfirm={onDelete}
      />
      <Modal
        className="max-w-5xl"
        title="Print Payslip"
        description="Are you sure you want to print this payslip?"
        isOpen={openPrint}
        onClose={() => setOpenPrint(false)}
      >
        <div className="border print-container p-2 pb-4 border-black bg-white">
          <div className="flex p-2">
            <div className="border border-black pl-2 pr-5 text-black">
              <p className="text-center mb-2">SUPER VALUE</p>
              <p className="text-center font-semibold">ACTIVE</p>
              <p className="text-center font-semibold">PAYSLIP</p>
            </div>
            <div className="flex flex-col">
              <div className="flex border border-black text-black">
                <div className="border border-black pl-2 pr-20">
                  <p className="font-semibold">BRANCH</p>
                  <p className="text-center">SIPOCOT</p>
                </div>
                <div className="border border-black pl-2 pr-20">
                  <p className="font-semibold">DEPARTMENT</p>
                  <p className="text-center uppercase">{data.position}</p>
                </div>
                <div className="border border-black pl-2 pr-[86px]">
                  <p className="font-semibold">EMPLOYEE NUMBER</p>
                  <p className="uppercase">{data.id}</p>
                </div>
              </div>
              <div className="flex border border-black text-black">
                <div className="border border-black pl-2 w-[645px]">
                  <p className="font-semibold">EMPLOYEE NAME</p>
                  <p className="uppercase">{data.name}</p>
                </div>
                <div className="border border-black pl-2 pr-20">
                  <p className="font-semibold">BASIC RATE</p>
                  <p className="uppercase">{data.salary}</p>
                </div>
              </div>
              <div className="flex border border-black text-black">
                <div className="border border-black pl-2 w-[213.6px]">
                  <p className="font-semibold">PAYROLL PERIOD</p>
                  <p className="uppercase">{data.dateCreated}</p>
                </div>
                <div className="border border-black pl-2 pr-20">
                  <p className="font-semibold">PAYDAY</p>
                  <p className="uppercase">BI-WEEKLY ({data.daysPresent} days present)</p>
                </div>
                <div className="border border-black pl-2 pr-20">
                  <p className="font-semibold">DATE HIRED</p>
                  <p className="uppercase">{data.dateHired}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-10 gap-1 px-2 text-black">
            <div className="col-span-4 print:col-span-12 border border-black">
              <p className="border font-semibold text-center border-black">EARNINGS</p>
              <div className="flex flex-col px-3 py-5">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">REGULAR PAY</p>
                  <p>{data.salary}</p>
                </div>
                <div className="flex justify-between mt-10 items-center">
                  <p className="font-semibold">OVERTIME PAY</p>
                  <p>0</p>
                </div>
                <div className="flex justify-between mt-1 items-center">
                  <p className="font-normal">REST DAY</p>
                  <p>0</p>
                </div>
                <div className="flex justify-between mt-1 items-center">
                  <p className="font-normal">SPECIAL REST</p>
                  <p>0</p>
                </div>
                <div className="flex justify-between mt-1 items-center">
                  <p className="font-normal">NIGHT DIFF.</p>
                  <p>0</p>
                </div>
                <div className="flex justify-between mt-3 items-center">
                  <p className="font-semibold">LESS(ABSENCES/LATE/UNDERTIME)</p>
                  <p>0</p>
                </div>
                <div className="flex justify-between mt-5 items-center">
                  <p className="font-semibold">TOTAL EARNINGS</p>
                  <p>{data.totalSalary}</p>
                </div>
              </div>
            </div>
            <div className="col-span-6 print:col-span-12 border border-black">
              <p className="border font-semibold text-center border-black">DEDUCTIONS</p>
              <div className="flex flex-col px-3 py-5">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">GOVERNMENT BENEFITS</p>
                  <p>{data.benefits}</p>
                </div>
                <div className="flex justify-between mt-1 items-center">
                  <p className="font-semibold">OTHER DEDUCTIONS</p>
                  <p>{data.others}</p>
                </div>
                <div className="flex justify-between mt-1 items-center">
                  <p className="font-semibold">INSURANCE/S</p>
                  <p>0</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <Button onClick={() => window.print()} className="mt-5">Print Now &rarr;</Button>
      </Modal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenPrint(true)}>
            <Printer className="w-4 h-4 mr-2" />
            Print Payslip
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.name)}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
