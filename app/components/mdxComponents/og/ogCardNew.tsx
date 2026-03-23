const OGImageContent = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        aspectRatio: "1200 / 630",
        padding: "32px 40px",
        background: "#0f1117",
        borderRadius: "12px",
        position: "relative",
        overflow: "hidden",
        border: "1px solid #27272a",
        boxShadow: "0 0 0 1px #38bdf820, 0 8px 32px #0008",
      }}
    >
      {/* Sky accent bar — top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #38bdf8, #818cf8)",
        }}
      />

      {/* Top: site name */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#38bdf8",
          }}
        />
        <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 500 }}>
          codeByYun
        </span>
      </div>

      {/* Center: title */}
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <h1
          style={{
            fontSize: "36px",
            color: "#f1f5f9",
            fontWeight: 700,
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          CSS Flex 기본 알기
        </h1>
      </div>

      {/* Bottom: author + date */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "14px", color: "#38bdf8", fontWeight: 600 }}>
          YUN
        </span>
        <span style={{ fontSize: "13px", color: "#475569" }}>2025.08.12</span>
      </div>
    </div>
  );
};

export default OGImageContent;
