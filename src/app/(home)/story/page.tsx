"use client";

import { Divider } from "antd/lib";
import Card from "antd/lib/card/Card";
import { useEffect, useState } from "react";

const Header = ({ children }: { children: any }) => {
  return (
    <div
      style={{
        width: "80%",
        backgroundColor: "#D9D9D9",
        margin: "auto",
        padding: "16px 32px",
        marginBottom: "8px",
      }}
    >
      {children}
    </div>
  );
};

const Body = ({ children }: { children: any }) => {
  return (
    <div
      style={{
        width: "80%",
        backgroundColor: "#D9D9D9",
        margin: "auto",
        padding: "16px 32px",
      }}
    >
      {children}
    </div>
  );
};

const Recipe = () => {
  const recipeId = "371bd5dd-e812-47b0-8334-2f4ef437755c";
  const [recipeText, setRecipeText] = useState<any | undefined>(undefined);
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

  if (!recipeText || !audioBuffer || !nutritionFacts) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="align-center">
      <Header>
        <div style={{ margin: "auto", fontSize: "32px", width: "fit-content" }}>
          TODO
        </div>
        <div
          style={{
            display: "flex",
            height: "280px",
            borderRadius: "22px",
            marginTop: "16px",
          }}
        >
          <div style={{ width: "280px" }}>img</div>
          <div
            style={{
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              width: "100%",
            }}
          >
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
