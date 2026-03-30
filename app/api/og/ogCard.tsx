interface OGImageContentProps {
  title: string;
  author: string;
  date?: string;
  avatarUrl?: string;
}

const OGImageContent = ({ title, author, date }: OGImageContentProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        background: "#0f1117",
        position: "relative",
      }}
    >
      {/* Sky accent bar — top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: "linear-gradient(90deg, #38bdf8, #818cf8)",
        }}
      />

      {/* Top: site name */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#38bdf8",
          }}
        />
        <span
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          jyundev
        </span>
      </div>

      {/* Center: title */}
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: title.length > 30 ? "56px" : "72px",
            color: "#f1f5f9",
            fontWeight: 700,
            lineHeight: 1.25,
            margin: 0,
            maxWidth: "900px",
          }}
        >
          {title}
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
        <span
          style={{
            fontSize: "28px",
            color: "#38bdf8",
            fontWeight: 600,
          }}
        >
          {author}
        </span>
        {date && (
          <span
            style={{
              fontSize: "24px",
              color: "#475569",
            }}
          >
            {date}
          </span>
        )}
      </div>
    </div>
  );
};

export default OGImageContent;
