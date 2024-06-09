"use client";

import { Button } from "antd";
import Card from "antd/lib/card/Card";
import Meta from "antd/lib/card/Meta";
import { useEffect, useState } from "react";
import { Image } from "antd";
import Flex from "antd/lib/flex";

type Recipe = {
  title: string;
  ingredients: string;
  instructions: string;
  image_url: string;
  recipe_uuid: string;
};

const Recipe = () => {
  const [recipeList, setRecipeList] = useState([]);
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
      }
    };

    getRecipeList();
  }, []);

  return (
    <Card className="align-center">
      <Flex align="center" justify="space-evenly">
        {recipeList.map((recipe: Recipe) => (
          <Card
            key={recipe.recipe_uuid}
            hoverable
            style={{ width: 240 }}
            cover={<Image alt="example" src={recipe.image_url} />}
          >
            <Meta title={recipe.title} />
          </Card>
        ))}
      </Flex>

      <Flex align="center" justify="space-evenly" className="mt-4">
        <Button type="primary" size="large">
          Generate Recipe
        </Button>
      </Flex>
    </Card>
  );
};

export default Recipe;
