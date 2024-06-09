"use client";

import { Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import BackgroundSvg from "@/assets/background.svg";
import { Flex } from "antd/lib";
import { Content, Footer } from "antd/es/layout/layout";
import Card from "antd/lib/card/Card";

const RecipeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{ background: `url(${BackgroundSvg.src})` }}
        className="h-16"
      >
        <Flex align="center" justify="flex-end">
          <h3 className="font-bold text-3xl">Bus arrives in 14 min</h3>
        </Flex>
      </Header>
      <Content>
        <Card
          style={{
            height: `calc(100vh - 128px)`,
            overflow: "auto",
            background: `url(${BackgroundSvg.src})`,
          }}
        >
          {children}
        </Card>
      </Content>
      <Footer
        style={{ background: `url(${BackgroundSvg.src})` }}
        className="h-16"
      ></Footer>
    </Layout>
  );
};

export default RecipeLayout;
