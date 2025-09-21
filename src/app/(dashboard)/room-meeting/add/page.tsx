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
  const router = useRouter();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState([
    "TV",
    "Video Conference",
  ]);

  const toggleFacility = (facility: string) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  const handleSave = () => {
    const newRoom = {
      code,
      name,
      type,
      capacity,
      building,
      floor,
      address,
      status,
      facilities: selectedFacilities,
      notes,
    };

    router.push(
      `/room-meeting?newRoom=${encodeURIComponent(JSON.stringify(newRoom))}`
    );
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Button Back */}
      <div className="flex gap-x-4 items-center">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
        <h1 className="text-xl font-semibold">Tambah Ruangan Meeting</h1>
      </div>

      {/* Card identification */}
      <Card className="rounded-md p-4">
        <CardTitle>Basics</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0">
          <div className="flex w-full h-full gap-4 mb-4 md:flex-row flex-col">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Kode*</label>
              <Input
                placeholder="RN-2025-001"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
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
                  <SelectValue placeholder="Tipe" />
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
            <Input
              placeholder="Ruang Rapat Eksekutif"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full gap-2 mt-4">
            <label className="text-sm text-[#969696]">Status</label>
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
        <CardTitle>Details Ruangan Offline</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex w-full h-full gap-4 mb-4 md:flex-row flex-col">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Gedung *</label>
              <Input
                placeholder="Main Building"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Lantai*
              </label>
              <Input
                placeholder="5"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Alamat *</label>
            <Textarea
              placeholder="Lantai Ekslusif"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Kapasitas *</label>
            <Input
              placeholder="12"
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
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Pilih fasilitas yang tersedia untuk ruangan ini:
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
          <Textarea
            placeholder="Additional notes about the property"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <span className="text-[10px] text-[#969696]">
            {notes.length}/1000 Karakter
          </span>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          type="button"
          className="bg-[#031833] dark:text-white"
          onClick={handleSave}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
}
