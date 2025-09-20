"use client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin } from "lucide-react";

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
  status: i % 2 === 0 ? "Active" : "Inactive",
  location: `Building ${String.fromCharCode(65 + (i % 5))} - Floor ${i % 6}`,
}));

export default function RoomDetails() {
  const { code } = useParams();

  const router = useRouter();
  // cari data dari dummy
  const room = dummyRooms.find((h) => h.code === code);

  if (!room) {
    return <div className="p-6">room not found</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold">Detail Ruangan</h1>
          <Badge
            className={
              room.status === "Active"
                ? "bg-green-500"
                : room.status === "Inactive"
                ? "bg-blue-500"
                : "bg-yellow-500"
            }
          >
            {room.status}
          </Badge>
          <Badge
            className={
              room.type === "Online"
                ? "bg-green-500"
                : room.type === "Offline"
                ? "bg-blue-500"
                : "bg-yellow-500"
            }
          >
            {room.type}
          </Badge>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          Open Calendar
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Room Information */}
        <Card className="col-span-2">
          <CardContent className="space-y-6 p-6">
            <h2 className="text-lg font-semibold">Informasi Ruangan</h2>

            {/* Code Room Name */}
            <div className="flex w-full gap-2 items-center">
              <div className="flex flex-col w-full">
                <p className="text-sm text-gray-500">Kode</p>
                <p className="font-medium">{room.code}</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm text-gray-500">Nama Ruangan</p>
                <p className="font-medium">{room.name}</p>
              </div>
            </div>

            {/* Type, status, capacity */}
            <div className="flex w-full gap-2 items-center">
              <div className="flex flex-col w-full">
                <p className="text-sm text-gray-500">Tipe</p>
                <Badge
                  className={
                    room.type === "Online"
                      ? "bg-green-500"
                      : room.type === "Offline"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }
                >
                  {room.type}
                </Badge>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm text-gray-500">Status</p>
                <Badge
                  className={
                    room.status === "Active"
                      ? "bg-green-500"
                      : room.status === "Inactive"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }
                >
                  {room.status}
                </Badge>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm text-gray-500">Kapasitas</p>
                <p className="font-medium">{room.capacity}</p>
              </div>
            </div>

            {/* Facilities */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Fasilitas</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Projector</Badge>
                <Badge variant="outline">Video Conference</Badge>
                <Badge variant="outline">AC</Badge>
                <Badge variant="outline">Whiteboard</Badge>
              </div>
            </div>

            {/* Physical Location */}
            <div>
              <div className="flex items-center gap-2 font-semibold">
                <h1 className="text-sm text-gray-500 mb-2">
                  Physical Location
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-sm text-gray-500">Gedung</p>
                  <p className="font-medium">Gedung Utama</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lantai</p>
                  <p className="font-medium">5</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-500">Alamat</p>
                <p className="font-medium">Executive floor, west wing</p>
              </div>
            </div>

            {/* Notes */}
            <div>
              <p className="text-sm text-gray-500">Catatan</p>
              <p className="font-medium">
                Premium meeting room for executive discussions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Audit */}
        <Card className="rounded-2xl flex w-full h-fit">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Audit</h2>
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="font-medium">2024-01-10 09:30:00</p>
              <p className="text-xs text-gray-500">by Admin User</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">2024-03-15 14:22:00</p>
              <p className="text-xs text-gray-500">by Room Manager</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
