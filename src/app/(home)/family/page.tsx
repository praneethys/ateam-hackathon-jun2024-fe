"use client";

import { Image } from "antd";
import DashboardSvg from "@/assets/onboarding.png";

const Family = () => {
  return (
    <Image src={DashboardSvg.src} alt="dashboard" width={1366} height={1024} />
  );
};

export default Family;
