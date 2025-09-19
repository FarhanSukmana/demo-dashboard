"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Calendar,
  MapPin,
  User,
  ExternalLink,
  Copy,
} from "lucide-react";

export default function PerizinanKegiatanDetails() {
  const router = useRouter();
  const handleCopy = (text: any) => {
    navigator.clipboard.writeText(text);
    alert("Disalin: " + text);
  };

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
            Kembali
          </Button>
          <h1 className="text-2xl font-semibold">Detail Kegiatan</h1>
          <Badge className="bg-blue-100 text-blue-700">Diajukan</Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Informasi Kegiatan */}
          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Informasi Kegiatan</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Kode Kegiatan</p>
                  <p className="font-medium">EV-2025-002</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kategori</p>
                  <p className="font-medium">Rapat</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Judul</p>
                  <p className="font-medium">Rapat Bulanan Pegawai</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Unit Penyelenggara</p>
                  <p className="font-medium">Sumber Daya Manusia</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pemohon</p>
                  <p className="font-medium">Budi Santoso</p>
                  <p className="text-sm text-gray-500">
                    NIP: 198703051995121001
                  </p>
                  <p className="text-sm text-blue-600">
                    budi.santoso@kemenkumham.go.id
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Catatan</p>
                  <p className="font-medium">Rapat koordinasi bulanan rutin</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jadwal & Lokasi */}
          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Jadwal & Lokasi</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Mulai</p>
                  <p className="font-medium">
                    Selasa, 25 Maret 2025 pukul 10.00
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Selesai</p>
                  <p className="font-medium">
                    Selasa, 25 Maret 2025 pukul 12.00
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Jenis Lokasi</p>
                <Badge className="bg-blue-100 text-blue-700">Daring</Badge>
              </div>

              <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
                <p className="font-medium text-blue-800 mb-2">Rapat Virtual</p>

                {/* URL Zoom */}
                <div className="flex items-center gap-2 text-sm mb-1">
                  <span className="text-gray-600">URL Zoom:</span>
                  <a
                    href="#"
                    className="text-blue-600 underline flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gabung Rapat <ExternalLink size={14} />
                  </a>
                  <Copy
                    size={14}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => handleCopy("https://zoom.us/j/987654321")}
                  />
                </div>

                {/* ID Rapat */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">ID Rapat:</span>
                  <span className="text-blue-700">987654321</span>
                  <Copy
                    size={14}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => handleCopy("987654321")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Peserta</p>
                  <p className="font-medium">25 orang</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tingkat Keamanan</p>
                  <Badge variant="outline">Normal</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dokumen & Review */}
        <div className="flex w-full h-fit">
          <Card>
            <CardContent className="p-6 space-y-6 h-fit">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Dokumen & Review</h2>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center border p-2 rounded-md">
                  <div>
                    <p className="font-medium">KAK_Rapat.pdf</p>
                    <p className="text-xs text-gray-500">KAK</p>
                  </div>
                  <Button variant="ghost">⬇</Button>
                </div>
                <div className="flex justify-between items-center border p-2 rounded-md">
                  <div>
                    <p className="font-medium">Agenda_Rapat.pdf</p>
                    <p className="text-xs text-gray-500">Agenda</p>
                  </div>
                  <Button variant="ghost">⬇</Button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Timeline Review</p>
                <p className="text-gray-700 italic">
                  Belum ada komentar review.
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Audit</p>
                <p className="text-sm">
                  Dibuat: 15/3/2025, 09.15
                  <p className="text-sm text-gray-500">oleh Budi Santoso</p>
                </p>
                <p className="text-sm">
                  Diperbarui: 15/3/2025, 09.15 oleh Budi Santoso
                </p>
                <p className="text-sm text-gray-500">oleh Budi Santoso</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
