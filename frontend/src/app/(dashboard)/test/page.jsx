"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAES } from "@/hooks/useAES";
import {
  arrayBufferToBlobUrl,
  encryptAndUploadFile,
  fetchEncryptedFile,
} from "@/lib/ipfs";
import { useState } from "react";

export default function Test() {
  const { key, encrypt, decrypt } = useAES("tier1");
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cid, setCid] = useState(null);
  const [iv, setIv] = useState(null);

  return (
    <div className="max-w-2xl mx-auto mt-12 space-y-4">
      <Label htmlFor="picture">Picture</Label>
      <Input
        id="picture"
        type="file"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
      />
      {cid && <p>CID: {cid}</p>}
      {iv && <p>IV: {iv}</p>}
      <Button
        onClick={async () => {
          const { iv, cid } = await encryptAndUploadFile(key, selectedImage);
          setCid(cid);
          setIv(iv);
        }}
        disabled={!selectedImage}
      >
        Upload + Encrypt
      </Button>
      <br />
      {preview && <img src={preview} alt="a preview of image" />}
      <Button
        onClick={async () => {
          const { iv, encryptedData } = await fetchEncryptedFile(cid);
          const arrayBuffer = await decrypt(iv, encryptedData);
          setPreview(arrayBufferToBlobUrl(arrayBuffer));
        }}
        disabled={!(iv && cid)}
      >
        Download + Decrypt
      </Button>
    </div>
  );
}
