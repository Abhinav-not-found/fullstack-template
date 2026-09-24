type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

const textColors: Record<Color, number> = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
};

const backgroundColors: Record<Color, number> = {
  black: 40,
  red: 41,
  green: 42,
  yellow: 43,
  blue: 44,
  magenta: 45,
  cyan: 46,
  white: 47,
};

export function colorText(text: string, textColor?: Color, backgroundColor?: Color): string {
  const codes: number[] = [];

  if (textColor) {
    codes.push(textColors[textColor]);
  }

  if (backgroundColor) {
    codes.push(backgroundColors[backgroundColor]);
  }

  return `\x1b[${codes.join(';')}m${text}\x1b[0m`;
}
