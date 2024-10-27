import { useState, useEffect } from "react";
import { x25519 } from "@noble/curves/ed25519"; // Import X25519 from noble-curves

export function useX25519() {
  const [keyPair, setKeyPair] = useState({ publicKey: null, privateKey: null });

  useEffect(() => {
    function loadKeypairFromStorage() {
      const storedPublicKey = localStorage.getItem("obscure-x25519PublicKey");
      const storedPrivateKey = localStorage.getItem("obscure-x25519PrivateKey");

      // If both keys are present in localStorage, parse them and set the state
      if (storedPublicKey && storedPrivateKey) {
        setKeyPair({
          publicKey: Uint8Array.from(Buffer.from(storedPublicKey, "hex")),
          privateKey: Uint8Array.from(Buffer.from(storedPrivateKey, "hex")),
        });
        return true;
      }
      return false;
    }

    async function generateAndStoreKeypair() {
      // Generate new X25519 key pair
      const privateKey = x25519.utils.randomPrivateKey(); // Generates a random private key
      const publicKey = x25519.getPublicKey(privateKey); // Derives public key from private key

      // Save keys in localStorage as hex strings
      localStorage.setItem(
        "obscure-x25519PublicKey",
        Buffer.from(publicKey).toString("hex"),
      );
      localStorage.setItem(
        "obscure-x25519PrivateKey",
        Buffer.from(privateKey).toString("hex"),
      );

      // Set the key pair in state
      setKeyPair({ publicKey, privateKey });
    }

    // Check if keys are already in localStorage, if not, generate a new pair
    if (!loadKeypairFromStorage()) {
      generateAndStoreKeypair();
    }
  }, []);

  return keyPair;
}
