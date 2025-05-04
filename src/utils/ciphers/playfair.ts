/**
 * Playfair Cipher (26 letters alphabet)
 */

// Clean text to only include letters A-Z, a-z
const cleanText = (text: string): string => {
  // Replace J with I for Playfair (standard practice)
  return text.replace(/[^a-zA-Z]/g, '').replace(/[jJ]/g, 'i').toLowerCase();
};

// Generate the Playfair matrix from a key
const generatePlayfairMatrix = (key: string): string[][] => {
  // Clean the key and remove duplicates
  let cleanKey = '';
  const usedChars = new Set<string>();
  
  // First add characters from the key
  for (const char of cleanText(key)) {
    if (!usedChars.has(char)) {
      cleanKey += char;
      usedChars.add(char);
    }
  }
  
  // Then add remaining alphabet (except J which is replaced with I)
  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode('a'.charCodeAt(0) + i);
    if (char !== 'j' && !usedChars.has(char)) {
      cleanKey += char;
      usedChars.add(char);
    }
  }
  
  // Create 5x5 matrix from the key
  const matrix: string[][] = [];
  for (let i = 0; i < 5; i++) {
    matrix.push(cleanKey.slice(i * 5, (i + 1) * 5).split(''));
  }
  
  return matrix;
};

// Find coordinates of a character in the Playfair matrix
const findCharInMatrix = (matrix: string[][], char: string): [number, number] => {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] === char) {
        return [row, col];
      }
    }
  }
  return [-1, -1]; // Should never reach here if char is valid
};

// Prepare text for Playfair encryption (split into digraphs)
const preparePlayfairText = (text: string): string => {
  let prepared = cleanText(text);
  let result = '';
  
  for (let i = 0; i < prepared.length; i++) {
    result += prepared[i];
    
    // Insert 'x' between double letters
    if (i < prepared.length - 1 && prepared[i] === prepared[i + 1]) {
      result += 'x';
    }
  }
  
  // If odd length, add 'x' at the end
  if (result.length % 2 !== 0) {
    result += 'x';
  }
  
  return result;
};

export const encryptPlayfair = (plaintext: string, key: string): string => {
  if (!key) return plaintext;
  
  const matrix = generatePlayfairMatrix(key);
  const prepared = preparePlayfairText(plaintext);
  
  let result = '';
  
  for (let i = 0; i < prepared.length; i += 2) {
    const char1 = prepared[i];
    const char2 = prepared[i + 1];
    
    const [row1, col1] = findCharInMatrix(matrix, char1);
    const [row2, col2] = findCharInMatrix(matrix, char2);
    
    let newRow1 = row1;
    let newCol1 = col1;
    let newRow2 = row2;
    let newCol2 = col2;
    
    // Same row - shift right (with wrap)
    if (row1 === row2) {
      newCol1 = (col1 + 1) % 5;
      newCol2 = (col2 + 1) % 5;
    } 
    // Same column - shift down (with wrap)
    else if (col1 === col2) {
      newRow1 = (row1 + 1) % 5;
      newRow2 = (row2 + 1) % 5;
    } 
    // Rectangle - swap columns
    else {
      newCol1 = col2;
      newCol2 = col1;
    }
    
    result += matrix[newRow1][newCol1] + matrix[newRow2][newCol2];
  }
  
  return result;
};

export const decryptPlayfair = (ciphertext: string, key: string): string => {
  if (!key) return ciphertext;
  
  const matrix = generatePlayfairMatrix(key);
  const cleaned = cleanText(ciphertext);
  
  let result = '';
  
  for (let i = 0; i < cleaned.length; i += 2) {
    if (i + 1 >= cleaned.length) break; // Ensure we have a pair
    
    const char1 = cleaned[i];
    const char2 = cleaned[i + 1];
    
    const [row1, col1] = findCharInMatrix(matrix, char1);
    const [row2, col2] = findCharInMatrix(matrix, char2);
    
    let newRow1 = row1;
    let newCol1 = col1;
    let newRow2 = row2;
    let newCol2 = col2;
    
    // Same row - shift left (with wrap)
    if (row1 === row2) {
      newCol1 = (col1 - 1 + 5) % 5;
      newCol2 = (col2 - 1 + 5) % 5;
    } 
    // Same column - shift up (with wrap)
    else if (col1 === col2) {
      newRow1 = (row1 - 1 + 5) % 5;
      newRow2 = (row2 - 1 + 5) % 5;
    } 
    // Rectangle - swap columns
    else {
      newCol1 = col2;
      newCol2 = col1;
    }
    
    result += matrix[newRow1][newCol1] + matrix[newRow2][newCol2];
  }
  
  // Note: In real usage, we would remove the padding 'x' characters
  // but for simplicity in this implementation we'll keep them
  
  return result;
};
