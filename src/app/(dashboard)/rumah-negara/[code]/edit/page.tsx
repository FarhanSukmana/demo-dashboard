"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { ArrowLeft } from "lucide-react";

// Dummy data source (sama seperti di list)
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
  notes: "Catatan opsional rumah " + (i + 1),
}));

export default function RumahNegaraDetails() {
  const params = useParams();
  const router = useRouter();
  const { code } = params;

  const [house, setHouse] = useState<any>(null);

  useEffect(() => {
    // cari data sesuai code
    const found = dummyHouses.find((h) => h.code === code);
    if (found) setHouse(found);
  }, [code]);

  // state untuk edit form
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (house) {
      setName(house.name);
      setType(house.type);
      setProvince(house.province);
      setAddress(house.address);
      setCondition(house.condition);
      setStatus(house.status);
      setNotes(house.notes);
    }
  }, [house]);

  const handleSave = () => {
    console.log("Updated House:", {
      code,
      name,
      type,
      province,
      address,
      condition,
      status,
      notes,
    });
    router.push("/rumah-negara"); // kembali ke list
  };

  if (!house) return <p className="p-4">Loading...</p>;

  return (
    <div className="space-y-6 pb-10">
      {/* Back Button */}
      <div className="flex gap-x-4 items-center">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-semibold">Edit Rumah - {house.code}</h1>
      </div>

      {/* Identification */}
      <Card className="rounded-md p-4">
        <CardTitle>Identifikasi</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0">
          <div className="flex w-full h-full gap-4 mb-4 md:flex-row flex-col">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Kode *</label>
              <Input value={house.code} disabled />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-gray-700">Tipe Rumah</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select House Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Official Residence">
                    Rumah Dinas
                  </SelectItem>
                  <SelectItem value="Staff Housing">Perumahan Staf</SelectItem>
                  <SelectItem value="Guest House">Rumah Tamu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Nama Rumah *</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card className="rounded-md p-4">
        <CardTitle>Alamat</CardTitle>
        <CardContent className="flex flex-col gap-y-4 w-full h-full p-0">
          <div className="flex flex-col gap-2 w-full h-full">
            <label className="text-sm text-[#969696]">Alamat Jalan *</label>
            <Textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Kota *</label>
              <Input placeholder="Jakarta Selatan" />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Provinsi *</label>
              <Select value={province} onValueChange={setProvince}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
                  <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                  <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                  <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Kode Pos*</label>
              <Input placeholder="12940" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Location */}
      <Card className="rounded-md p-4">
        <CardTitle>Lokasi (Optional)</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex w-full h-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Lintang</label>
              <Input type="number" placeholder="-6.2088" />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Garis Bujur</label>
              <Input type="number" placeholder="106.8456" />
            </div>
          </div>
          <span className="text-[10px] text-[#969696]">
            Both coordinates required if any provided
          </span>
        </CardContent>
      </Card>

      {/* Card Physical */}
      <Card className="rounded-md p-4">
        <CardTitle>Physical</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex w-full h-full gap-4 flex-wrap">
            <div className="flex flex-col w-full md:w-1/6 gap-2">
              <label className="text-sm text-[#969696]">Lantai</label>
              <Input type="number" placeholder="2" />
            </div>
            <div className="flex flex-col w-full md:w-1/6 gap-2">
              <label className="text-sm text-[#969696]">Kamar Tidur</label>
              <Input type="number" placeholder="3" />
            </div>
            <div className="flex flex-col w-full md:w-1/6 gap-2">
              <label className="text-sm text-[#969696]">Kamar Mandi</label>
              <Input type="number" placeholder="2" />
            </div>
            <div className="flex flex-col w-full md:w-1/6 gap-2">
              <label className="text-sm text-[#969696]">Luas Tanah (m²)</label>
              <Input type="number" placeholder="200" />
            </div>
            <div className="flex flex-col w-full md:w-1/6 gap-2">
              <label className="text-sm text-[#969696]">
                Luas Bangunan (m²)
              </label>
              <Input placeholder="150" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Classification */}
      <Card className="rounded-md p-4">
        <CardTitle>Klasifikasi</CardTitle>
        <CardContent className="flex flex-col gap-y-4 p-0">
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Kondisi *</label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Good">Baik</SelectItem>
                  <SelectItem value="Fair">Cukup</SelectItem>
                  <SelectItem value="Needs Repair">Butuh Perbaikan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Status *</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Tersedia</SelectItem>
                  <SelectItem value="Occupied">Terisi</SelectItem>
                  <SelectItem value="Maintenance">Dalam Perawatan</SelectItem>
                </SelectContent>
              </Select>
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
              <label className="text-sm text-[#969696]">Nomor Ase</label>
              <Input placeholder="AST2025001" />
            </div>
            <div className="flex flex-col w-full  gap-2">
              <label className="text-sm text-[#969696]">Nomor Serifikat</label>
              <Input placeholder="CERT2025001" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="rounded-md p-4">
        <CardTitle>Catatan</CardTitle>
        <CardContent className="flex flex-col gap-y-2">
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button className="bg-[#031833] dark:text-white" onClick={handleSave}>
          Simpan Perubahan
        </Button>
      </div>
    </div>
  );
}
