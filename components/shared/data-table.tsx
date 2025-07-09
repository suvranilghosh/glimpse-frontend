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

type DataTableProps = {
  leads: Lead[];
};
const DataTable = ({ leads }: DataTableProps) => {
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
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-400">
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
