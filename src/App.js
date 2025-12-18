import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";

export default function App() {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  useEffect(() => {
    setStep(1);
    setShowConfetti(false);
    setAnswer("");
  }, []);

  const audioRef = useRef(null);

  const correctAnswer = "22/11/2025";
  const photos = ["/photos/1.jpeg", "/photos/2.jpeg", "/photos/3.jpeg"];

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.background = "black";
  }, []);


  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        setPhotoIndex((prev) => (prev + 1) % photos.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <>
      {/* BACKGROUND */}
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background: "linear-gradient(135deg, #ec4899, #a855f7, #6366f1)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* FONT */}
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <audio ref={audioRef} loop src="/what-once-was.mp3" />

      {/* APP SHELL */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>
          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={cardStyle}
              >
                <h1 style={titleStyle}>A Little Surprise ✨</h1>
                <p style={mutedText}>Answer this to unlock something special</p>
                <p style={{ color: "#f9a8d4", fontWeight: 500 }}>
                  When did we start dating?
                </p>

                <input
                  style={inputStyle}
                  placeholder="DD / MM / YYYY"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />

                <button
                  style={buttonStyle}
                  onClick={() => {
                    if (answer === correctAnswer) {
                      setShowConfetti(true);
                      setStep(2);
                    } else alert("Almost… try again 💭");
                  }}
                >
                  Unlock 💖
                </button>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div style={{ textAlign: "center" }}>
                {showConfetti && <ConfettiExplosion />}
                <h1 style={{ ...titleStyle, fontSize: 42 }}>
                  Happy Birthday Venkat 🎂
                </h1>
                <p style={mutedText}>Make a wish ✨</p>
                <button
                  style={{ ...buttonStyle, marginTop: 20 }}
                  onClick={() => setStep(3)}
                >
                  Tap to blow candles 🕯️
                </button>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div style={cardStyle}>
                <div style={imageFrame}>
                  <img
                    src={photos[photoIndex]}
                    style={{
                      width: "100%",
                      height: 260,
                      objectFit: "cover",
                      borderRadius: 18,
                    }}
                  />
                </div>

                <p style={bodyText}>
                  Happy Birthday Baby!!!! ❤️ I&apos;m grateful for your colorful
                  presence in this life of mine. Couldn&apos;t have asked for a
                  better girlfriend. I hope you get what you deserve and more
                  this year. Happy 23 babe!!!
                </p>

                <p style={{ textAlign: "right", fontWeight: 600 }}>— H❤️</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

/* ---------- STYLES ---------- */

const cardStyle = {
  background: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(24px)",
  borderRadius: 32,
  padding: "32px 28px",
  color: "white",
  boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  textAlign: "center",
};

const titleStyle = {
  fontSize: 30,
  fontWeight: 800,
};

const mutedText = {
  color: "rgba(255,255,255,0.75)",
};

const bodyText = {
  color: "rgba(255,255,255,0.9)",
  lineHeight: 1.6,
};

const inputStyle = {
  padding: "14px 16px",
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.25)",
  background: "rgba(0,0,0,0.4)",
  color: "white",
  textAlign: "center",
  fontSize: 16,
  outline: "none",
};

const buttonStyle = {
  padding: "14px",
  borderRadius: 20,
  border: "none",
  fontSize: 18,
  fontWeight: 700,
  color: "white",
  cursor: "pointer",
  background: "linear-gradient(90deg, #ec4899, #a855f7, #6366f1)",
};

const imageFrame = {
  padding: 2,
  borderRadius: 20,
  background: "linear-gradient(90deg, #ec4899, #a855f7, #6366f1)",
};
