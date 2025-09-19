"use client";
import { useRef, useState } from "react";
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

import {
  ArrowLeft,
  Calendar,
  MapPin,
  Settings,
  FileText,
  Users,
  DollarSign,
  FileUp,
} from "lucide-react";

export default function AddActivityPage() {
const kakRef = useRef<HTMLInputElement | null>(null);
const agendaRef = useRef<HTMLInputElement | null>(null);
const lainnyaRef = useRef<HTMLInputElement | null>(null);

  const [notes, setNotes] = useState("");
  const router = useRouter();
const handleUploadClick = (ref: React.RefObject<HTMLInputElement | null>) => {
  ref.current?.click();
};

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    if (event.target.files && event.target.files[0]) {
      alert(`${label} terunggah: ${event.target.files[0].name}`);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Back Button */}
      <div className="flex gap-x-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
        <h1 className="text-xl font-semibold">Kegiatan Baru</h1>
      </div>

      {/* Card Dasar */}
      <Card className="rounded-md p-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5" />
          <h2 className="font-semibold">Dasar</h2>
        </div>
        <CardContent className="flex flex-col gap-4 p-0">
          <div>
            <label className="text-sm ">Kode Kegiatan</label>
            <Input value="EV-2025-497" />
            <p className="text-xs text-gray-400">
              Format: EV-YYYY-NNN (dibuat otomatis)
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex w-full flex-col">
              <label className="text-sm  ">Judul *</label>
              <Input placeholder="Judul kegiatan (5-150 karakter)" />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm  ">Kategori *</label>
              <Select defaultValue="rapat">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rapat">Rapat</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="pelatihan">Pelatihan</SelectItem>
                  <SelectItem value="upacara">Upacara</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm  ">Unit Penyelenggara *</label>
            <Input placeholder="Unit/Bagian yang menyelenggarakan kegiatan" />
          </div>

          <div>
            <label className="text-sm  ">Pemohon</label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex w-full flex-col">
                <label className="text-sm  text-gray-400">Nama*</label>
                <Input placeholder="Nama Lengkap" />
              </div>
              <div className="flex w-full flex-col">
                <label className="text-sm  text-gray-400">NIP</label>
                <Input placeholder="Nomor Induk Pegawai (Opsional)" />
              </div>
              <div className="flex w-full flex-col">
                <label className="text-sm  text-gray-400">Kontak</label>
                <Input placeholder="Telepon/Email (Opsional)" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Jadwal & Lokasi */}
      <Card className="rounded-md p-4">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5  " />
          <h2 className="font-semibold">Jadwal & Lokasi</h2>
        </div>
        <CardContent className="flex flex-col gap-4 p-0">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm  ">Tanggal/Waktu Mulai *</label>
              <Input placeholder="dd/mm/yyyy --:--" />
            </div>
            <div className="flex-1">
              <label className="text-sm  ">Tanggal/Waktu Selesai *</label>
              <Input placeholder="dd/mm/yyyy --:--" />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm  ">Jenis Lokasi *</label>
            <Select defaultValue="luring">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih jenis lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="luring">Luring</SelectItem>
                <SelectItem value="daring">Daring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lokasi Fisik */}
          <div className="rounded-md border border-green-200 bg-green-50 p-4 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <p className="text-green-700 font-medium">Lokasi Fisik</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm text-green-600">Gedung *</label>
                <Input
                  placeholder="Contoh: Gedung A"
                  className="bg-white text-black border border-gray-300"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-green-600">Ruangan</label>
                <Select>
                  <SelectTrigger className="w-full bg-white text-black border border-gray-300">
                    <SelectValue placeholder="Pilih Ruangan (Opsional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ruang-rapat-a">Ruang Rapat A</SelectItem>
                    <SelectItem value="ruang-rapat-b">Ruang Rapat B</SelectItem>
                    <SelectItem value="ruang-rapat-c">Ruang Rapat C</SelectItem>
                    <SelectItem value="daring">Daring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm text-green-600">
                Alamat Lengkap (opsional)
              </label>
              <Input
                placeholder="Masukkan alamat lengkap gedung"
                className="bg-white text-black border border-gray-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Operasional */}
      <Card className="rounded-md p-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5  " />
          <h2 className="font-semibold">Operasional</h2>
        </div>
        <CardContent className="flex flex-col gap-4 p-0">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm  ">Peserta</label>
              <Input type="number" placeholder="23" />
            </div>
            <div className="flex-1">
              <label className="text-sm  ">Tingkat Keamanan</label>
              <Select defaultValue="normal">
                <SelectTrigger>
                  <SelectValue placeholder="Tingkat Keamanan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terbatas">Terbatas</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm  ">Memerlukan Kendaraan</label>
              <Select defaultValue="tidak">
                <SelectTrigger>
                  <SelectValue placeholder="Memerlukan Kendaraan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ya">Ya</SelectItem>
                  <SelectItem value="tidak">Tidak</SelectItem>
                </SelectContent>
              </Select>{" "}
            </div>
          </div>

          <div className="flex gap-4 items-end w-full">
            <div className="flex-1">
              <label className="text-sm  ">Peralatan Dibutuhkan</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih peralatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="projector">Projector</SelectItem>
                  <SelectItem value="mic">Microphone</SelectItem>
                  <SelectItem value="speaker">Speaker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-green-500 hover:bg-green-600">Tambah</Button>
          </div>

          <div className="gap-4">
            <label className="flex items-center gap-1 text-sm  w-full">
              <DollarSign className="h-4 w-4" /> Catatan Anggaran
            </label>
            <Textarea placeholder="Pertimbangan anggaran, biaya, sumber dana (opsional)" />
            <p className="text-xs text-gray-400">0/500 karakter</p>
          </div>
        </CardContent>
      </Card>

      {/* Card Dokumen */}
      <Card className="rounded-md p-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5  " />
          <h2 className="font-semibold">Dokumen</h2>
        </div>
        <CardContent className="flex flex-col gap-4 p-0">
          <div className="p-3 rounded-md bg-blue-50 border border-blue-200 text-sm text-blue-800">
            ⚠️ Dokumen Kerangka Acuan Kerja (KAK) dan Agenda wajib untuk
            pengajuan.
          </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Unggah KAK */}
      <div
        onClick={() => handleUploadClick(kakRef)}
        className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer"
      >
        <FileUp className="h-6 w-6 mb-2" />
        <p>Unggah KAK</p>
        <Input
          type="file"
          ref={kakRef}
          className="hidden"
          onChange={(e) => handleFileChange(e, "KAK")}
        />
      </div>

      {/* Unggah Agenda */}
      <div
        onClick={() => handleUploadClick(agendaRef)}
        className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer"
      >
        <FileUp className="h-6 w-6 mb-2" />
        <p>Unggah Agenda</p>
        <Input
          type="file"
          ref={agendaRef}
          className="hidden"
          onChange={(e) => handleFileChange(e, "Agenda")}
        />
      </div>

      {/* Unggah Lainnya */}
      <div
        onClick={() => handleUploadClick(lainnyaRef)}
        className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer"
      >
        <FileUp className="h-6 w-6 mb-2" />
        <p>Unggah Lainnya</p>
        <Input
          type="file"
          ref={lainnyaRef}
          className="hidden"
          onChange={(e) => handleFileChange(e, "Lainnya")}
        />
      </div>
    </div>
        </CardContent>
      </Card>

      {/* Card Notes */}
      <Card className="rounded-md p-4">
        <CardTitle>Catatan</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex flex-col w-full  gap-2">
            <label className="text-sm text-[#969696]">Catatan Tambahan</label>
            <Textarea
              placeholder="Informasi Tambahan"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <span className="text-[10px] text-[#969696]">
            {notes.length}/1000 characters
          </span>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          Batal
        </Button>
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          Simpan
        </Button>
      </div>
    </div>
  );
}
