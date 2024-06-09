"use client";

import { Button } from "antd";
import Card from "antd/lib/card/Card";
import Meta from "antd/lib/card/Meta";
import { useEffect, useState } from "react";
import { Image } from "antd";
import Flex from "antd/lib/flex";
import CardComponent from "@/components/card";
import { Col, Row } from "antd/lib";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";

export type RecipeType = {
  title: string;
  ingredients: [string];
  instructions: [string];
  image_url: [string];
  recipe_uuid: string;
};

const Recipe = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType>({
    title: "",
    ingredients: [""],
    instructions: [""],
    image_url: [""],
    recipe_uuid: "",
  });

  const router = useRouter();

  useEffect(() => {
    const getRecipeList = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/recipes`
        );
        const data = await res.json();
        console.log(data);
        setRecipeList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRecipeList();
  }, []);

  useEffect(() => {
    if (selectedRecipe) {
      router.push(`/recipe/${selectedRecipe.recipe_uuid}`);
    }
  }, [router, selectedRecipe]);

  return (
    <CardComponent>
      <Row justify="space-evenly">
        <Title level={1}>Time for Breakfast!</Title>
        <Row gutter={16}>
          {recipeList.map((recipe: RecipeType, index) => (
            <Col span={8} key={index} className="gutter-row">
              <Card
                hoverable
                cover={<Image alt="example" src={recipe.image_url[0]} />}
                loading={loading}
                onClick={() => setSelectedRecipe(recipe)}
              >
                <Meta title={recipe.title} />
              </Card>
            </Col>
          ))}
        </Row>

        <Flex align="center" justify="space-evenly" className="mt-4">
          <Button type="primary" size="large">
            Generate Recipe
          </Button>
        </Flex>
      </Row>
    </CardComponent>
  );
};

export default Recipe;
