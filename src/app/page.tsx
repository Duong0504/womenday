"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import AnimatedText from "./components/AnimatedText";

const wishes = [
  {
    icon: "🌸",
    title: "Sức Khỏe & Sắc Đẹp",
    text: "Chúc bạn luôn tràn đầy sức khỏe, rạng ngời sắc đẹp và mãi mãi giữ được nụ cười tươi tắn khiến cả thế giới say mê.",
    className: "wish-card-1",
  },
  {
    icon: "💛",
    title: "Hạnh Phúc Viên Mãn",
    text: "Chúc bạn có một cuộc sống hạnh phúc, đầy ắp yêu thương, được bao quanh bởi những người luôn trân trọng và yêu quý bạn.",
    className: "wish-card-2",
  },
  {
    icon: "🦋",
    title: "Thành Công Rực Rỡ",
    text: "Chúc bạn thành công vượt bậc trong sự nghiệp, mọi ước mơ đều trở thành hiện thực, mọi nỗ lực đều được đền đáp xứng đáng.",
    className: "wish-card-3",
  },
  {
    icon: "✨",
    title: "Bình An Mỗi Ngày",
    text: "Chúc bạn luôn bình an trong tâm hồn, vượt qua mọi khó khăn với tinh thần kiên cường và trái tim rộng mở đón nhận mọi điều tốt lành.",
    className: "wish-card-4",
  },
  {
    icon: "🌺",
    title: "Tình Yêu Chân Thành",
    text: "Chúc bạn luôn được yêu thương, tôn trọng và nâng niu. Mong rằng trái tim bạn luôn ấm áp, được lấp đầy bởi những tình cảm chân thành.",
    className: "wish-card-5",
  },
  {
    icon: "💖",
    title: "Ước Mơ Thành Hiện Thực",
    text: "Chúc bạn có đủ dũng cảm theo đuổi những ước mơ, đủ mạnh mẽ để vượt qua thử thách, và đủ khôn ngoan để trân trọng những gì mình đang có.",
    className: "wish-card-6",
  },
];

