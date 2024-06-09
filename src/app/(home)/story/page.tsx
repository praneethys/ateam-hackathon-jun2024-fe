"use client";

import Card from "antd/lib/card/Card";
import { useEffect, useState } from "react";
import { Body } from "@/components/body";
import { Header } from "@/components/header";

const Recipe = () => {
  const recipeId = "f6d46ae8-8c78-472b-9f88-c1713acb72c2";
  const [recipeText, setRecipeText] = useState<any | undefined>(undefined);
  const [image, setImage] = useState<any | undefined>(undefined);
  const [title, setTitle] = useState<any | undefined>(undefined);
  const [nutritionFacts, setNutritionFacts] = useState<string | undefined>(
    undefined
  );
  const [audioBuffer, setAudioBuffer] = useState<any>(null);
  const [audioContext, setAudioContext] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState<any>(false);

  useEffect(() => {
    const context = new window.AudioContext();
    setAudioContext(context);

    const getRecipeText = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/story/text/${recipeId}`
        );
        const data = await res.json();
        console.log(data);
        setRecipeText(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getNutritionFacts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/recipes/ingredient-facts`
        );
        const data = await res.json();
        console.log(data);
        setNutritionFacts(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getImage = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/story/image/${recipeId}`
        );
        const data = await res.json();
        console.log(data);
        setImage(data.image_url);
      } catch (error) {
        console.log(error);
      }
    };

    const getTitle = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/story/title/${recipeId}`
        );
        const data = await res.json();
        console.log(data);
        setTitle(data.title);
      } catch (error) {
        console.log(error);
      }
    };

    const getRecipeAudio = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/story/audio/${recipeId}`
        );
        const arrayBuffer = await res.arrayBuffer(); // Fetch and convert to array buffer
        const buffer = await context.decodeAudioData(arrayBuffer);
        setAudioBuffer(buffer); // Store the decoded buffer for playback
      } catch (error) {
        console.log(error);
      }
    };

    getRecipeText();
    getRecipeAudio();
    getNutritionFacts();
    getImage();
    getTitle();

    return () => {
      context.close();
    };
  }, []);

  useEffect(() => {
    if (audioBuffer && audioContext && isPlaying) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      source.onended = () => setIsPlaying(false); // Update state when audio ends

      // Cleanup to stop the audio when component unmounts or state changes
      return () => {
        source.disconnect();
        source.stop();
      };
    }
  }, [audioBuffer, audioContext, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (!recipeText || !audioBuffer || !nutritionFacts || !image || !title) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="align-center">
      <Header>
        <div style={{ margin: "auto", fontSize: "32px", width: "fit-content" }}>
          {title}
        </div>
        <div
          style={{
            display: "flex",
            height: "280px",
            borderRadius: "22px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              width: "280px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${image})`,
              borderRadius: "22px 0px 0px 22px",
            }}
          />
          <div
            style={{
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              width: "100%",
              padding: "12px 22px",
            }}
          >
            <div style={{ fontWeight: 600 }}>NUTRITIONAL FACT:</div>
            {nutritionFacts}
          </div>
        </div>
      </Header>
      <Body>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600 }}>
            {recipeText.title}
          </div>
          <div
            style={{
              borderRadius: "12px",
              backgroundColor: "#199DC7",
              padding: "8px 12px",
              color: "white",
              cursor: "pointer",
              fontWeight: 400,
            }}
            onClick={togglePlay}
          >
            {isPlaying ? "STOP" : "PLAY"}
          </div>
        </div>
        <p style={{ marginTop: "12px" }}>{recipeText.story}</p>
      </Body>
    </Card>
  );
};

export default Recipe;
