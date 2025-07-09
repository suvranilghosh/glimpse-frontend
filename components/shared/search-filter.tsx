import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  search: string;
  filters: {
    source: string;
    interestLevel: string;
    status: string;
  };
  setSearch: (val: string) => void;
  setFilters: (val: Props["filters"]) => void;
  setPage: (val: number) => void;
};

const SearchFilters = ({
  search,
  filters,
  setSearch,
  setFilters,
  setPage,
}: Props) => {
  return (
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
        <p>FilterBy:</p>
        <Select
          onValueChange={(val) => {
            setPage(1);
            setFilters({ ...filters, source: val === "All" ? "" : val });
          }}
          value={filters.source || ""}
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
            setFilters({ ...filters, interestLevel: val === "All" ? "" : val });
          }}
          value={filters.interestLevel || ""}
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
            setFilters({ ...filters, status: val === "All" ? "" : val });
          }}
          value={filters.status || ""}
        >
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
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
  );
};

export default SearchFilters;
