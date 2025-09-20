"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Dummy data 20 rumah
const dummyHouses = Array.from({ length: 20 }, (_, i) => ({
  code: `RN-2025-${String(i + 1).padStart(3, "0")}`,
  name:
    i < 5
      ? `Minister Residence ${i + 1}`
      : i < 10
      ? `Deputy Residence ${i + 1}`
      : i < 15
      ? `Staff Housing Block ${i + 1}`
      : `Guest House ${i + 1}`,
  address: `Jl. Contoh No. ${i + 1}, Jakarta Selatan`,
  province: "DKI Jakarta",
  type:
    i % 3 === 0
      ? "Official Residence"
      : i % 3 === 1
      ? "Staff Housing"
      : "Guest House",
  condition:
    i % 4 === 0
      ? "Good"
      : i % 4 === 1
      ? "Fair"
      : i % 4 === 2
      ? "Needs Repair"
      : "Good",
  status: i % 3 === 0 ? "Available" : i % 3 === 1 ? "Occupied" : "Maintenance",
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
}));

export default function RumahNegaraDetailPage() {
  const { code } = useParams();
  const router = useRouter();

  // cari data dari dummy
  const house = dummyHouses.find((h) => h.code === code);

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
        <h1 className="text-xl font-semibold">Detail Rumah Negara</h1>
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
      </div>

      <div className="grid grid-cols-3 gap-6 ">
        {/* House Info */}
        <div className="col-span-2 space-y-6">
          <Card className="flex w-full md:col-span-2 rounded-2xl">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-semibold">Informasi Rumah</h2>
              <div className="flex flex-col w-full h-full gap-y-6">
                {/* 1 */}
                <div className="flex w-full gap-2 items-center">
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Kode</p>
                    <p>{house.code}</p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Nama Rumah</p>
                    <p>{house.name}</p>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex flex-col w-full">
                  <p className="text-sm text-gray-500">Alamat</p>
                  <p className="col-span-1">{house.address}</p>
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm text-gray-500">Koordinat</p>
                  <p>
                    {house.latitude}, {house.longitude}
                  </p>
                </div>

                {/* 3 */}
                <div className="flex w-full gap-x-2">
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Tipe</p>
                    <p>{house.type}</p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Lantai</p>
                    <p>{house.floors}</p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Kamar Tidur</p>
                    <p>{house.bedrooms}</p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Kamar Mandi</p>
                    <p>{house.bathrooms}</p>
                  </div>
                </div>
                {/* 4 */}
                <div className="flex w-full gap-2 ">
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Luas Tanah (m²)</p>
                    <p>{house.landArea}</p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Luas Bangunan (m²)</p>
                    <p>{house.buildingArea}</p>
                  </div>
                </div>

                {/* 5 */}
                <div className="flex w-full gap-2 ">
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Kondisi</p>
                    <Badge className="bg-green-500">{house.condition}</Badge>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-500">Status</p>
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
