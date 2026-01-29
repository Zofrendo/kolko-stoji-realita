import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
          }}
        >
          <p
            style={{
              fontSize: 24,
              color: "#9ca3af",
              letterSpacing: "0.15em",
              marginBottom: 30,
              textTransform: "uppercase",
            }}
          >
            KOLKO STOJI REALITA
          </p>

          <h1
            style={{
              fontSize: 120,
              fontWeight: 800,
              color: "#111827",
              textAlign: "center",
              lineHeight: 1,
              marginBottom: 20,
              letterSpacing: "-0.02em",
            }}
          >
            1 500+
          </h1>

          <p
            style={{
              fontSize: 36,
              color: "#6b7280",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            EUR / mesiac
          </p>

          <p
            style={{
              fontSize: 28,
              color: "#374151",
              textAlign: "center",
              maxWidth: 700,
              lineHeight: 1.4,
            }}
          >
            Real cost of living in Slovakia
          </p>

          <div
            style={{
              display: "flex",
              marginTop: 50,
              padding: "20px 50px",
              backgroundColor: "#111827",
              borderRadius: 20,
            }}
          >
            <p
              style={{
                fontSize: 26,
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              Vypocitaj si svoju realitu
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
