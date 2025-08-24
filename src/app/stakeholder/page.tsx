"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Stakeholder {
  id: number;
  name: string;
  organization?: string;
  category?: string;
  power?: number;
  interest?: number;
  location?: string;
}

const page = () => {
  const [data, setData] = useState<Stakeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8000/Stakeholder/")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log("Error Fetching stakeholder", err))
      .finally(() => setLoading(false));
      console.log(data)
  }, []);

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Daftar Stakeholders</CardTitle>
          <Link href="/stakeholders/new">
            <Button variant="default">Tambah Stakeholders</Button>
          </Link>
        </CardHeader>
        {/* Content */}
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Organisasi</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Power</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Akse</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((stakeholder) => (
                  <TableRow key={stakeholder.id}>
                    <TableCell>{stakeholder.name}</TableCell>
                    <TableCell>{stakeholder.organization || "-"}</TableCell>
                    <TableCell>{stakeholder.category || "-"}</TableCell>
                    <TableCell>{stakeholder.power||"-"}</TableCell>
                    <TableCell>{stakeholder.interest||"-"}</TableCell>
                    <TableCell>{stakeholder.location||"-"}</TableCell>
                    <TableCell>
                      <Link href={`stakeholder/${stakeholder.id}`}>
                      <Button size='sm' variant='outline' className="cursor-pointer" >Detail</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
