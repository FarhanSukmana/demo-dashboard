import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Card 1 - Informasi Akun */}
      <Card className="rounded-md p-4">
        <div className="mb-4">
          <h2 className="font-semibold ">Informasi Akun</h2>
        </div>
        <CardContent className="flex flex-col gap-4 p-0">
          <div>
            <label className="text-sm ">Nama Lengkap</label>
            <Input placeholder="Siti Rahma" />
          </div>
          <div>
            <label className="text-sm ">Email</label>
            <Input placeholder="siti.rahma@kemenkumham.go.id" />
          </div>
          <div>
            <label className="text-sm ">Sektor</label>
            <Input placeholder="Kantor Wilayah Kementerian Hukum dan HAM DKI Jakarta" />
          </div>
          <div className="flex justify-end">
            <Button className="bg-green-500 hover:bg-green-600">
              Simpan Perubahan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card 2 - Ubah Password */}
      <Card className="rounded-md p-4">
        <div className="mb-4">
          <h2 className="font-semibold">Ubah Password</h2>
        </div>
        <CardContent className="flex flex-col gap-4 p-0">
          <div>
            <label className="text-sm ">Password Lama</label>
            <Input type="password" placeholder="Masukkan password lama" />
          </div>
          <div>
            <label className="text-sm ">Password Baru</label>
            <Input
              type="password"
              placeholder="Masukkan password baru (minimal 6 karakter)"
            />
          </div>
          <div>
            <label className="text-sm ">
              Konfirmasi Password Baru
            </label>
            <Input type="password" placeholder="Konfirmasi password baru" />
          </div>
          <div className="flex justify-end">
            <Button className="bg-green-500 hover:bg-green-600">
              Ubah Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
