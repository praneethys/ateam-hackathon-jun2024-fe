"use client";

export const Body = ({ children }: { children: any }) => {
  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        padding: "16px 32px",
      }}
    >
      {children}
    </div>
  );
};
