"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import { ArrowLeft } from "lucide-react";

export default function AddRumahNegaraPage() {
  const [notes, setNotes] = useState("");
  const router = useRouter();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [type, setType] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");
  
  const handleSave = () => {
    // kirim data lewat query param
    const newHouse = {
    code,
    name,
    address,
    province,
    type,
    condition,
    status,
    };

    // kirim data pakai JSON string
    router.push(
      `/rumah-negara?newHouse=${encodeURIComponent(JSON.stringify(newHouse))}`
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
        <h1 className="text-xl font-semibold">Tambah Rumah</h1>
      </div>
      {/* Card identification */}
      <Card className="rounded-md p-4">
        <CardTitle>Identifikasi</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0">
          {/* code & house type */}
          <div className="flex w-full h-full gap-4 mb-4 md:flex-row flex-col">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Kode *</label>
              <Input
                placeholder="RN-2025-001"
                onChange={(e) => setCode(e.target.value)}
              />
              <label className="text-[10px] text-[#969696]">
                Format: RN-YYYY-NNN
              </label>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Tipe Rumah
              </label>
              <Select onValueChange={(value) => setType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Tipe Rumah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="official-residence">
                    Rumah Dinas
                  </SelectItem>
                  <SelectItem value="staff-housing">Perumahan Staf</SelectItem>
                  <SelectItem value="guest-house">Rumah Tamu</SelectItem>
                  <SelectItem value="dormitory">Asrama</SelectItem>
                  <SelectItem value="other">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* HouseName */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Nama Rumah*</label>
            <Input
              placeholder="Rumah Dinas Menteri"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      {/* Card Address */}
      <Card className="rounded-md p-4">
        <CardTitle>Alamat</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Alamat Jalan *</label>
            <Textarea
              placeholder="Lengkapi Alamat Jalan"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex w-full h-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Kota *</label>
              <Input placeholder="Jakarta Selatan" />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Provinsi *</label>
              <Select onValueChange={(value) => setProvince(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="official-residence">
                    DKI Jakarta
                  </SelectItem>
                  <SelectItem value="staff-housing">Jawa Barat</SelectItem>
                  <SelectItem value="guest-house">Jawa Tengah</SelectItem>
                  <SelectItem value="dormitory">Jawa Timur</SelectItem>
                  <SelectItem value="other">Bali</SelectItem>
                  <SelectItem value="other">DI Yogyakarta</SelectItem>
                  <SelectItem value="other">Sumatera Barat</SelectItem>
                  <SelectItem value="other">Sumatera Utara</SelectItem>
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
            Kedua koordinat diperlukan jika ada yang disediakan
          </span>
        </CardContent>
      </Card>

      {/* Card Physical */}
      <Card className="rounded-md p-4">
        <CardTitle>Fisik</CardTitle>
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

      {/* Card Classification */}
      <Card className="rounded-md p-4">
        <CardTitle>Klasifikasi</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex w-full h-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Kondisi *</label>
              <Select onValueChange={(value) => setCondition(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="good">Baik</SelectItem>
                  <SelectItem value="fair">Cukup</SelectItem>
                  <SelectItem value="need-repair">Butuh Perbaikan</SelectItem>
                  <SelectItem value="uninhabitable">Tidak Layak Huni</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Status *</label>
              <Select onValueChange={(value) => setStatus(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Tersedia</SelectItem>
                  <SelectItem value="occupied">Terisi</SelectItem>
                  <SelectItem value="maintenance">Dalam Perawatan</SelectItem>
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
              <label className="text-sm text-[#969696]">Nomor Meteran Air</label>
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
        <CardTitle>Catatan (Optional)</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-2">
          <Textarea
            placeholder="Catatan tambahan mengenai Properti"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <span className="text-[10px] text-[#969696]">
            {notes.length}/1000 karakter
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
          className="bg-green-500 hover:bg-green-600"
          onClick={handleSave}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
}
