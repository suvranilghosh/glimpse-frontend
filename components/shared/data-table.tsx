import { useState } from "react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { Lead } from "@/lib/types";
import { ArrowDown, ArrowUp } from "lucide-react";

type DataTableProps = {
  leads: Lead[];
};
const DataTable = ({ leads }: DataTableProps) => {
  const [sortOrder, setSortOrder] = useState("desc");
  const toggleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };
  return (
    <Card className="pt-0 pb-0">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>Lead ID</TableHead>
            <TableHead className="border-l">Name</TableHead>
            <TableHead className="border-l">Email</TableHead>
            <TableHead className="border-l">Source</TableHead>
            <TableHead className="border-l">Interest</TableHead>
            <TableHead className="border-l">Status</TableHead>
            <TableHead className="border-l">Salesperson</TableHead>
            <TableHead
              className="border-l cursor-pointer select-none"
              onClick={toggleSort}
            >
              <div className="flex items-center gap-1">
                Created At
                {sortOrder === "asc" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length > 0 ? (
            leads.map((lead) => (
              <TableRow key={lead.leadId}>
                <TableCell>{lead.leadId}</TableCell>
                <TableCell>{lead.leadName}</TableCell>
                <TableCell>{lead.contactInformation}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      lead.interestLevel === "High"
                        ? "border-red-300 text-red-600 bg-red-200"
                        : lead.interestLevel === "Medium"
                        ? "border-yellow-300 text-yellow-600 bg-yellow-200"
                        : lead.interestLevel === "Low"
                        ? "border-green-300 text-green-600 bg-green-200"
                        : "border-gray-300 text-gray-600 bg-gray-200"
                    }
                  >
                    {lead.interestLevel}
                  </Badge>
                </TableCell>
                <TableCell>{lead.status}</TableCell>
                <TableCell>{lead.assignedSalesPerson}</TableCell>
                <TableCell className="text-center">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-gray-400">
                No Leads found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default DataTable;
