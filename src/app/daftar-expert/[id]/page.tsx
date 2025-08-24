"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Expert {
  id: number;
  nama: string;
  pekerjaan: string;
  pendidikan: string;
  tahun_pengalaman_kerja: number;
  keahlian: string;
  pelatihan: string;
  brief_description: string;
  sertifikasi: string;
}

export default function ExpertDetailPage() {
  const { id } = useParams();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchExpert = async () => {
      try {
        const res = await fetch(`http://localhost:8000/Expert/${id}`);
        const data = await res.json();
        setExpert(data);
      } catch (error) {
        console.error("Error fetching expert:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpert();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-10 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (!expert)
    return <div className="p-6 text-red-500">Expert tidak ditemukan.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{expert.nama}</CardTitle>
          <p className="text-sm text-gray-500">{expert.pekerjaan}</p>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <strong>Pendidikan:</strong>
            <p className="whitespace-pre-line">{expert.pendidikan}</p>
          </div>
          <div>
            <strong>Pengalaman Kerja:</strong> {expert.tahun_pengalaman_kerja}{" "}
            tahun
          </div>
          <div>
            <strong>Keahlian:</strong>
            <p className="whitespace-pre-line">{expert.keahlian}</p>
          </div>
          <div>
            <strong>Pelatihan:</strong>
            <p className="whitespace-pre-line">{expert.pelatihan}</p>
          </div>
          <div>
            <strong>Deskripsi Singkat:</strong>
            <p className="whitespace-pre-line">{expert.brief_description}</p>
          </div>
          {expert.sertifikasi && (
            <div>
              <strong>Sertifikasi:</strong>
              <p className="whitespace-pre-line">{expert.sertifikasi}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
