"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Detailproject = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/Program/${id}/detail`
        );
        setData(res.data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching project detail", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!data) return <p className="p-6">Data not found</p>;

  const { program, participations, feedbacks, complaints, engagements } = data;

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detail Program</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Nama:</strong> {program.name}
          </p>
          <p>
            <strong>Aktivitas:</strong> {program.activity}
          </p>
          <p>
            <strong>Tanggal:</strong> {program.date}
          </p>
          <p>
            <strong>Sumber Daya:</strong> {program.resource_used}
          </p>
          <p>
            <strong>Output:</strong> {program.output}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stakeholder Terlibat</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Keterlibatan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participations.map((p: any) => (
                <TableRow key={p.id}>
                  <TableCell>{p.stakeholder.name}</TableCell>
                  <TableCell>{p.peran}</TableCell>
                  <TableCell>{p.keterlibatan}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stakeholder</TableHead>
                <TableHead>Sentimen</TableHead>
                <TableHead>Isi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.map((f: any) => (
                <TableRow key={f.id}>
                  <TableCell>{f.stakeholder.name}</TableCell>
                  <TableCell>{f.sentiment}</TableCell>
                  <TableCell>{f.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keluhan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stakeholder</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Isi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((c: any) => (
                <TableRow key={c.id}>
                  <TableCell>{c.stakeholder.name}</TableCell>
                  <TableCell>{c.status}</TableCell>
                  <TableCell>{c.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stakeholder</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Catatan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {engagements.map((e: any) => (
                <TableRow key={e.id}>
                  <TableCell>{e.stakeholder.name}</TableCell>
                  <TableCell>{e.type}</TableCell>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>{e.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detailproject;