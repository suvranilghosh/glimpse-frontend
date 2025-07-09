import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Papa from "papaparse";
import { Lead } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Parse CSV from file & convert headers to match type Lead
export function parseCSV(file: File): Promise<Lead[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Lead>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        console.log(header);
        return header
          .toLowerCase()
          .replace(/[^a-z]/gi, "")
          .replace(/^leadid$/, "leadId")
          .replace(/^leadname$/, "leadName")
          .replace(/^contactinformation$/, "contactInformation")
          .replace(/^interestlevel$/, "interestLevel")
          .replace(/^source$/, "source")
          .replace(/^status$/, "status")
          .replace(/^assignedsalesperson$/, "assignedSalesPerson");
      },
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
}
