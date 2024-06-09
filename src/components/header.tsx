"use client";

export const Header = ({ children }: { children: any }) => {
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
