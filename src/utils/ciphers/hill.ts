
/**
 * Hill Cipher (26 letters alphabet)
 */

// Helper to get character code for alphabet (a=0, b=1, ..., z=25)
const charToNum = (char: string): number => {
  return char.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
};

// Helper to get character from code (0=a, 1=b, ..., 25=z)
const numToChar = (num: number): string => {
  return String.fromCharCode(((num % 26) + 26) % 26 + 'a'.charCodeAt(0));
};

// Clean text to only include letters A-Z, a-z
const cleanText = (text: string): string => {
  return text.replace(/[^a-zA-Z]/g, '').toLowerCase();
};

// Calculate determinant of a 2x2 matrix
const determinant2x2 = (matrix: number[][]): number => {
  return (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % 26;
};

// Calculate modulo inverse of a number
const modInverse = (a: number, m: number): number => {
  a = ((a % m) + m) % m;
  
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) {
      return i;
    }
  }
  
  return -1; // No inverse exists
};

// Calculate inverse of a 2x2 matrix for Hill cipher
const inverseMatrix2x2 = (matrix: number[][]): number[][] | null => {
  let det = determinant2x2(matrix);
  
  // If determinant is not coprime with 26, matrix is not invertible
  const detInverse = modInverse(det, 26);
  if (detInverse === -1) {
    return null; // Matrix is not invertible
  }
  
  // Calculate adjugate matrix
  const adjugate = [
    [matrix[1][1], (-matrix[0][1] + 26) % 26],
    [(-matrix[1][0] + 26) % 26, matrix[0][0]]
  ];
  
  // Calculate inverse matrix
  const inverse = [
    [(adjugate[0][0] * detInverse) % 26, (adjugate[0][1] * detInverse) % 26],
    [(adjugate[1][0] * detInverse) % 26, (adjugate[1][1] * detInverse) % 26]
  ];
  
  return inverse;
};

// Convert a key string to a 2x2 matrix
const keyToMatrix = (key: string): number[][] => {
  const cleanKey = cleanText(key);
  
  // Ensure key is at least 4 characters long
  let paddedKey = cleanKey;
  while (paddedKey.length < 4) {
    paddedKey += 'a';
  }
  
  // Take the first 4 characters and convert to 2x2 matrix
  return [
    [charToNum(paddedKey[0]), charToNum(paddedKey[1])],
    [charToNum(paddedKey[2]), charToNum(paddedKey[3])],
  ];
};

export const encryptHill = (plaintext: string, key: string): string => {
  if (!key) return plaintext;
  
  const keyMatrix = keyToMatrix(key);
  const cleaned = cleanText(plaintext);
  
  // Ensure plaintext is of even length
  let paddedText = cleaned;
  if (paddedText.length % 2 !== 0) {
    paddedText += 'x';
  }
  
  let result = '';
  
  // Process text in blocks of 2 characters
  for (let i = 0; i < paddedText.length; i += 2) {
    // Convert pair of characters to vector
    const vector = [charToNum(paddedText[i]), charToNum(paddedText[i + 1])];
    
    // Multiply key matrix with vector
    const encryptedVector = [
      (keyMatrix[0][0] * vector[0] + keyMatrix[0][1] * vector[1]) % 26,
      (keyMatrix[1][0] * vector[0] + keyMatrix[1][1] * vector[1]) % 26
    ];
    
    // Convert back to characters
    result += numToChar(encryptedVector[0]) + numToChar(encryptedVector[1]);
  }
  
  return result;
};

export const decryptHill = (ciphertext: string, key: string): string => {
  if (!key) return ciphertext;
  
  const keyMatrix = keyToMatrix(key);
  const cleaned = cleanText(ciphertext);
  
  // Calculate inverse of key matrix
  const inverseMatrix = inverseMatrix2x2(keyMatrix);
  if (!inverseMatrix) {
    return "Error: Key matrix is not invertible";
  }
  
  let result = '';
  
  // Process text in blocks of 2 characters
  for (let i = 0; i < cleaned.length; i += 2) {
    if (i + 1 >= cleaned.length) break; // Skip if not enough characters
    
    // Convert pair of characters to vector
    const vector = [charToNum(cleaned[i]), charToNum(cleaned[i + 1])];
    
    // Multiply inverse key matrix with vector
    const decryptedVector = [
      (inverseMatrix[0][0] * vector[0] + inverseMatrix[0][1] * vector[1]) % 26,
      (inverseMatrix[1][0] * vector[0] + inverseMatrix[1][1] * vector[1]) % 26
    ];
    
    // Convert back to characters
    result += numToChar(decryptedVector[0]) + numToChar(decryptedVector[1]);
  }
  
  return result;
};
