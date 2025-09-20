"use client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dummyRooms = Array.from({ length: 20 }, (_, i) => ({
  code: `RM-2025-${String(i + 1).padStart(3, "0")}`,
  name:
    i < 5
      ? `Main Conference Hall ${i + 1}`
      : i < 10
      ? `Executive Meeting Room ${i + 1}`
      : i < 15
      ? `Training Room ${i + 1}`
      : `Collaboration Room ${i + 1}`,
  type: i % 2 === 0 ? "Offline" : "Online",
  capacity: (i + 1) * 10,
  location: `Building ${String.fromCharCode(65 + (i % 5))} - Floor ${i % 6}`,
  status: i % 2 === 0 ? "Active" : "Inactive",
}));

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
export default function RoomDetails() {
  const router = useRouter();
  const params = useParams();
  const { code } = params;
  const [room, setRoom] = useState<any>(null);
  const [selectedFacilities, setSelectedFacilities] = useState([
    "TV",
    "Video Conference",
  ]);

  const toggleFacility = (facility: any) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };
  useEffect(() => {
    // cari data sesuai code
    const found = dummyRooms.find((h) => h.code === code);
    if (found) setRoom(found);
  }, [code]);

  // state untuk edit form
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");

  useEffect(() => {
    if (room) {
      setName(room.name);
      setType(room.type);
      setCapacity(room.capacity);
      setStatus(room.status);
      // pecah lokasi
      const match = room.location.match(/Building\s([A-Z])\s-\sFloor\s(\d+)/);
      if (match) {
        setBuilding(match[1]); // contoh: "A"
        setFloor(match[2]); // contoh: "2"
      }
    }
  }, [room]);

  if (!room) return <p className="p-4">Loading...</p>;

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
        <h1 className="text-xl font-semibold">Edit Ruangan Meeting</h1>
      </div>
      {/* Card identification */}
      <Card className="rounded-md p-4">
        <CardTitle>Dasar</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0">
          {/* code & house type */}
          <div className="flex w-full h-full gap-4 mb-4 md:flex-row flex-col">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Kode *</label>
              <Input value={room.code} disabled/>
              <label className="text-[10px] text-[#969696]">
                Format: RN-YYYY-NNN
              </label>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Tipe*
              </label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Offline">Offline</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* RoomName */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Nama Ruangan*</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Active" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
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
              <label className="text-sm text-[#969696]">Gedung *</label>
              <Input value={building} onChange={(e)=>setBuilding(e.target.value)} />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Lantai*
              </label>
              <Input value={floor} onChange={(e) => setFloor(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Alamat *</label>
            <Textarea placeholder="Executive floor, west wing" />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Kapasitas *</label>
            <Input
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card Facilities */}
      <Card className="rounded-md p-4">
        <CardTitle>Fasilitas (Optional)</CardTitle>
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
            <p className="text-sm text-gray-500 mb-2">Pilih Fasilitas:</p>
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
        <CardTitle>Catatan (Optional)</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-2">
          <Textarea placeholder="Additional notes about the property" />
          <span className="text-[10px] text-[#969696]"></span>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          save
        </Button>
      </div>
    </div>
  );
}
