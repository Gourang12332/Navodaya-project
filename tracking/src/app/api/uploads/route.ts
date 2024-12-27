'use server'
import { Storage } from "@google-cloud/storage";

export const  Upload = async (form : FormData) => {
  const file = form.get('file') as File;
  if(!file) throw Error ("file not uploaded")

  const buffer = await file.arrayBuffer()
  const storage = new Storage({keyFilename : "C:/Users/goura/Downloads/mydocketuploads-e4e7c5a853ae.json"});

  await storage.bucket('my-docket-uploads').file(file.name).save(Buffer.from(buffer))
}

export async function POST(req : Request) {
  try {
    const form = await req.formData();
    await Upload(form);
    return Response.json({
      message : "file uploaded successfully"
    },{
      status : 200
    })
  } catch (error) {
    return Response.json({
      message : `error uploading file ${error}`
    } , {
      status : 500
    })
  }
}