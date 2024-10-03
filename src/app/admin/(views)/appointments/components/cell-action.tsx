"use client";

import { Button } from "@/components/ui/button";
import { BookingColumn } from "./column";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertModal from "@/components/ui/alert-modal";
import { deleteUser } from "@/actions/user";
import ApproveModal from "@/components/modals/approve-modal";
import { IconCheck, IconX } from "@tabler/icons-react";
import DeclineModal from "@/components/modals/decline-modal";
import { approveAppointment, declineAppointment } from "@/actions/appointment";

interface CellActionProps {
  data: BookingColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const onCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    toast.success("Data copied to the clipboard");
  };

  const onDelete = async () => {
    setIsLoading(true);
    deleteUser(data.id)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          setOpen(false);
          router.push("/admin/customers");
        } else {
          toast.error(data.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onApprove = async () => {
    setIsLoading(true);
    approveAppointment(data.id)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          setApproveOpen(false);
          window.location.assign("/admin/appointments");
        } else {
          toast.error(data.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onDecline = async () => {
    setIsLoading(true);
    declineAppointment(data.id)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          setDeclineOpen(false);
          window.location.assign("/admin/appointments");
        } else {
          toast.error(data.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={isLoading}
        onConfirm={onDelete}
      />
      <ApproveModal
        isOpen={approveOpen}
        onClose={() => setApproveOpen(false)}
        loading={isLoading}
        onConfirm={onApprove}
      />
      <DeclineModal
        isOpen={declineOpen}
        onClose={() => setDeclineOpen(false)}
        loading={isLoading}
        onConfirm={onDecline}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {data.status === "Pending" ? (
            <>
              <DropdownMenuItem onClick={() => setApproveOpen(true)}>
                <IconCheck className="w-4 h-4 mr-2" />
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeclineOpen(true)}>
                <IconX className="w-4 h-4 mr-2" />
                Decline
              </DropdownMenuItem>
            </>
          ) : (
            ""
          )}
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
