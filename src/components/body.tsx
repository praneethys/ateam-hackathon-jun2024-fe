"use client";

export const Body = ({ children }: { children: any }) => {
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
