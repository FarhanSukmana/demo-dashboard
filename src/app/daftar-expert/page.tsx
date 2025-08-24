"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

type Expert = {
  id: number;
  nama: string;
  pekerjaan: string;
  pendidikan: string;
  tahun_pengalaman_kerja: number;
  keahlian: string;
  pelatihan: string;
  brief_description: string;
  sertifikasi: string;
};

export default function ExpertListPage() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("nama"); // default: nama

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/Expert/");
      const data = await res.json();
      setExperts(data);
    } catch (error) {
      console.error("Error fetching experts:", error);
    }
    setLoading(false);
  };

  const handleSearch = async (value: string) => {
    setSearch(value);
    if (value.trim() === "") {
      fetchExperts();
      return;
    }

    let url = "";

    switch (searchBy) {
      case "pendidikan":
        url = `http://localhost:8000/Expert/search-by-pendidikan?pendidikan=${value}`;
        break;
      case "keahlian":
        url = `http://localhost:8000/Expert/search-by-keahlian?keahlian=${value}`;
        break;
      case "nama":
      default:
        url = `http://localhost:8000/Expert/search?nama=${value}`;
        break;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data)
      setExperts(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex w-full h-fit py-2 justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Daftar Expert</h1>
        <Link href={"/daftar-expert/add-expert"}>
          <Button>Tambah Expert</Button>
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder={`Cari expert berdasarkan ${searchBy}...`}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Select value={searchBy} onValueChange={(value) => setSearchBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Cari berdasarkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Search By</SelectLabel>
              <SelectItem value="nama">Nama</SelectItem>
              <SelectItem value="keahlian">Keahlian</SelectItem>
              <SelectItem value="pendidikan">Pendidikan</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} className="h-[150px] w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experts.map((expert) => (
            <Link
              key={expert.id}
              href={`/daftar-expert/${expert.id}`}
              className="h-full"
            >
              <Card className="h-full flex flex-col hover:shadow-lg cursor-pointer transition">
                <CardHeader>
                  <CardTitle className="text-xl">{expert.nama}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {expert.pekerjaan}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-1 space-y-2">
                  <p>
                    <strong>Pendidikan:</strong>
                    <br />
                    {truncateText(expert.pendidikan, 20)}
                  </p>
                  <p>
                    <strong>Pengalaman:</strong> {expert.tahun_pengalaman_kerja}{" "}
                    tahun
                  </p>
                  <p>
                    <strong>Keahlian:</strong>
                    <br />
                    {truncateText(expert.keahlian, 10)}
                  </p>
                  <p>
                    <strong>Deskripsi:</strong>
                    <br />
                    {truncateText(expert.brief_description, 25)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
