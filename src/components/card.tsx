"use client";

import LeftCircleFilled from "@ant-design/icons/lib/icons/LeftCircleFilled";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import Card from "antd/lib/card/Card";
import { Row } from "antd/lib";
import { useRouter } from "next/navigation";

const CardComponent = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Card hoverable className="w-auto h-auto">
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
    </Card>
  );
};

export default CardComponent;
