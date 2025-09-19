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

// Dummy data vehicles
const dummyVehicles = [
  {
    plate: "B 1234 ABC",
    brand: "Toyota Camry",
    year: 2020,
    fuel: "Gasoline",
    odometer: 45000,
    condition: "Good",
    status: "Available",
  },
  {
    plate: "B 3456 JKL",
    brand: "Isuzu D-Max",
    year: 2021,
    fuel: "Diesel",
    odometer: 28000,
    condition: "Good",
    status: "Available",
  },
  {
    plate: "B 5678 DEF",
    brand: "Honda Civic",
    year: 2019,
    fuel: "Gasoline",
    odometer: 62000,
    condition: "Good",
    status: "In Use",
  },
  {
    plate: "B 7890 MNO",
    brand: "Suzuki Ertiga",
    year: 2017,
    fuel: "Gasoline",
    odometer: 95000,
    condition: "Needs Repair",
    status: "Inactive",
  },
  {
    plate: "B 9012 GHI",
    brand: "Mitsubishi Pajero Sport",
    year: 2018,
    fuel: "Diesel",
    odometer: 85000,
    condition: "Fair",
    status: "Maintenance",
  },
];

export default function KendaraanDinasPage() {
  const [search, setSearch] = useState("");
  const [filterCondition, setFilterCondition] = useState("all");
  const [filterFuel, setFilterFuel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");

  const router = useRouter();

  const filteredData = dummyVehicles.filter((vehicle) => {
    const matchesSearch =
      search === "" ||
      vehicle.plate.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(search.toLowerCase());

    const matchesCondition =
      filterCondition === "all" || vehicle.condition === filterCondition;

    const matchesFuel = filterFuel === "all" || vehicle.fuel === filterFuel;

    const matchesStatus =
      filterStatus === "all" || vehicle.status === filterStatus;

    const matchesYearFrom =
      yearFrom === "" || vehicle.year >= parseInt(yearFrom);
    const matchesYearTo = yearTo === "" || vehicle.year <= parseInt(yearTo);

    return (
      matchesSearch &&
      matchesCondition &&
      matchesFuel &&
      matchesStatus &&
      matchesYearFrom &&
      matchesYearTo
    );
  });

  return (
    <div className="space-y-6 pt-3">
      <div className="flex w-full items-center justify-between flex-wrap gap-3">
        {/* Filters */}
        <div className="flex w-full items-center justify-between gap-3 flex-wrap">
          {/* Search & Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <Input
              placeholder="Search plate/brand/model/driver"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[240px]"
            />
            <Select onValueChange={setFilterCondition} value={filterCondition}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
                <SelectItem value="Needs Repair">Needs Repair</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setFilterFuel} value={filterFuel}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Fuel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Gasoline">Gasoline</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setFilterStatus} value={filterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="In Use">In Use</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="From"
              type="number"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              className="w-[100px]"
            />
            <span className="text-gray-500">to</span>
            <Input
              placeholder="To"
              type="number"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              className="w-[100px]"
            />
          </div>

          {/* Button */}
          <a href="kendaraan-dinas/add">
            <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
          </a>
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-4 sm:p-6">
          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plate</TableHead>
                <TableHead>Brand/Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Fuel</TableHead>
                <TableHead>Odometer (km)</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((vehicle) => (
                <TableRow key={vehicle.plate}>
                  <TableCell className="font-semibold text-green-600">
                    {vehicle.plate}
                  </TableCell>
                  <TableCell>{vehicle.brand}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{vehicle.fuel}</TableCell>
                  <TableCell>
                    {vehicle.odometer.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        vehicle.condition === "Good"
                          ? "bg-green-500"
                          : vehicle.condition === "Fair"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }
                    >
                      {vehicle.condition}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        vehicle.status === "Available"
                          ? "bg-green-500"
                          : vehicle.status === "In Use"
                          ? "bg-blue-500"
                          : vehicle.status === "Inactive"
                          ? "bg-gray-500"
                          : "bg-yellow-500"
                      }
                    >
                      {vehicle.status}
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
                            router.push(`/kendaraan-dinas/${vehicle.plate}`)
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
