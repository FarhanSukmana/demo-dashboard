'use client'

import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle,CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input} from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface stakeholder{
  id:number;
  name:string;
}

const Assign = () => {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string;

  const [stakeholders, setStakeholders] = useState<stakeholder[]>([])
  const [selectedStakeholder, setSelectedStakeholder] = useState<string>("");
  const [form, setForm] = useState({
    peran:"",
    keterlibatan:"",
  })
  const [loading, setLoading]=useState(false)

  useEffect(() =>{
    axios.get("http://localhost:8000/Stakeholder/")
    .then((res) => setStakeholders(res.data))
    .catch((err) => console.log("Error Fetching stakholders",err))
  },[])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault()
    if(!selectedStakeholder) return alert("PIlih Stakeholder terlebih dahulu")

      setLoading(true);
      try {
        await axios.post("http://localhost:8000/Participation/", {
          stakeholder_id: Number(selectedStakeholder),
          program_id: Number(projectId),
          peran: form.peran,
          keterlibatan: form.keterlibatan,
        });
        router.push('/project')
      } catch (error) {
        console.log('error submit',error)
      }finally{
        setLoading(false);
      }
  }

  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>Assign Stakeholder ke Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label>Pilih Stakeholder</Label>
              <Select onValueChange={(val) =>setSelectedStakeholder(val)}>
                <SelectTrigger>
                  <SelectValue placeholder='Pilih Stakeholder' />
                </SelectTrigger>
                <SelectContent>
                  {stakeholders.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Peran</Label>
              <Input 
              name = 'peran'
              value={form.peran}
              onChange={handleChange}
              />
            </div>
            <div>
              <Label>Keterlibatan</Label>
              <Textarea 
              name = "keterlibatan"
              value = {form.keterlibatan}
              onChange={handleChange}
              rows={3}
              />
            </div>
            <Button type='submit' disabled={loading}>
              {loading ? "Menyimpan" : "Simpan Assign"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Assign;