
/**
 * Affine Cipher (26 letters alphabet)
 */

// Helper to get character code for alphabet (a=0, b=1, ..., z=25)
const charToNum = (char: string): number => {
  return char.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
};

// Helper to get character from code (0=a, 1=b, ..., 25=z)
const numToChar = (num: number): string => {
  return String.fromCharCode((num % 26) + 'a'.charCodeAt(0));
};

// Clean text to only include letters A-Z, a-z
const cleanText = (text: string): string => {
  return text.replace(/[^a-zA-Z]/g, '').toLowerCase();
};

// Find the modular multiplicative inverse
const modInverse = (a: number, m: number): number => {
  // Ensure a is positive
  a = ((a % m) + m) % m;
  
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) {
      return i;
    }
  }
  
  // If no inverse exists, return -1 (this should not happen for valid 'a')
  return -1;
};

// Check if a and m are coprime (gcd(a, m) = 1)
const isCoprime = (a: number, m: number): boolean => {
  const gcd = (x: number, y: number): number => {
    return y === 0 ? x : gcd(y, x % y);
  };
  
  return gcd(a, m) === 1;
};

export const encryptAffine = (plaintext: string, a: number, b: number): string => {
  // For Affine cipher, a must be coprime with 26
  if (!isCoprime(a, 26)) {
    // Throw an error or return a message
    return "Error: 'a' must be coprime with 26";
  }
  
  const cleaned = cleanText(plaintext);
  let result = '';
  
  for (let i = 0; i < cleaned.length; i++) {
    // Get position in alphabet
    const x = charToNum(cleaned[i]);
    
    // Apply Affine formula: E(x) = (ax + b) mod 26
    const encryptedNum = (a * x + b) % 26;
    
    // Convert back to character and append to result
    result += numToChar(encryptedNum);
  }
  
  return result;
};

export const decryptAffine = (ciphertext: string, a: number, b: number): string => {
  // For Affine cipher, a must be coprime with 26
  if (!isCoprime(a, 26)) {
    // Throw an error or return a message
    return "Error: 'a' must be coprime with 26";
  }
  
  // Find modular multiplicative inverse of a
  const aInverse = modInverse(a, 26);
  
  const cleaned = cleanText(ciphertext);
  let result = '';
  
  for (let i = 0; i < cleaned.length; i++) {
    // Get position in alphabet
    const y = charToNum(cleaned[i]);
    
    // Apply Affine decryption formula: D(y) = a^-1 * (y - b) mod 26
    const decryptedNum = (aInverse * (y - b + 26)) % 26;
    
    // Convert back to character and append to result
    result += numToChar(decryptedNum);
  }
  
  return result;
};
