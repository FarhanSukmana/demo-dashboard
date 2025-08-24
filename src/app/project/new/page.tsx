'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const Newproject = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    activity : '',
    date:'',
    resource_used:'',
    output:'',
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e:React.FormEvent) =>{
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('http://localhost:8000/Program/',form);
      router.push('/project')
    } catch (error) {
      console.log('Error', error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>Tambah Project</CardTitle>
        </CardHeader>
        {/* Content */}
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label>Nama Program</Label>
              <Input
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              />
            </div>
            <div>
              <Label>Aktivitas</Label>
              <Textarea
              name='activity'
              value={form.activity}
              onChange={handleChange}
              rows={3}
              />
            </div>
            <div>
              <Label>Tanggal</Label>
              <Input
              type='date'
              name='date'
              value={form.date}
              onChange={handleChange}
              required
              />
            </div>
            <div>
              <Label>Sumber Daya yang Digunakan</Label>
              <Input
              name='resource_used'
              value={form.resource_used}
              onChange={handleChange}
              required
              />
            </div>
            <div>
              <Label>Output</Label>
              <Textarea
              name='output'
              value={form.output}
              onChange={handleChange}
              rows={3}
              required
              />
            </div>
            <Button type='submit' disabled={loading}>{loading ? "Menyimpan":"Simpan Program"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Newproject;