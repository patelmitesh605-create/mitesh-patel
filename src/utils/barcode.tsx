import React from 'react';

// Code 39 Barcode standard pattern lookup table
const CODE_39_MAP: Record<string, string> = {
  '0': '000110100', '1': '100100001', '2': '001100001', '3': '101100000',
  '4': '000110001', '5': '100110000', '6': '001110000', '7': '000100101',
  '8': '100100100', '9': '001100100', 'A': '100001001', 'B': '001001001',
  'C': '101001000', 'D': '000011001', 'E': '100011000', 'F': '001011000',
  'G': '000001101', 'H': '100001100', 'I': '001001100', 'J': '000011100',
  'K': '100000011', 'L': '001000011', 'M': '101000010', 'N': '000010011',
  'O': '100010010', 'P': '001010010', 'Q': '000000111', 'R': '100000110',
  'S': '001000110', 'T': '000010110', 'U': '110000001', 'V': '011000001',
  'W': '111000000', 'X': '010010001', 'Y': '110010000', 'Z': '011010000',
  '-': '010000101', '.': '110000100', ' ': '011000100', '$': '010101000',
  '/': '010100010', '+': '010001010', '%': '000101010', '*': '010010100'
};

interface BarcodeProps {
  value: string;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  showText?: boolean;
}

export const BarcodeSvg: React.FC<BarcodeProps> = ({
  value,
  width = 180,
  height = 36,
  color = '#111827',
  className = '',
  showText = false
}) => {
  // Normalize string for Code 39
  const cleanVal = (value || 'ID12345').toUpperCase().replace(/[^0-9A-Z\-.$/+% ]/g, '-');
  const encodedStr = `*${cleanVal}*`;

  const bars: { isBar: boolean; width: number }[] = [];

  for (let i = 0; i < encodedStr.length; i++) {
    const char = encodedStr[i];
    const pattern = CODE_39_MAP[char] || CODE_39_MAP['-'];

    for (let p = 0; p < 9; p++) {
      const isBar = p % 2 === 0;
      const isWide = pattern[p] === '1';
      bars.push({
        isBar,
        width: isWide ? 2.6 : 1.1
      });
    }

    // Inter-character gap
    if (i < encodedStr.length - 1) {
      bars.push({ isBar: false, width: 1.2 });
    }
  }

  const totalWidth = bars.reduce((acc, b) => acc + b.width, 0);
  let currentX = 0;

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox={`0 0 ${totalWidth} ${height}`}
        width={width}
        height={height}
        className="w-full h-auto block"
        shapeRendering="crispEdges"
      >
        {bars.map((bar, idx) => {
          const x = currentX;
          currentX += bar.width;
          if (!bar.isBar) return null;
          return (
            <rect
              key={idx}
              x={x}
              y={0}
              width={bar.width}
              height={height}
              fill={color}
            />
          );
        })}
      </svg>
      {showText && (
        <span className="text-[9px] font-mono tracking-widest mt-0.5 text-slate-700 font-medium">
          {cleanVal}
        </span>
      )}
    </div>
  );
};
