"use client";

import { useState, useEffect } from "react";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

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
      ? "Needs-Repair"
      : "Good",
  status: i % 3 === 0 ? "Available" : i % 3 === 1 ? "In Use" : "Maintenance",
}));

export default function EditKendaraanDinasPage() {
  const [notes, setNotes] = useState("");

  const params = useParams();
  const router = useRouter();
  const [openLast, setOpenLast] = React.useState(false);
  const [lastServiceDate, setLastServiceDate] = React.useState<
    Date | undefined
  >(undefined);

  const [openNext, setOpenNext] = React.useState(false);
  const [nextServiceDate, setNextServiceDate] = React.useState<
    Date | undefined
  >(undefined);

  const { plate } = useParams();
  const [vehicle, setVehicle] = useState<any>(null);
  const decodedPlate = decodeURIComponent(plate as string);

  useEffect(() => {
    const found = dummyVehicles.find((h) => h.plate === decodedPlate);
    if (found) setVehicle(found);
  }, [plate]);

  // Add Data
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [odometer, setOdometer] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (vehicle) {
      setBrand(vehicle.brand);
      setYear(vehicle.year);
      setFuel(vehicle.fuel);
      setOdometer(vehicle.odometer);
      setCondition(vehicle.condition);
      setStatus(vehicle.status);
    }
  });

  const handleSave = () => {
    const newVehicle = {
      plate,
      brand,
      year,
      fuel,
      odometer,
      condition,
      status,
    };
    router.push(`/kendaraan-dinas`);
  };

  if (!vehicle) return <p className="p-4">Loading...</p>;

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
        <h1 className="text-xl font-semibold">Ubah Kendaraan Dinas</h1>
      </div>
      {/* Card identification */}
      <Card className="rounded-md p-4">
        <CardTitle>Identifikasi</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0">
          {/* Plate & VIN */}
          <div className="flex w-full h-full gap-4 mb-4 md:flex-row flex-col">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Nomor Polisi *</label>
              <Input placeholder="B 1234 XYZ" value={decodedPlate} disabled />
              <label className="text-[10px] text-[#969696]">
                Format: B 1234 XYZ
              </label>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">VIN</label>
              <Input placeholder="1HGBH41JXMN109186" />
            </div>
          </div>
          {/* Brand & Mode, type */}
          <div className="flex w-full h-full gap-4 mb-4 md:flex-row flex-col">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Brand *</label>
              <Input
                placeholder="Toyota"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Model *</label>
              <Input placeholder="Camry" />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Jenis Kendaraan
              </label>
              <Select defaultValue="car">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                  <SelectItem value="utility">Utility</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Year, Fuel, Owning Unit */}
          <div className="flex w-full h-full gap-4 mb-4 md:flex-row flex-col">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Tahun *</label>
              <Input
                type="number"
                value={year}
                placeholder="2020"
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">
                Jenis Bahan Bakar *
              </label>
              <Select value={fuel} onValueChange={setFuel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gasoline">Bensin</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Unit Pemilik
              </label>
              <Input placeholder="Divisi Umum" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status & Condition */}
      <Card className="rounded-md p-4">
        <CardTitle>Status & Kondisi</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex w-full h-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Kondisi *</label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Good">Baik</SelectItem>
                  <SelectItem value="Fair">Cukup</SelectItem>
                  <SelectItem value="Needs-Repair">Butuh Perbaikan</SelectItem>
                  <SelectItem value="Unroadworthy">
                    Tidak Layak Jalan
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Status *</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Tersedia</SelectItem>
                  <SelectItem value="Inuse">Sedang digunakan</SelectItem>
                  <SelectItem value="Maintenance">Dalam Perawatan</SelectItem>
                  <SelectItem value="Inactive">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Odometer & Service */}
      <Card className="rounded-md p-4">
        <CardTitle>Odometer & Service</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          {/* Odometer */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Odometer (km)*</label>
            <Input
              type="number"
              value={odometer}
              onChange={(e) => setOdometer(e.target.value)}
            />
          </div>

          {/* Last Service Date + Next Service Date + VIN */}
          <div className="flex w-full h-full gap-4 mb-4 md:flex-row flex-col">
            {/* Last Service Date */}
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="lastService" className="text-sm text-[#969696]">
                Tanggal Terakhir Service
              </label>
              <Popover open={openLast} onOpenChange={setOpenLast}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="lastService"
                    className="justify-between font-normal"
                  >
                    {lastServiceDate
                      ? lastServiceDate.toLocaleDateString()
                      : "Select date"}
                    <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={lastServiceDate}
                    captionLayout="dropdown"
                    onSelect={(d) => {
                      setLastServiceDate(d);
                      setOpenLast(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Next Service Date */}
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="nextService" className="text-sm text-[#969696]">
                Tanggal Service Berikutnya
              </label>
              <Popover open={openNext} onOpenChange={setOpenNext}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="nextService"
                    className="justify-between font-normal"
                  >
                    {nextServiceDate
                      ? nextServiceDate.toLocaleDateString()
                      : "Select date"}
                    <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={nextServiceDate}
                    captionLayout="dropdown"
                    onSelect={(d) => {
                      setNextServiceDate(d);
                      setOpenNext(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Next Service Due */}
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Service Berikutnya pada
              </label>
              <Input type="number" placeholder="55000" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Utilities & Documents */}
      <Card className="rounded-md p-4">
        <CardTitle>Utilitas & Dokumen (Optional)</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">
                Nomor Meteran Listrik
              </label>
              <Input placeholder="ELC2025001" />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">
                Nomor Meteran Air
              </label>
              <Input placeholder="WTR2025001" />
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Nomor Aset</label>
              <Input placeholder="AST2025001" />
            </div>
            <div className="flex flex-col w-full  gap-2">
              <label className="text-sm text-[#969696]">Nomor Sertifikat</label>
              <Input placeholder="CERT2025001" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Notes */}
      <Card className="rounded-md p-4">
        <CardTitle>Telemetri & Catatan</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex flex-col w-full  gap-2">
            <label className="text-sm text-[#969696]">ID Perangkat GPS</label>
            <Input placeholder="GPS001" />
          </div>
          <div className="flex flex-col w-full  gap-2">
            <label className="text-sm text-[#969696]">Catatan</label>
            <Textarea
              placeholder="Additional notes about the Vehicle"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
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
          type="submit"
          className="bg-[#031833] dark:text-white"
          onClick={handleSave}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
}
