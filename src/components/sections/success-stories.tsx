import { motion } from "framer-motion";
import { useState } from "react";

const SuccessStoriesSection = () => {
  const [positionIndex, setPositionIndex] = useState([0, 1, 2, 3, 4]);

  const handleNext = () => {
    setPositionIndex((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % 5
      );
      return updatedIndexes;
    });
  };

  const images = [image1, image2, image3, image4, image5];

  const positions = ["center", "left1", "left", "right1", "right"];

  const imgVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 2 },
    left: { x: "-50%", scale: 0.5, zIndex: 1 },
    right: { x: "50%", scale: 0.5, zIndex: 1 },
    right1: { x: "50%", scale: 0.7, zIndex: 2 },
  };

  return;
};

export default SuccessStoriesSection;
