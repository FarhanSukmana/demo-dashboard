"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical } from "lucide-react";

// Dummy data
const dummyHouses = [
  {
    code: "RN-2025-001",
    name: "Minister Official Residence",
    address: "Jl. HR. Rasuna Said No. 1, Kuningan, Jakarta Selatan",
    province: "DKI Jakarta",
    type: "Official Residence",
    condition: "Good",
    status: "Available",
  },
  {
    code: "RN-2025-002",
    name: "Deputy Minister Residence",
    address: "Jl. HR. Rasuna Said No. 2, Kuningan, Jakarta Selatan",
    province: "DKI Jakarta",
    type: "Official Residence",
    condition: "Good",
    status: "Occupied",
  },
  {
    code: "RN-2025-003",
    name: "Secretary General Residence",
    address: "Jl. HR. Rasuna Said No. 3, Kuningan, Jakarta Selatan",
    province: "DKI Jakarta",
    type: "Official Residence",
    condition: "Needs Repair",
    status: "Maintenance",
  },
  {
    code: "RN-2025-004",
    name: "Staff Housing Block A",
    address: "Jl. Kemang Raya No. 15, Jakarta Selatan",
    province: "DKI Jakarta",
    type: "Staff Housing",
    condition: "Fair",
    status: "Available",
  },
  {
    code: "RN-2025-005",
    name: "Guest House Central",
    address: "Jl. Sudirman No. 88, Jakarta Pusat",
    province: "DKI Jakarta",
    type: "Guest House",
    condition: "Good",
    status: "Occupied",
  },
];

export default function RumahNegaraPage() {
  const [search, setSearch] = useState("");
  const [filterProvince, setFilterProvince] = useState("all");
  const [filterCondition, setFilterCondition] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const router = useRouter();

  const filteredData = dummyHouses.filter(
    (house) =>
      (search === "" ||
        house.code.toLowerCase().includes(search.toLowerCase()) ||
        house.name.toLowerCase().includes(search.toLowerCase()) ||
        house.address.toLowerCase().includes(search.toLowerCase())) &&
      (filterProvince === "all" || house.province === filterProvince) &&
      (filterCondition === "all" || house.condition === filterCondition) &&
      (filterStatus === "all" || house.status === filterStatus)
  );

  return (
    <div className="space-y-6 pt-3">
      <div className="flex w-full items-center justify-between flex-wrap gap-3">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Input
            placeholder="Search code/name/address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
          <Select onValueChange={setFilterProvince} value={filterProvince}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setFilterCondition} value={filterCondition}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Good">Good</SelectItem>
              <SelectItem value="Fair">Fair</SelectItem>
              <SelectItem value="Needs Repair">Needs Repair</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setFilterStatus} value={filterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Occupied">Occupied</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <a href="rumah-negara/add">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" /> Add House
          </Button>
        </a>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-4 sm:p-6">
          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Province</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((house) => (
                <TableRow key={house.code}>
                  <TableCell className="font-semibold text-green-600">
                    {house.code}
                  </TableCell>
                  <TableCell>{house.name}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {house.address}
                  </TableCell>
                  <TableCell>{house.province}</TableCell>
                  <TableCell>{house.type}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        house.condition === "Good"
                          ? "bg-green-500"
                          : house.condition === "Fair"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }
                    >
                      {house.condition}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        house.status === "Available"
                          ? "bg-green-500"
                          : house.status === "Occupied"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }
                    >
                      {house.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left" align="start">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/rumah-negara/${house.code}`)
                          }
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
