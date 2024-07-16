import { useRef, useState } from "react";
import "./sticker.css";
import { motion } from "framer-motion";

type StickersProps = {
  title: string | null;
};

export const Stickers = ({ title }: StickersProps) => {
  return (
    <div className="container">
      <h1 className="stickerTitle">
        {title}
        <span className="dot">.</span>
      </h1>
      <StickerContainer />
    </div>
  );
};

const StickerContainer = () => {
  const controlRef = useRef<HTMLElement>(null);
  return (
    <div>
      <Sticker
        controlRef={controlRef}
        src="https://cdn.pixabay.com/photo/2024/04/30/15/23/ai-generated-8730411_640.png"
        alt="sticker"
        rotate="18deg"
        top="20%"
        left="65%"
      />
    </div>
  );
};

type StickerProps = {
  controlRef: React.RefObject<HTMLElement>;
  src: string;
  alt: string;
  top: number | string;
  left: number | string;
  rotate: number | string;
};
const Sticker = ({ controlRef, src, alt, top, left, rotate }: StickerProps) => {
  const [isZIndex, setIsZIndex] = useState<number>(0);

  function updateZIndex() {
    const sic = document.querySelector("stickerImage");
    let maxZIndex = -Infinity;

    sic.forEach((el) => {
      let isZIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index"),
      );
      if (!isNaN(isZIndex) && isZIndex > maxZIndex) {
        maxZIndex = isZIndex;
      }
    });
    setIsZIndex(maxZIndex + 1);
  }
  return (
    <motion.img
      src={src}
      alt={alt}
      className="stickerImage"
      drag
      dragConstraints={controlRef}
      style={{ top, left, rotate }}
    />
  );
};
