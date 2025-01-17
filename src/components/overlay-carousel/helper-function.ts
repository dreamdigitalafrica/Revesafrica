interface ComputeOne {
  activeIndex: number;
  itemIndex: number;
  itemsLen: number;
}

interface ComputeTwo {
  itemIndex: number;
  activeIndex: number;
}

export const getVariant = ({
  activeIndex,
  itemIndex,
}: ComputeTwo): "active" | "inactive" => {
  return itemIndex === activeIndex ? "active" : "inactive";
};

export const computeZindex = ({
  activeIndex,
  itemIndex,
  itemsLen,
}: ComputeOne): number => {
  // Compute the absolute difference between activeIndex and itemIndex
  const difference = Math.abs(activeIndex - itemIndex);

  // Compute a score: highest when difference is 0, decreases with difference
  const score = itemsLen - difference;

  // Ensure score does not go below 0
  return Math.max(score, 0);
};

export const computeScale = ({
  activeIndex,
  itemIndex,
}: ComputeTwo): number => {
  if (activeIndex === itemIndex) {
    return 1; // Return 1 when activeIndex equals itemIndex
  }

  // Calculate the absolute difference
  const difference = Math.abs(activeIndex - itemIndex);

  // Scale the fraction in 0.1 units, ensuring it doesn't go below 0.1
  const fraction = Math.max(1 - difference * 0.05, 0.1);

  return fraction;
};

export const translate = (input: number): number => {
  // Start from 300 and increase in steps of 100
  const base = 300;
  const increment = 100; // The scale of increment
  const result = base + input * increment;

  return result;
};

export const computeNumber = ({ activeIndex, itemIndex }: ComputeTwo) => {
  if (activeIndex > itemIndex) {
    // Case 1: activeIndex is greater than itemIndex
    return 200 + itemIndex * 40;
  }

  if (activeIndex < itemIndex) {
    // Case 2: activeIndex is less than itemIndex
    return 500 + itemIndex * 40;
  }
};
