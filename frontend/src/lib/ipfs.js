"use client";

import { pinata } from "@/utils/config";
import { encryptData, decryptData } from "./crypto";

export function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
  });
}

export function arrayBufferToBlobUrl(arrayBuffer, mimeType = "image/jpeg") {
  const blob = new Blob([arrayBuffer], { type: mimeType }); // Create a Blob from ArrayBuffer
  const url = URL.createObjectURL(blob); // Create a URL for the Blob
  return url;
}

export async function uploadFile(file) {
  const data = new FormData();
  data.setFile("file", file);

  const uploadRequest = await fetch("/api/files", {
    method: "POST",
    body: data,
  });
  const cid = await uploadRequest.json();
  return cid;
}

export async function encryptAndUploadFile(key, file) {
  const fileArrayBuffer = await readFileAsArrayBuffer(file);
  const { iv, encryptedData } = await encryptData(key, fileArrayBuffer);
  const encryptedBlob = new Blob([iv, encryptedData], {
    type: "application/octet-stream",
  });

  const data = new FormData();
  data.append("file", encryptedBlob);

  const uploadRequest = await fetch("/api/files", {
    method: "POST",
    body: data,
  });
  const cid = await uploadRequest.json();
  return { iv, cid };
}

export async function fetchFile(cid) {
  const file = await pinata.gateways.get(cid);
  return file;
}

export async function fetchEncryptedFile(cid) {
  // Step 1: Fetch the encrypted file from IPFS
  const request = await pinata.gateways.get(cid);

  // Step 2: Convert the Blob to an ArrayBuffer
  const arrayBuffer = await request.data.arrayBuffer();

  // Step 3: Extract IV and Encrypted Data from the ArrayBuffer
  const uint8Array = new Uint8Array(arrayBuffer);
  const iv = uint8Array.slice(0, 12); // First 12 bytes are the IV
  const encryptedData = uint8Array.slice(12).buffer; // The rest is the encrypted file data

  return { iv, encryptedData };
}
