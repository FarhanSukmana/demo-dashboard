"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Calendar, MapPin, Copy } from "lucide-react";

export default function KegiatanDetails() {
  const router = useRouter();

  const handleCopy = (text: any) => {
    navigator.clipboard.writeText(text);
    alert("Disalin: " + text);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold">Vehicle Details</h1>
          <Badge className="bg-green-100 text-green-700 rounded-full">
            Available
          </Badge>
        </div>
      </div>

      {/* Grid utama */}
      <div className="grid grid-cols-3 gap-6">
        {/* Kolom kiri: informasi kendaraan */}
        <div className="col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 grid grid-cols-2 gap-x-6 gap-y-4">
              <h2 className="col-span-2 text-lg font-semibold mb-4 flex items-center gap-2">
                🚗 Vehicle Information
              </h2>

              <div>
                <p className="text-sm text-gray-500">Plate Number</p>
                <p className="font-medium">B 1234 ABC</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">VIN</p>
                <p className="font-medium">1HGBH41JXMN109186</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Brand</p>
                <p className="font-medium">Toyota</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-medium">Camry</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-medium">2020</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">Car</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fuel Type</p>
                <p className="font-medium">Gasoline</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Odometer</p>
                <p className="font-medium">45.000 km</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Condition</p>
                <Badge className="bg-green-100 text-green-700 rounded-full">
                  Good
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge className="bg-green-100 text-green-700 rounded-full">
                  Available
                </Badge>
              </div>

              <div className="col-span-2">
                <p className="text-sm text-gray-500">Owning Unit</p>
                <p className="font-medium">General Affairs Division</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Notes</p>
                <p className="font-medium">
                  Regular maintenance scheduled monthly
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Card */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-semibold">Compliance</h2>

              <div className="flex justify-between items-center border rounded-lg p-3 ">
                <div>
                  <p className="text-sm text-gray-500">STNK Number</p>
                  <p className="font-medium">STNKO01</p>
                  <p className="text-sm text-gray-500">Expires: 15/06/2025</p>
                </div>
                <Badge className="bg-red-100 text-red-600 rounded-md">
                  Expired
                </Badge>
              </div>

              <div className="flex justify-between items-center border rounded-lg p-3">
                <div>
                  <p className="text-sm text-gray-500">Insurance Policy No</p>
                  <p className="font-medium">INS001</p>
                  <p className="text-sm text-gray-500">Expires: 20/03/2025</p>
                </div>
                <Badge className="bg-red-100 text-red-600 rounded-md">
                  Expired
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kolom kanan: Service & Maintenance + Audit */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Service & Maintenance</h2>
              <div>
                <p className="text-sm text-gray-500">Last Service Date</p>
                <p className="font-medium">15/02/2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Service Due Date</p>
                <p className="font-medium">15/08/2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Service Due (km)</p>
                <p className="font-medium">55.000</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-lg font-semibold">Audit</h2>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-sm">2024-01-10 09:30:00</p>
                <p className="text-xs text-gray-500">by Admin User</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-sm">2024-03-15 14:22:00</p>
                <p className="text-xs text-gray-500">by Fleet Manager</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
