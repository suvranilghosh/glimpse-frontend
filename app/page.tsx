"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Lead, PaginatedResponse } from "@/lib/types";
import {
  Sidebar,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import NavUser from "@/components/shared/siderbar-user";
import DataTable from "@/components/shared/data-table";
import SearchFilters from "@/components/shared/search-filter";
import UploadCSVButton from "@/components/shared/upload-csv-button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const Dashboard = () => {
  const router = useRouter();

  // State Variables
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar?: string;
  } | null>(null);
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
    if (authenticated) {
      fetchLeads();
      fetchUser();
    }
  }, [filters, search, page, authenticated]);

  //Fetch user and leads
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${NEXT_PUBLIC_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        setUser(res.data.user);
      } else {
        throw new Error("Unauthorized");
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setAuthenticated(false);
      router.replace("/auth/sign-in");
    }
  };

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
              <NavUser user={user} />
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

          {/* Search Bar and Filters */}
          <SearchFilters
            search={search}
            setSearch={setSearch}
            filters={filters}
            setFilters={setFilters}
            setPage={setPage}
          />

          {/* Data Table */}
          <DataTable leads={leads} />

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
