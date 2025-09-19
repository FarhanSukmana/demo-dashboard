'use client'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin } from "lucide-react";


export default function RoomDetails() {
    const router = useRouter();

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
          <h1 className="text-2xl font-semibold">Room Details</h1>
          <Badge className="bg-green-100 text-green-700">Active</Badge>
          <Badge className="bg-green-100 text-green-700">Offline</Badge>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          📅 Open Calendar
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Room Information */}
        <Card className="col-span-2">
          <CardContent className="space-y-6 p-6">
            <h2 className="text-lg font-semibold">Room Information</h2>

            {/* Code Room Name */}
            <div className="flex w-full gap-2 items-center">
              <div className="flex flex-col w-full">
                <p className="text-sm text-gray-500">Code</p>
                <p className="font-medium">RM-2025-001</p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm text-gray-500">Room Name</p>
                <p className="font-medium">Executive Meeting Room</p>
              </div>
            </div>

            {/* Type, status, capacity */}
            <div className="flex w-full gap-2 items-center">
              <div className="flex flex-col w-full">
                <p className="text-sm text-gray-500">Type</p>
                <Badge className="bg-green-100 text-green-700">Offline</Badge>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm text-gray-500">Status</p>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="font-medium">12</p>
              </div>
            </div>

            {/* Facilities */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Facilities</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Projector</Badge>
                <Badge variant="outline">Video Conference</Badge>
                <Badge variant="outline">AC</Badge>
                <Badge variant="outline">Whiteboard</Badge>
              </div>
            </div>

            {/* Physical Location */}
            <div className="rounded-lg p-4 bg-green-100 border border-green-400">
              <div className="flex items-center gap-2 font-semibold">
                <MapPin className="h-4 w-4 text-green-700" />
                <h1 className="text-black">Physical Location</h1>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-sm text-gray-500">Building</p>
                  <p className="text-gray-700 font-medium">Main Building</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Floor</p>
                  <p className="text-gray-700 font-medium">5</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-700 font-medium">
                  Executive floor, west wing
                </p>
              </div>
            </div>

            {/* Notes */}
            <div>
              <p className="text-sm text-gray-500">Notes</p>
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
