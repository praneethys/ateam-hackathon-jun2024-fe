"use client";

import { Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import BackgroundSvg from "@/assets/background.svg";
import Typography from "antd/lib/typography";
import { Flex } from "antd/lib";

const RecipeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: `url(${BackgroundSvg.src})` }}>
        <Typography.Title level={3}>
          <Flex align="center" justify="flex-end">
            Bus arrives in 14 min
          </Flex>
        </Typography.Title>
      </Header>
      {children}
    </Layout>
  );
};

export default RecipeLayout;
