"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const DeleteAllLeadsButton = () => {
  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete ALL leads? This cannot be undone."
      )
    ) {
      try {
        const res = await axios.delete(`${NEXT_PUBLIC_BASE_URL}/leads`, {});
        console.log(res);

        // Success alert and refresh page to populate table
        window.alert("Deletion successful!");
        window.location.reload();
      } catch (err) {
        console.error("Error deleting leads:", err);
        alert("An error occurred while deleting leads.");
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="destructive"
            className="gap-2"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete all leads</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DeleteAllLeadsButton;
