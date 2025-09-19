"use client";
import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

import { ArrowLeft, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ALL_FACILITIES = [
  "Projector",
  "TV",
  "Video Conference",
  "Whiteboard",
  "Microphone",
  "Speakers",
  "AC",
  "Ethernet",
  "Power Strips",
];

export default function AddRoomMeetingPage() {
  const [notes, setNotes] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState([
    "TV",
    "Video Conference",
  ]);
  const router = useRouter();

  const toggleFacility = (facility :any) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Button Back */}
      <div className="flex gap-x-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-semibold">Add House</h1>
      </div>
      {/* Card identification */}
      <Card className="rounded-md p-4">
        <CardTitle>Basics</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0">
          {/* code & house type */}
          <div className="flex w-full h-full gap-4 mb-4 md:flex-row flex-col">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Code *</label>
              <Input placeholder="RN-2025-001" />
              <label className="text-[10px] text-[#969696]">
                Format: RN-YYYY-NNN
              </label>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Type*
              </label>
              <Select defaultValue="offline">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* RoomName */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Room Name*</label>
            <Input placeholder="Executive Meeting Room" />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">status</label>
            <Select defaultValue="active">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Active" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Offline Details */}
      <Card className="rounded-md p-4 ">
        <CardTitle>Offline Details</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex w-full h-full gap-4 mb-4 md:flex-row flex-col">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Building *</label>
              <Input placeholder="Main Building" />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Floor*
              </label>
              <Input placeholder="5" />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Address *</label>
            <Textarea placeholder="Executive floor, west wing" />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Capacity *</label>
            <Input placeholder="12" />
          </div>
        </CardContent>
      </Card>

      {/* Card Facilities */}
      <Card className="rounded-md p-4">
        <CardTitle>Facilities (Optional)</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          {/* Available facilities */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Select available facilities for this room:
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_FACILITIES.map((facility) => {
                const isSelected = selectedFacilities.includes(facility);
                return (
                  <button
                    key={facility}
                    type="button"
                    onClick={() => toggleFacility(facility)}
                    className={`px-3 py-1 rounded-md border text-sm transition ${
                      isSelected
                        ? "bg-green-500 text-white border-green-500 flex items-center gap-1"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {isSelected && <X className="w-3 h-3" />}
                    {facility}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected facilities */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Selected facilities:</p>
            <div className="flex flex-wrap gap-2">
              {selectedFacilities.map((facility) => (
                <Badge
                  key={facility}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  {facility}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Notes */}
      <Card className="rounded-md p-4">
        <CardTitle>Notes (Optional)</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-2">
          <Textarea
            placeholder="Additional notes about the property"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <span className="text-[10px] text-[#969696]">
            {notes.length}/1000 characters
          </span>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          Save
        </Button>
      </div>
    </div>
  );
}