const quotes = [
  "Người phụ nữ giống như trà túi — bạn không bao giờ biết cô ấy mạnh mẽ đến mức nào cho đến khi cô ấy rơi vào nước sôi.",
  "Phụ nữ là người gánh vác thế giới trên vai mình với một nụ cười kiên cường và trái tim bao la.",
  "Mỗi người phụ nữ là một bông hoa độc đáo — vừa mềm mại vừa kiên cường, vừa dịu dàng vừa mạnh mẽ.",
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Intersection observer for .reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Floating petal canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#f759ab", "#ff85c2", "#ffd666", "#ffadd2", "#ff99cc"];
    const createPetal = () => ({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 1.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 3,
      opacity: Math.random() * 0.6 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    const petals = Array.from({ length: 30 }, () => {
      const p = createPetal();
      p.y = Math.random() * canvas.height;
      return p;
    });

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p, i) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height + 20) petals[i] = createPetal();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="particle-canvas" />

      {/* ====== HERO ====== */}
      <section className="hero">
        <div className="hero-bg-glow glow-1" />
        <div className="hero-bg-glow glow-2" />
        <div className="hero-bg-glow glow-3" />

        <div className="hero-content">
          {/* Badge — keep as plain text, CSS handles fade */}
          <div className="hero-date-badge">
            <span className="dot" />
            Ngày Phụ Nữ Việt Nam
            <span className="dot" />
          </div>

          {/* Title — original CSS gradient + fadeInUp animation, DO NOT wrap in AnimatedText */}
          <h1 className="hero-title">Chúc Mừng 20/10</h1>

          {/* Subtitle — original CSS fadeInUp, DO NOT wrap */}
          <p className="hero-subtitle">
            Tri ân những người phụ nữ tuyệt vời nhất thế giới
          </p>

          <div className="hero-image-wrapper">
            <div className="hero-image-frame">
              <Image
                src="/hero.png"
                alt="Chúc mừng ngày Phụ Nữ Việt Nam 20/10"
                width={320}
                height={380}
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>

          <br />
          <button
            className="hero-cta"
            onClick={() => document.getElementById("wishes")?.scrollIntoView({ behavior: "smooth" })}
            id="btn-explore"
          >
            🌸 Gửi Yêu Thương
          </button>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ====== WISHES SECTION ====== */}
      <section className="wishes-section" id="wishes">
        <div className="section-header reveal">
          <span className="section-tag">💝 Những Lời Chúc</span>

          <h2 className="section-title">
            <AnimatedText
              text="Từ Trái Tim Gửi Đến Bạn"
              animation="wave"
              stagger={90}
              delay={100}
              style={{ display: "block" }}
            />
          </h2>

          <AnimatedText
            tag="p"
            text="Nhân ngày 20 tháng 10, xin gửi đến tất cả những người phụ nữ tuyệt vời những lời chúc tốt đẹp và yêu thương nhất."
            animation="fadeUp"
            stagger={55}
            delay={300}
            style={{ color: "#6b4c7a", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}
          />
        </div>

        <div className="wishes-grid">
          {wishes.map((wish, i) => (
            <div
              key={i}
              className={`wish-card ${wish.className} reveal reveal-delay-${i + 1}`}
            >
              <span className="wish-icon">{wish.icon}</span>

              <AnimatedText
                tag="h3"
                text={wish.title}
                animation="bounce"
                stagger={70}
                delay={150}
                className="wish-card-title"
              />

              <AnimatedText
                tag="p"
                text={wish.text}
                animation="fadeUp"
                stagger={35}
                delay={300}
                className="wish-card-text"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ====== QUOTE SECTION ====== */}
      <section className="quote-section">
        <div className="hero-bg-glow glow-1" />
        <div className="hero-bg-glow glow-2" />

        {quotes.map((quote, i) => (
          <div key={i} style={{ marginBottom: i < quotes.length - 1 ? "5rem" : "0" }}>
            <AnimatedText
              tag="blockquote"
              text={quote}
              animation="typewriter"
              stagger={60}
              delay={0}
              className="big-quote reveal"
            />
          </div>
        ))}
      </section>

      {/* ====== GALLERY SECTION ====== */}
      <section className="gallery-section">
        <div className="section-header reveal">
          <span className="section-tag">🌺 Vẻ Đẹp Phụ Nữ</span>
          <h2 className="section-title">
            <AnimatedText
              text="Sắc Hoa Rực Rỡ Như Người"
              animation="wave"
              stagger={85}
              delay={100}
              style={{ display: "block" }}
            />
          </h2>
        </div>

        <div className="flowers-showcase reveal">
          <Image
            src="/flowers.jpg"
            alt="Vườn hoa cẩm tú cầu rực rỡ ngày 20/10"
            width={900}
            height={420}
            style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }}
            priority
          />
          <div className="flowers-overlay" />
        </div>
      </section>

      {/* ====== SPECIAL MESSAGE ====== */}
      <section className="special-section" id="message">
        <div className="special-message reveal">
          <span className="heart-burst">💗</span>

          <AnimatedText
            tag="h2"
            text="Lời Nhắn Gửi Đặc Biệt"
            animation="bounce"
            stagger={80}
            delay={100}
            className="special-title"
          />

          <AnimatedText
            tag="p"
            text="Trên cuộc hành trình của cuộc đời, người phụ nữ là ngọn nến sáng trong đêm tối, là bến bờ bình yên trong giông bão, là sợi chỉ đỏ nối kết yêu thương giữa muôn người."
            animation="fadeUp"
            stagger={40}
            delay={250}
            className="special-text"
          />

          <AnimatedText
            tag="div"
            text='"Cảm ơn vì mọi sự hy sinh thầm lặng, mọi nụ cười che giấu nước mắt, mọi bước chân kiên định trên con đường bạn đã chọn. Hôm nay và mãi mãi — bạn xứng đáng được yêu thương và trân trọng."'
            animation="typewriter"
            stagger={45}
            delay={500}
            className="special-highlight"
          />

          <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {["🌸 20/10", "💐 Hạnh Phúc", "✨ Thành Công", "💛 Yêu Thương", "🦋 Bình An"].map((tag, i) => (
              <span
                key={i}
                style={{
                  background: "linear-gradient(135deg, rgba(247, 89, 171, 0.15), rgba(250, 173, 20, 0.15))",
                  border: "1px solid rgba(247, 89, 171, 0.25)",
                  color: "#6b4c7a",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "50px",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="footer">
        <span className="footer-hearts">🌸 💖 🌸 💖 🌸</span>
        <AnimatedText
          tag="p"
          text="Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10"
          animation="wave"
          stagger={60}
          delay={200}
          className="footer-text"
        />
        <AnimatedText
          tag="p"
          text="Gửi tặng những người phụ nữ tuyệt vời nhất thế giới 🌺"
          animation="fadeUp"
          stagger={40}
          delay={700}
          style={{ marginTop: "0.5rem", opacity: 0.6 }}
        />
      </footer>
    </>
  );
}
