import {
  arrayBufferToHex,
  hexToArrayBuffer,
  encryptData,
  decryptData,
} from "@/lib/crypto";
import { useState, useEffect } from "react";

export function useAES(subscriptionTier) {
  const [key, setKey] = useState(null);
  const storageKey = `obscure-subtier-${subscriptionTier}`;

  useEffect(() => {
    function loadKeyFromStorage() {
      const storedKey = localStorage.getItem(storageKey);
      // If key is present in localStorage, parse and set state
      if (storedKey) {
        setKey(storedKey);
        return true;
      }
      return false;
    }

    async function generateAndStoreKey() {
      const key = await crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256, // 256-bit key for AES-GCM
        },
        true,
        ["encrypt", "decrypt"],
      );

      const exportedKey = arrayBufferToHex(
        await crypto.subtle.exportKey("raw", key),
      );

      // Save key in localStorage as hex string
      localStorage.setItem(storageKey, exportedKey);

      // Set the key in state
      setKey(exportedKey);
    }

    // Check if keys are already in localStorage, if not, generate a new pair
    if (!loadKeyFromStorage()) {
      generateAndStoreKey();
    }
  }, [subscriptionTier]);

  async function encrypt(data) {
    if (!key) {
      throw new Error("Encryption key is not available.");
    }
    return encryptData(key, data);
  }

  async function decrypt(iv, encryptedData) {
    if (!key) {
      throw new Error("Decryption key is not available.");
    }
    return decryptData(key, iv, encryptedData);
  }

  return { key, encrypt, decrypt };
}
