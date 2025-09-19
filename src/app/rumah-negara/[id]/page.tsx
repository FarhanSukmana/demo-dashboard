"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Dummy data sama kayak di list
const dummyHouses = [
  {
    code: "RN-2025-001",
    name: "Minister Official Residence",
    address:
      "Jl. HR. Rasuna Said No. 1, Kuningan, Jakarta Selatan, DKI Jakarta 12940",
    province: "DKI Jakarta",
    type: "Official Residence",
    condition: "Good",
    status: "Available",
    latitude: "-6.2088",
    longitude: "106.8456",
    floors: 2,
    bedrooms: 3,
    bathrooms: 2,
    landArea: 200,
    buildingArea: 150,
    electricmeter: "ELC2025001",
    watermeter: "WTR2025001",
    assetNumber: "AST2025001",
    certificateNumber: "CERT2025001",
    notes: "Property in good condition with regular maintenance schedule.",
    createdBy: "Admin User",
    createdAt: "2024-01-10 09:30:00",
    updatedBy: "Property Manager",
    updatedAt: "2024-03-15 14:22:00",
  },
  // ... tambahin sesuai data
];

export default function RumahNegaraDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // cari data dari dummy
  const house = dummyHouses.find((h) => h.code === id);

  if (!house) {
    return <div className="p-6">House not found</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-semibold">House Details</h1>
        <Badge className="ml-2 bg-green-100 text-green-600">
          {house.status}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-6 ">
        {/* House Info */}
        <div className="col-span-2 space-y-6">
          <Card className="flex w-full md:col-span-2 rounded-2xl">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-semibold">House Information</h2>
              <div className="flex flex-col w-full h-full gap-y-6">
                {/* 1 */}
                <div className="flex w-full gap-2 items-center">
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Code</p>
                    <p>{house.code}</p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">House Name</p>
                    <p>{house.name}</p>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex flex-col w-full">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="col-span-1">{house.address}</p>
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm text-gray-500">Coordinates</p>
                  <p>
                    📍 {house.latitude}, {house.longitude}
                  </p>
                </div>

                {/* 3 */}
                <div className="flex w-full gap-x-2">
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Type</p>
                    <p>{house.type}</p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Floors</p>
                    <p>{house.floors}</p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p>{house.bedrooms}</p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p>{house.bathrooms}</p>
                  </div>
                </div>
                {/* 4 */}
                <div className="flex w-full gap-2 ">
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Land Area (m²)</p>
                    <p>{house.landArea}</p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Building Area (m²)</p>
                    <p>{house.buildingArea}</p>
                  </div>
                </div>

                {/* 5 */}
                <div className="flex w-full gap-2 ">
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Condition</p>
                    <Badge className="bg-green-500">{house.condition}</Badge>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge className="bg-green-500">{house.status}</Badge>
                  </div>
                </div>

                {/* 6 */}
                <div className="flex w-full gap-2 ">
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Electric Meter No</p>
                    <p>{house.electricmeter}</p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Water Meter No</p>
                    <p>{house.watermeter}</p>
                  </div>
                </div>
                {/* 7 */}
                <div className="flex w-full gap-2 ">
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Asset Number</p>
                    <p>{house.assetNumber}</p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Certificate No</p>
                    <p>{house.certificateNumber}</p>
                  </div>
                </div>
                {/* 8 */}
                <div className="flex flex-col w-full">
                  <p className="text-sm text-gray-500">No active occupancy.</p>
                  <p>{house.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Occupancy Card */}
          <Card className="flex w-full md:col-span-2 rounded-2xl gap-y-2">
            <CardContent className="flex flex-col gap-y-2">
              <h2 className="text-lg font-semibold">Occupancy</h2>
              {/* 1 */}
              <p className="text-gray-500">No active occupancy.</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex w-full">
          <Card className="rounded-2xl flex w-full h-fit">
            <CardContent className="p-6 space-y-3">
              <h2 className="text-lg font-semibold">Audit</h2>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p>{house.createdAt}</p>
                <p className="text-xs text-gray-400">by {house.createdBy}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p>{house.updatedAt}</p>
                <p className="text-xs text-gray-400">by {house.updatedBy}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Info */}
      </div>
    </div>
  );
}
