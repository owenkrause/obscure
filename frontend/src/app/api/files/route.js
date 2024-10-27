import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const uploadData = await pinata.upload.file(file);
    return NextResponse.json(uploadData.IpfsHash, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
