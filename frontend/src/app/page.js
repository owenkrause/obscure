import Image from "next/image";

import NearLogo from "/public/near.svg";
import NextLogo from "/public/next.svg";
import styles from "./app.module.css";
import { Cards } from "@/components/cards";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}> </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src={NearLogo}
          alt="NEAR Logo"
          width={110 * 1.5}
          height={28 * 1.5}
          priority
        />
        <h3 className="ms-2 me-3 text-dark"> + </h3>
        <Image
          className={styles.logo}
          src={NextLogo}
          alt="Next.js Logo"
          width={300 * 0.58}
          height={61 * 0.58}
          priority
        />
      </div>

      <Button className="text-4xl p-10" asChild>
        <a href="/home">GO TO APP</a>
      </Button>

      <div className={styles.grid}>
        <Cards />
      </div>
    </main>
  );
}
