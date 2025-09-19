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

// Dummy data untuk Room Meeting
const dummyRooms = [
  {
    code: "RM-2025-001",
    name: "Main Conference Hall",
    type: "Conference",
    capacity: 200,
    location: "Building A - 2nd Floor",
    status: "Available",
  },
  {
    code: "RM-2025-002",
    name: "Executive Meeting Room",
    type: "Boardroom",
    capacity: 20,
    location: "Building B - 5th Floor",
    status: "Occupied",
  },
  {
    code: "RM-2025-003",
    name: "Training Room Alpha",
    type: "Training",
    capacity: 50,
    location: "Building C - Ground Floor",
    status: "Maintenance",
  },
  {
    code: "RM-2025-004",
    name: "Project Collaboration Room",
    type: "Collaboration",
    capacity: 15,
    location: "Building D - 3rd Floor",
    status: "Available",
  },
];

export default function RoomMeetingPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const router = useRouter();

  const filteredData = dummyRooms.filter(
    (room) =>
      (search === "" ||
        room.code.toLowerCase().includes(search.toLowerCase()) ||
        room.name.toLowerCase().includes(search.toLowerCase()) ||
        room.location.toLowerCase().includes(search.toLowerCase())) &&
      (filterType === "all" || room.type === filterType) &&
      (filterStatus === "all" || room.status === filterStatus)
  );

  return (
    <div className="space-y-6 pt-3">
      <div className="flex w-full items-center justify-between flex-wrap gap-3">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Input
            placeholder="Search code/name/location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
          <Select onValueChange={setFilterType} value={filterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Conference">Conference</SelectItem>
              <SelectItem value="Boardroom">Boardroom</SelectItem>
              <SelectItem value="Training">Training</SelectItem>
              <SelectItem value="Collaboration">Collaboration</SelectItem>
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
        <a href="room-meeting/add">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" /> Add Room
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
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Location/Meeting</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((room) => (
                <TableRow key={room.code}>
                  <TableCell className="font-semibold text-green-600">
                    {room.code}
                  </TableCell>
                  <TableCell>{room.name}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {room.location}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        room.status === "Available"
                          ? "bg-green-500"
                          : room.status === "Occupied"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }
                    >
                      {room.status}
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
                            router.push(`/room-meeting/${room.code}`)
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
