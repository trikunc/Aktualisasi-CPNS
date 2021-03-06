import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import prisma from '../../../prisma/lib'
import { BootstrapInput } from '../../../components/Input'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useRouter } from 'next/router'

export const getServerSideProps = async ({ req, res }) => {
 const tes = await prisma.Asset.findMany()
 const Kejuruan = await prisma.Kejuruan.findMany()
 return {
  props: {
   data: JSON.parse(JSON.stringify(tes)),
   kejuruan: JSON.parse(JSON.stringify(Kejuruan)),
  },
 }
}

const AddAsset = ({ kejuruan }) => {
 const [name, setName] = useState("");
 const [brand, setBrand] = useState("");
 const [type, setType] = useState("");
 const [dimension, setDimension] = useState("");
 const [material, setMaterial] = useState("");
 const [sum, setSum] = useState(0);
 const [year, setYear] = useState(2022);
 const [price, setPrice] = useState(0);
 const [from, setFrom] = useState("");
 const [condition, setCondition] = useState(true);
 const [goodCondition, setGoodCondition] = useState(0);
 const [kejuruanId, setKejuruanId] = useState(null);
 const [note, setNote] = useState("");

 const router = useRouter()

 const submitData = async (e) => {
  e.preventDefault();
  try {
   const body = {
    name,
    brand,
    type,
    dimension,
    material,
    sum: parseInt(sum),
    year,
    price: parseInt(price),
    from,
    condition,
    goodCondition: parseInt(goodCondition),
    kejuruanId,
    note
   };
   await fetch('/api/asset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
   });
   await router.push('/admin/asset/Pengelasan');
  } catch (error) {
   console.error(error);
  }
 };

 return (
  <Layout>
   <div className="flex flex-col relative rounded shadow p-5 bg-white">
    <h2 className="text-3xl font-bold ">
     Tambah Aset BLKPP DIY
    </h2>

    <div className="flex flex-wrap flex-col md:flex-row w-full mt-5">
     <div className="md:w-2/4 p-4">
      <div className="mt-4">
       <InputLabel className="my-2 text-black" htmlFor="input_user">
        Nama Alat
       </InputLabel>
       <TextField
        id="input_name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-white"
       // placeholder="name"
       />
      </div>

      <div className="mt-4">
       <InputLabel className="my-2 text-black" htmlFor="input_user">
        Merek Alat
       </InputLabel>
       <TextField
        id="input_brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="w-full bg-white"
       // placeholder="name"
       />
      </div>

      <div className="mt-4">
       <InputLabel className="my-2 text-black" htmlFor="input_user">
        Tipe Alat
       </InputLabel>
       <TextField
        id="input_brand"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full bg-white"
       // placeholder="name"
       />
      </div>

      <div className="mt-4">
       <InputLabel className="my-2 text-black" htmlFor="input_user">
        Dimensi Alat
       </InputLabel>
       <TextField
        id="input_brand"
        value={dimension}
        onChange={(e) => setDimension(e.target.value)}
        className="w-full bg-white"
       // placeholder="name"
       />
      </div>

      <div className="mt-4">
       <InputLabel className="my-2 text-black" htmlFor="input_user">
        Bahan
       </InputLabel>
       <TextField
        id="input_brand"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        className="w-full bg-white"
       // placeholder="name"
       />
      </div>

      <div className="mt-4">
       <InputLabel className="my-2 text-black" htmlFor="input_user">
        Jumlah
       </InputLabel>
       <TextField
        id="input_brand"
        value={sum}
        onChange={(e) => setSum(e.target.value)}
        className="w-full bg-white"
        type="number"
       // placeholder="name"
       />
      </div>

      <div className="mt-4">
       <InputLabel className="my-2 text-black" htmlFor="input_user">
        Tahun
       </InputLabel>
       <TextField
        id="input_brand"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-full bg-white"
        type="number"
       // placeholder="name"
       />
      </div>

     </div>
     <div className="md:w-2/4 p-4">
      <div className="mt-4">
       <InputLabel className="my-2 text-black" htmlFor="input_user">
        Harga
       </InputLabel>
       <TextField
        id="input_brand"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full bg-white"
        type="number"
       // placeholder="name"
       />
      </div>


      <div className="mt-4">
       <InputLabel className="my-2 text-black" htmlFor="input_user">
        Kondisi Baik
       </InputLabel>
       <TextField
        id="input_brand"
        value={goodCondition}
        onChange={(e) => setGoodCondition(e.target.value)}
        className="w-full bg-white"
        type="number"
       // placeholder="name"
       />
      </div>

      <div className="mt-4">
       <InputLabel className="my-2 text-black" htmlFor="input_user">
        Kondisi Rusak
       </InputLabel>
       <TextField
        id="input_brand"
        value={sum - goodCondition}
        disabled
        className="w-full bg-white"
       // placeholder="name"
       />
      </div>

      <div className="mt-4">
       <InputLabel
        className="my-2 text-black"
        id="demo-simple-select-standard-label"
       >
        Asal Usul
       </InputLabel>
       <FormControl
        sx={{ minWidth: 120, minHeight: 33, boxSizing: 'inherit' }}
       >
        <Select
         labelId="demo-simple-select-standard-label"
         id="demo-simple-select-standard"
         value={from}
         onChange={(e) => setFrom(e.target.value)}
         input={<BootstrapInput />}
        >
         {asalUsul.map((item, index) => {
          return <MenuItem key={`gender-item-${index}`} value={item.name}>{item.name}</MenuItem>
         })}
        </Select>
       </FormControl>
      </div>



      <div className="mt-4">
       <InputLabel
        className="my-2 text-black"
        id="demo-simple-select-standard-label"
       >
        Kejuruan
       </InputLabel>
       <FormControl
        sx={{ minWidth: 120, minHeight: 33, boxSizing: 'inherit' }}
       >
        <Select
         labelId="demo-simple-select-standard-label"
         id="demo-simple-select-standard"
         value={kejuruanId}
         onChange={(e) => setKejuruanId(e.target.value)}
         input={<BootstrapInput />}
        >
         {kejuruan.map((item, index) => {
          return <MenuItem key={`gender-item-${index}`} value={item.id}>{item.name}</MenuItem>
         })}
        </Select>
       </FormControl>
      </div>

      <div className="mt-4">
       <InputLabel className="my-2 text-black" htmlFor="textarea_address">
        Keterangan
       </InputLabel>
       <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="rounded-md shadow w-full p-2"
        rows="5"
       ></textarea>
      </div>

      <div className="mt-4">
       <div className="flex flex-row">
        <div>
         <button onClick={submitData} className={`flex items-center justify-center rounded w-36 bg-green-500 text-white text-sm mx-3 mb-5 px-3 py-1`}

         >
          Simpan Data
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>


   </div>
  </Layout>
 )
}

export default AddAsset

const asalUsul = [
 { name: 'APBN' },
 { name: 'APBD' },
 { name: 'Hibah' },
]