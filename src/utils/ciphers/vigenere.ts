
/**
 * Standard Vigenere Cipher (26 letters alphabet)
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
  return text.replace(/[^a-zA-Z]/g, '');
};

export const encryptVigenere = (plaintext: string, key: string): string => {
  if (!key) return plaintext;
  
  const cleanPlaintext = cleanText(plaintext);
  const cleanKey = cleanText(key);
  
  if (!cleanKey) return plaintext;

  let result = '';
  
  for (let i = 0; i < cleanPlaintext.length; i++) {
    // Get position in alphabet for current character and key
    const charCode = charToNum(cleanPlaintext[i]);
    const keyCode = charToNum(cleanKey[i % cleanKey.length]);
    
    // Apply Vigenere formula: (plaintext + key) mod 26
    const encryptedCharCode = (charCode + keyCode) % 26;
    
    // Convert back to character and append to result
    result += numToChar(encryptedCharCode);
  }
  
  return result;
};

export const decryptVigenere = (ciphertext: string, key: string): string => {
  if (!key) return ciphertext;
  
  const cleanCiphertext = cleanText(ciphertext);
  const cleanKey = cleanText(key);
  
  if (!cleanKey) return ciphertext;

  let result = '';
  
  for (let i = 0; i < cleanCiphertext.length; i++) {
    // Get position in alphabet for current character and key
    const charCode = charToNum(cleanCiphertext[i]);
    const keyCode = charToNum(cleanKey[i % cleanKey.length]);
    
    // Apply Vigenere decryption formula: (ciphertext - key + 26) mod 26
    const decryptedCharCode = (charCode - keyCode + 26) % 26;
    
    // Convert back to character and append to result
    result += numToChar(decryptedCharCode);
  }
  
  return result;
};
