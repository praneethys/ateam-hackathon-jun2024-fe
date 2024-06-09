"use client";

import CardComponent from "@/components/card";
import { Button, Carousel, Col, Spin, Row } from "antd/lib";
import Card from "antd/lib/card/Card";
import Image from "antd/lib/image";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { RecipeType } from "../page";
import LeftCircleFilled from "@ant-design/icons/lib/icons/LeftCircleFilled";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import { useRouter } from "next/navigation";
import { Body } from "@/components/body";

const RecipeDetails = ({ params }) => {
  const [recipe, setRecipe] = useState<RecipeType>({
    title: "",
    ingredients: [""],
    instructions: [""],
    image_url: [""],
    recipe_uuid: "",
  });

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getRecipe = async () => {
      const { recipe_uuid } = params;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/recipes/${recipe_uuid}`
        );
        const data = await res.json();
        console.log(data);
        setRecipe(data);
      } catch (error) {
        console.log(error);
      }
    };

    getRecipe();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

  const contentStyle: React.CSSProperties = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      {loading && <Spin fullscreen tip="Generating recipe..." />}

      {!loading && (
        <>
          <Card className="w-auto h-auto mx-auto text-center">
            <Row justify="space-between">
              <LeftCircleFilled
                className="absolute top-0 left-0 m-4 text-5xl"
                onClick={() => {
                  router.back();
                }}
              />
              <SettingOutlined className="absolute top-0 right-0 m-4 text-5xl" />
            </Row>
            <Title level={1}>{recipe.title}</Title>
            <Carousel arrows className="text-black">
              {recipe.image_url.map((image, index) => (
                <div key={index}></div>
              ))}
            </Carousel>

            <Row gutter={16}>
              {recipe.image_url.map((image, index) => (
                <Col span={6} key={index} className="gutter-row">
                  <Card
                    hoverable
                    cover={<Image src={image} alt="image" />}
                    loading={loading}
                  />
                </Col>
              ))}
            </Row>
          </Card>
          <Card>
            <Body>
              <Row justify="space-between">
                <Title level={3} className="text-center">
                  Recipe
                </Title>
                <Button
                  type="primary"
                  className="absolute top-0 right-0 m-2"
                  onClick={() => {
                    router.push(`/story`);
                  }}
                >
                  Start Story
                </Button>
              </Row>
              <Row>
                <Col span={12}>
                  <Title level={4}>Ingredients</Title>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </Col>
                <Col span={12}>
                  <Title level={4}>Instructions</Title>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </Col>
              </Row>
            </Body>
          </Card>
        </>
      )}
    </>
  );
};

export default RecipeDetails;
