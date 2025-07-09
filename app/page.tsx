"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
  TableBody,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UploadCSVButton from "@/components/shared/upload-csv-button";
import type { Lead, PaginatedResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Sidebar,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import NavUser from "@/components/shared/siderbar-user";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const Dashboard = () => {
  const data = {
    user: {
      name: "Suvranil Ghosh",
      email: "linarvus@gmail.com",
      avatar: "app\favicon.ico",
    },
  };
  const router = useRouter();

  // State Variables
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    source: "",
    interestLevel: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Pagination Limit
  // TODO: Input from user
  const pageSize = 20;

  // Validate token on client load
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/auth/sign-in");
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, []);

  // Fetch data only if authenticated
  useEffect(() => {
    if (authenticated) fetchLeads();
  }, [filters, search, page, authenticated]);

  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams({
        source: filters.source,
        interestLevel: filters.interestLevel,
        status: filters.status,
        searchQuery: search,
        page: page.toString(),
        limit: pageSize.toString(),
      });

      const res = await axios.get(`${NEXT_PUBLIC_BASE_URL}/leads`, {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }

      const result: PaginatedResponse = await res.data;
      if (!Array.isArray(result.data)) throw new Error("Invalid format");

      setLeads(result.data);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error("Fetch error:", err);
      setLeads([]);
      setTotalPages(1);
    }
  };

  //  Return conditionally after all hooks
  if (authenticated === false) {
    router.push("/auth/sign-in");
  }

  // Login Loader
  if (!authenticated) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
        <SidebarProvider>
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <NavUser user={data.user} />
            </SidebarHeader>
          </Sidebar>
        </SidebarProvider>
      </aside>

      <div className="w-full min-h-screen px-4 py-6">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          {/* Title & Upload CSV */}
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-bold mb-2">Leads</h1>
            <UploadCSVButton />
          </div>

          {/* Search & Filters */}
          <div className="flex justify-between items-center w-full">
            <div className="relative w-full ">
              <Input
                placeholder="Search by name"
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="bg-muted w-full md:w-1/3"
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              FilterBy:
              <Select
                onValueChange={(val) => {
                  setPage(1);
                  setFilters((f) => ({
                    ...f,
                    source: val === "All" ? "" : val,
                  }));
                }}
                value={filters.source || undefined}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Source</SelectLabel>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Cold Call">Cold Call</SelectItem>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(val) => {
                  setPage(1);
                  setFilters((f) => ({
                    ...f,
                    interestLevel: val === "All" ? "" : val,
                  }));
                }}
                value={filters.interestLevel || undefined}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Interest Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Interest Level</SelectLabel>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(val) => {
                  setPage(1);
                  setFilters((f) => ({
                    ...f,
                    status: val === "All" ? "" : val,
                  }));
                }}
                value={filters.status || undefined}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Interest Level</SelectLabel>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
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
                      <TableCell>{lead.interestLevel}</TableCell>
                      <TableCell>{lead.status}</TableCell>
                      <TableCell>{lead.assignedSalesPerson}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-6 text-gray-400"
                    >
                      No Leads found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
