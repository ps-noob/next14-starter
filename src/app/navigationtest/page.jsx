"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const NavigationTest = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log(pathName);
    console.log(searchParams.get("q"));
    const params = new URLSearchParams(searchParams);
    params.set("query", "hi");
    router.replace(`${pathName}?${params.toString()}`);
  }, []);

  const handleClick = () => {
    console.log("clicked");
    router.replace("/");
    // router.push("/");
    // router.refresh();
    // router.back()
    // router.forward()
  };
  return (
    <div>
      <Link href={"/"} prefetch={false}>
        Go Home
      </Link>
      <button onClick={handleClick}>Write and redirect</button>
    </div>
  );
};

export default NavigationTest;
