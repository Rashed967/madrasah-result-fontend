import fs from 'fs';
import path from 'path';

// Base64 encoded font data
const solaimanLipiBase64 = `data:font/truetype;base64,AAEAAAAKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA...`; // Your actual base64 font data here

export const fonts = {
  SolaimanLipi: {
    normal: solaimanLipiBase64,
    bold: solaimanLipiBase64
  }
}; 