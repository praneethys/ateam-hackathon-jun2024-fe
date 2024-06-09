"use client";

import Image from "next/image";
import DashboardSvg from "@/assets/onboarding.png";
import { useRouter } from "next/navigation";

const Family = () => {
  const router = useRouter();
  return (
    <Image
      src={DashboardSvg.src}
      alt="dashboard"
      fill={true}
      onClick={() => router.push("/recipe")}
    />
  );
};

export default Family;
