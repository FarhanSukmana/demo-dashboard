"use client";
import { useActionState, useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import * as indonesia from "daftar-wilayah-indonesia";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Tipe data untuk hasil expert

type Expert = {
  id: number;
  nama: string;
  pekerjaan: string;
  keahlian: string;
  skor_kecocokan: number;
};

type Wilayah = { id: string; nama: string };

export default function RecommendPage() {
  const [title, setTitle] = useState<string>("");
  const [pendidikan, setPendidikan] = useState<string>("");
  const [bidangKeahlian, setBidangKeahlian] = useState<string>("");
  const [kualifikasi, setKualifikasi] = useState<string>("");

  // cascading wilayah
  const [provinsi, setProvinsi] = useState<Wilayah | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  const provinsiList: Wilayah[] = indonesia.provinsi();
  console.log(provinsiList);

  const [result, setResult] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const handleRecommend = async () => {
    try {
      setIsLoading(true);
      console.log(title, pendidikan, bidangKeahlian, provinsi?.nama)
      // const response = await axios.post<{ recommended_experts: Expert[] }>(
      //   "http://localhost:8000/recommend",
      //   {
      //     title,
      //     pendidikan,
      //     bidang_keahlian: bidangKeahlian.split(",").map((item) => item.trim()),
      //     daerah: provinsi?.nama || "",
      //   }
      // );
      // setResult(response.data.recommended_experts);
    } catch (error) {
      console.error("Error in /recommend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecommendByKualifikasi = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post<{ recommended_experts: Expert[] }>(
        "http://localhost:8000/Recommendations/recommend-by-kualifikasi",
        {
          title,
          kualifikasi,
        }
      );
      setResult(response.data.recommended_experts);
    } catch (error) {
      console.error("Error in /recommend-by-kualifikasi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Sistem Rekomendasi Expert</h1>

      {/* Form Rekomendasi Berdasarkan Bidang */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <Label>Judul Proyek</Label>
          <Input
            placeholder="Contoh: Optimasi Energi Terbarukan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex w-full gap-x-2">
            <div className="flex flex-col w-full gap-y-4">
              <Label>Pendidikan Minimal</Label>
              <Input
                placeholder="S1 / S2 / S3"
                value={pendidikan}
                onChange={(e) => setPendidikan(e.target.value)}
              />
            </div>
            {/* Dropdown Daerah */}
            <div className="flex flex-col w-full gap-y-4">
              <Label>Daerah</Label>
              <div className="flex flex-col gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {value
                        ? provinsiList.find(
                            (provinsi) => provinsi.nama === value
                          )?.nama
                        : "Pilih Provinsi"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search Provinsi"
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {provinsiList.map((provinsi) => (
                            <CommandItem
                              key={provinsi.id}
                              value={provinsi.nama}
                              onSelect={(currentValue) => {
                                const selected = provinsiList.find(
                                  (p) => p.nama === currentValue
                                );
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setProvinsi(selected ?? null); // <-- simpan object provinsi
                                setOpen(false);
                              }}
                            >
                              {provinsi.nama}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  value === provinsi.nama
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          
          <Label>Bidang Keahlian (pisahkan dengan koma)</Label>
          <Input
            placeholder="Contoh: energi, listrik, renewable"
            value={bidangKeahlian}
            onChange={(e) => setBidangKeahlian(e.target.value)}
          />

          <Button onClick={handleRecommend} disabled={isLoading}>
            {isLoading ? "Mencari..." : "Cari Rekomendasi (/recommend)"}
          </Button>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">ATAU</div>

      {/* Form Rekomendasi Berdasarkan Kualifikasi Lengkap */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <Label>Judul Proyek</Label>
          <Input
            placeholder="Contoh: Analisis Sistem Distribusi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Label>Paragraf Kualifikasi (isi lengkap)</Label>
          <Textarea
            rows={4}
            placeholder="Isi dengan gabungan: pendidikan, pengalaman kerja, lokasi, bahasa, dll."
            value={kualifikasi}
            onChange={(e) => setKualifikasi(e.target.value)}
          />

          <Button onClick={handleRecommendByKualifikasi} disabled={isLoading}>
            {isLoading
              ? "Mencari..."
              : "Cari Rekomendasi (/recommend-by-kualifikasi)"}
          </Button>
        </CardContent>
      </Card>

      {/* Hasil Rekomendasi */}
      {result.length > 0 && (
        <div className="space-y-4 ">
          <h2 className="text-xl font-semibold">Hasil Rekomendasi:</h2>
          {result.map((expert) => (
            <Link
              key={expert.id}
              href={`/daftar-expert/${expert.id}`}
              className="gap-y-4 bg-white"
            >
              <Card className="gap-y-4 hover:scale-101 transition mb-4">
                <CardContent className="p-4 space-y-2 hover:shadow-lg">
                  <div className="text-lg font-medium underline">
                    {expert.nama}
                  </div>
                  <div className="text-muted-foreground">
                    {truncateText(expert.pekerjaan, 25)}
                  </div>
                  <div>
                    <h3>Keahlian</h3>
                    <p className="text-muted-foreground">{expert.keahlian}</p>
                  </div>
                  <Badge variant="outline">
                    Skor: {expert.skor_kecocokan.toFixed(4)}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
