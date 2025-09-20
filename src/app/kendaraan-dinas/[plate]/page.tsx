"use client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Calendar, MapPin, Copy } from "lucide-react";

// Dummy data 20 kendaraan dinas
const dummyVehicles = Array.from({ length: 20 }, (_, i) => ({
  plate: `B ${1000 + i} ${["ABC", "DEF", "GHI", "JKL", "MNO"][i % 5]}`,
  brand:
    i < 5
      ? `Toyota Fortuner ${i + 1}`
      : i < 10
      ? `Mitsubishi Pajero ${i + 1}`
      : i < 15
      ? `Honda CR-V ${i + 1}`
      : `Suzuki Ertiga ${i + 1}`,
  year: 2010 + (i % 15), // tahun 2010–2024
  fuel: i % 2 === 0 ? "Gasoline" : "Diesel",
  odometer: (i + 1) * 5000, // jarak tempuh naik tiap kendaraan
  condition:
    i % 4 === 0
      ? "Good"
      : i % 4 === 1
      ? "Fair"
      : i % 4 === 2
      ? "Needs Repair"
      : "Good",
  status: i % 3 === 0 ? "Available" : i % 3 === 1 ? "In Use" : "Maintenance",
}));
export default function KegiatanDetails() {
  const { plate } = useParams();
  const router = useRouter();

  const decodedPlate = decodeURIComponent(plate as string);
  const vehicle = dummyVehicles.find((h) => h.plate === decodedPlate);
  const handleCopy = (text: any) => {
    navigator.clipboard.writeText(text);
    alert("Disalin: " + text);
  };

  if (!vehicle) {
    return <div className="p-6">Vehicle not found</div>;
  }

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
            Kembali
          </Button>
          <h1 className="text-2xl font-semibold">Detail Kendaraan</h1>
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
        </div>
      </div>

      {/* Grid utama */}
      <div className="grid grid-cols-3 gap-6">
        {/* Kolom kiri: informasi kendaraan */}
        <div className="col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 grid grid-cols-2 gap-x-6 gap-y-4">
              <h2 className="col-span-2 text-lg font-semibold mb-4 flex items-center gap-2">
                Informasi Kendaraan
              </h2>

              <div>
                <p className="text-sm text-gray-500">Nomor Polisi</p>
                <p className="font-medium">{vehicle.plate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">VIN</p>
                <p className="font-medium">1HGBH41JXMN109186</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Brand</p>
                <p className="font-medium">{vehicle.brand}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-medium">Camry</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tahun</p>
                <p className="font-medium">{vehicle.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Jenis Kendaraan</p>
                <p className="font-medium">Car</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Jenis Bahan Bakar</p>
                <p className="font-medium">{vehicle.fuel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Odometer</p>
                <p className="font-medium">{vehicle.odometer}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Kondisi</p>
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
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
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
              </div>

              <div className="col-span-2">
                <p className="text-sm text-gray-500">Unit Pemilik</p>
                <p className="font-medium">Divisi Umum</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Catatan</p>
                <p className="font-medium">
                  Perawatan rutin dijadwalkan setiap bulan
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Card */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-semibold">Kepatuhan</h2>

              <div className="flex justify-between items-center border rounded-lg p-3 ">
                <div>
                  <p className="text-sm text-gray-500">Nomor STNK</p>
                  <p className="font-medium">STNKO01</p>
                  <p className="text-sm text-gray-500">
                    Berlaku hingga: 15/06/2025
                  </p>
                </div>
                <Badge className="bg-red-100 text-red-600 rounded-md">
                  Kedaluwarsa
                </Badge>
              </div>

              <div className="flex justify-between items-center border rounded-lg p-3">
                <div>
                  <p className="text-sm text-gray-500">Nomor Polis Asuransi</p>
                  <p className="font-medium">INS001</p>
                  <p className="text-sm text-gray-500">
                    Berlaku hingga: 20/03/2025
                  </p>
                </div>
                <Badge className="bg-red-100 text-red-600 rounded-md">
                  Kedaluwarsa
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kolom kanan: Service & Maintenance + Audit */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Servis & Perbaikan</h2>
              <div>
                <p className="text-sm text-gray-500">Tanggal Servis Terakhir</p>
                <p className="font-medium">15/02/2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Tanggal Servis Berikutnya
                </p>
                <p className="font-medium">15/08/2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Servis Berikutnya (km)</p>
                <p className="font-medium">55.000</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-lg font-semibold">Audit</h2>
              <div>
                <p className="text-sm text-gray-500">Dibuat</p>
                <p className="text-sm">2024-01-10 09:30:00</p>
                <p className="text-xs text-gray-500">oleh Admin User</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Terakhir Diperbarui</p>
                <p className="text-sm">2024-03-15 14:22:00</p>
                <p className="text-xs text-gray-500">oleh Manajer Armada</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
