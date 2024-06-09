"use client";

import LeftCircleFilled from "@ant-design/icons/lib/icons/LeftCircleFilled";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import { Row } from "antd/lib";
import { useRouter } from "next/navigation";

export const Header = ({ children }: { children: any }) => {
  const router = useRouter();
  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        padding: "16px 32px",
        marginBottom: "8px",
      }}
    >
      <Row>
        <Row justify="space-between">
          <LeftCircleFilled
            className="absolute top-0 left-0 m-4 text-5xl"
            onClick={() => {
              router.back();
            }}
          />
          <SettingOutlined className="absolute top-0 right-0 m-4 text-5xl" />
        </Row>
        <Row className="m-8">{children}</Row>
      </Row>
    </div>
  );
};
