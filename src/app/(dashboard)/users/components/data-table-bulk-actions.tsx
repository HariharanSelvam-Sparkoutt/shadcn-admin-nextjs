import { useState } from "react";
import { type Table } from "@tanstack/react-table";
import { Trash2, UserX, UserCheck, Mail } from "lucide-react";
import { toast } from "sonner";
import { sleep } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTableBulkActions as BulkActionsToolbar } from "@/components/data-table";
import { type User } from "../data/schema";
import { UsersMultiDeleteDialog } from "./users-multi-delete-dialog";

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>;
};

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleBulkStatusChange = (status: "active" | "inactive") => {
    const selectedUsers = selectedRows.map((row) => row.original as User);
    toast.promise(sleep(2000), {
      loading: `${
        status === "active" ? "Activating" : "Deactivating"
      } users...`,
      success: () => {
        table.resetRowSelection();
        return `${status === "active" ? "Activated" : "Deactivated"} ${
          selectedUsers.length
        } user${selectedUsers.length > 1 ? "s" : ""}`;
      },
      error: `Error ${
        status === "active" ? "activating" : "deactivating"
      } users`,
    });
  };

  const handleBulkInvite = () => {
    const selectedUsers = selectedRows.map((row) => row.original as User);
    toast.promise(sleep(2000), {
      loading: "Inviting users...",
      success: () => {
        table.resetRowSelection();
        return `Invited ${selectedUsers.length} user${
          selectedUsers.length > 1 ? "s" : ""
        }`;
      },
      error: "Error inviting users",
    });
  };

  return (
    <>
      <BulkActionsToolbar table={table} entityName="user">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handleBulkInvite}
              className="size-8"
              aria-label="Invite selected users"
              title="Invite selected users"
              disabled={selectedRows.length === 0}
            >
              <Mail />
              <span className="sr-only">Invite selected users</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invite selected users</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleBulkStatusChange("active")}
              className="size-8"
              aria-label="Activate selected users"
              title="Activate selected users"
              disabled={selectedRows.length === 0}
            >
              <UserCheck />
              <span className="sr-only">Activate selected users</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activate selected users</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleBulkStatusChange("inactive")}
              className="size-8"
              aria-label="Deactivate selected users"
              title="Deactivate selected users"
              disabled={selectedRows.length === 0}
            >
              <UserX />
              <span className="sr-only">Deactivate selected users</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate selected users</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setShowDeleteConfirm(true)}
              className="size-8"
              aria-label="Delete selected users"
              title="Delete selected users"
              disabled={selectedRows.length === 0}
            >
              <Trash2 />
              <span className="sr-only">Delete selected users</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected users</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <UsersMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}