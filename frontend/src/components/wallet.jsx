"use client";

import { useEffect, useState, useContext } from "react";
import { Button } from "./ui/button";

import { NearContext } from "@/wallets/near";

export function Wallet() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => {});
  const [label, setLabel] = useState("Loading...");

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => wallet.signIn);
      setLabel("Login");
    }
  }, [signedAccountId, wallet]);

  return <Button onClick={action}>{label}</Button>;
}
