import { ImageResponse } from "next/og";

interface OGImageContentProps {
  title: string;
  author: string;
  date?: string;
  avatarUrl?: string;
}

const OGImageContent = ({
  title,
  author,
  date,
  avatarUrl,
}: OGImageContentProps) => {
  return (
    <div
      style={{
        display: "flex", // 필수
        flexDirection: "row",
        gap: "32px",
        padding: "16px",
        borderRadius: "12px",
        border: "1px solid #ddd",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(135deg, #c3f0ff 0%, #ffffff 50%, #d6e6ff 100%)",
      }}
    >
      {/* Left: Avatar */}
      <div
        style={{
          display: "flex",
          width: "280px",
          height: "280px",
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <img
          src={avatarUrl}
          alt="Avatar"
          width={280}
          height={280}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            alignContent: "space-around",
          }}
        />
      </div>

      {/* Right: Text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            color: "#1f2937",
            fontWeight: 600,
            margin: 0,
          }}
        >
          {title}
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <span
            style={{
              fontSize: "32px",
              color: "#111827",
              backgroundColor: "#bdc6ff",
              padding: "4px 12px",
              borderRadius: "8px",
            }}
          >
            by {author}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OGImageContent;
