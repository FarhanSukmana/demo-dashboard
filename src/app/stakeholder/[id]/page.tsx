"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Stakeholder {
  id: number;
  name: string;
  organization?: string;
  position?: string;
  category?: string;
  power?: number;
  interest?: number;
  location?: string;
}

const Stakeholderdetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [stakeHolder, setStakeHolder] = useState<Stakeholder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/Stakeholder/${id}`);
        const data = await res.json();
        setStakeHolder(data);
        console.log(data);
        console.log("res", res);
      } catch (error) {
        console.log("=Error Fetching Data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Detail Stakeholder</CardTitle>
          <Button onClick={() => router.push("/stakeholder")}>Kembali</Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : stakeHolder ? (
            <div className="space-y-2">
              <p>
                <strong>Nama:</strong> {stakeHolder.name}
              </p>
              <p>
                <strong>Organisasi:</strong> {stakeHolder.organization || "-"}
              </p>
              <p>
                <strong>Jabatan:</strong> {stakeHolder.position || "-"}
              </p>
              <p>
                <strong>Kategori:</strong> {stakeHolder.category || "-"}
              </p>
              <p>
                <strong>Power:</strong> {stakeHolder.power ?? "-"}
              </p>
              <p>
                <strong>Interest:</strong> {stakeHolder.interest ?? "-"}
              </p>
              <p>
                <strong>Lokasi:</strong> {stakeHolder.location || "-"}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push(`/stakeholders/${id}/edit`)}
              >
                Edit Data
              </Button>
            </div>
          ) : (
            <p>Stakholder tidak ditemukan.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Stakeholderdetail;
