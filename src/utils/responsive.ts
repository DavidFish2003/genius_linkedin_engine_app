import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Baseline design resolution (375px width, 812px height)
const baseWidth = 375;
const baseHeight = 812;

/**
 * Scale element size proportionally based on screen width
 */
export const scale = (size: number): number => {
  const scaleFactor = SCREEN_WIDTH / baseWidth;
  const newSize = size * scaleFactor;
  // Clamp scaling factor to prevent oversized elements on large tablets/foldables
  if (SCREEN_WIDTH > 600) {
    return Math.round(size * 1.15);
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Moderate scale factor for subtle padding/margins
 */
export const moderateScale = (size: number, factor = 0.4): number => {
  return size + (scale(size) - size) * factor;
};

/**
 * Convert percentage to absolute width
 */
export const wp = (percentage: number): number => {
  return Math.round((SCREEN_WIDTH * percentage) / 100);
};

/**
 * Convert percentage to absolute height
 */
export const hp = (percentage: number): number => {
  return Math.round((SCREEN_HEIGHT * percentage) / 100);
};
