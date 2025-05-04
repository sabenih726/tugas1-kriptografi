
/**
 * Extended Vigenere Cipher (256 ASCII characters)
 */

export const encryptExtendedVigenere = (plaintext: string, key: string): string => {
  if (!key || key.length === 0) return plaintext;

  let result = '';
  
  for (let i = 0; i < plaintext.length; i++) {
    // Get ASCII values
    const plainCharCode = plaintext.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    
    // Apply Extended Vigenere encryption: (plaintext + key) mod 256
    const encryptedCharCode = (plainCharCode + keyCharCode) % 256;
    
    // Convert back to character and append to result
    result += String.fromCharCode(encryptedCharCode);
  }
  
  return result;
};

export const decryptExtendedVigenere = (ciphertext: string, key: string): string => {
  if (!key || key.length === 0) return ciphertext;

  let result = '';
  
  for (let i = 0; i < ciphertext.length; i++) {
    // Get ASCII values
    const cipherCharCode = ciphertext.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    
    // Apply Extended Vigenere decryption: (ciphertext - key + 256) mod 256
    const decryptedCharCode = (cipherCharCode - keyCharCode + 256) % 256;
    
    // Convert back to character and append to result
    result += String.fromCharCode(decryptedCharCode);
  }
  
  return result;
};
