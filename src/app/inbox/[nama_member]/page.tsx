"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DetailPage = () => {
  const { nama_member } = useParams<{ nama_member: string }>();
  const [memberData, setMemberData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("members");
    if (stored) {
      const allData = JSON.parse(stored);
      const findMember = allData.find(
        (p: any) => p.Nama_Member === decodeURIComponent(nama_member)
      );
      setMemberData(findMember);
    }
  }, [nama_member]);

  if (!memberData) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{memberData.Nama_Member}</h1>

      {memberData.Loyalti.map((loyalti: any, idx: number) => (
        <Card key={idx} className="shadow-md">
          <CardHeader>
            <CardTitle>Loyalti {idx + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Info utama loyalti */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-semibold">Tanggal Awal:</span>{" "}
                {loyalti.Tanggal_awal || "-"}
              </div>
              <div>
                <span className="font-semibold">Tanggal Exp:</span>{" "}
                {loyalti.Tanggal_exp || "-"}
              </div>
              <div>
                <span className="font-semibold">Reward 1:</span>{" "}
                {loyalti.Reward_1 || "-"}
              </div>
              <div>
                <span className="font-semibold">Reward 2:</span>{" "}
                {loyalti.Reward_2 || "-"}
              </div>
            </div>

            {/* Data Pembelian */}
            <div>
              <h2 className="font-semibold mb-2">Pembelian</h2>
              {loyalti.Pembelian.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Menu</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loyalti.Pembelian.map((p: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell>{p.tanggal}</TableCell>
                        <TableCell>{p.menu}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500 text-sm">Belum ada pembelian</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DetailPage;
