export function arrayBufferToHex(buffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

export function hexToArrayBuffer(hex) {
  console.log(typeof hex);
  if (typeof hex !== "string") {
    throw new TypeError("Expected input to be a hex string");
  }
  const typedArray = new Uint8Array(
    hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)),
  );
  return typedArray.buffer;
}

export async function hexToAesKey(hex) {
  const keyBuffer = hexToArrayBuffer(hex);
  const aesKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"],
  );
  return aesKey;
}

export async function encryptData(key, data) {
  const aesKey = await hexToAesKey(key);

  const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV (12 bytes)
  const encodedData = new Uint8Array(data);

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv, // Initialization vector
    },
    aesKey, // The AES-GCM key
    encodedData, // Data to encrypt
  );
  return { iv, encryptedData };
}

export async function decryptData(key, iv, encryptedData) {
  const aesKey = await hexToAesKey(key);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv, // The IV used during encryption
    },
    aesKey,
    encryptedData, // The encrypted data to decrypt
  );

  return decrypted; // array buffer
}
