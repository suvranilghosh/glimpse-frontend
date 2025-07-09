"use client";
import { Lead } from "@/lib/types";
import { useRef } from "react";
import { Button } from "../ui/button";
import { UploadIcon } from "lucide-react";
import { parseCSV } from "@/lib/utils";
import axios from "axios";

const BASE_URL = "https://glimpse-backend-xc9m.onrender.com";

const UploadCsvButton = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const leads: Lead[] = await parseCSV(file);
      console.log("Parsed leads:", leads);

      const res = await axios.post(`${BASE_URL}/leads`, {
        data: leads,
      });
      console.log(res);

      // Reset form input to allow another upload
      e.target.value = "";
    } catch (err) {
      console.error("Error parsing CSV:", err);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button onClick={handleClick} className="gap-2">
        <div className="flex justify-between items-center w-full">
          <UploadIcon className="w-4 h-4 mr-4" />
          Upload CSV
        </div>
      </Button>
    </>
  );
};

export default UploadCsvButton;
