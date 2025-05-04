
/**
 * Super Encryption: Extended Vigenere Cipher + Columnar Transposition
 */

import { encryptExtendedVigenere, decryptExtendedVigenere } from './extendedVigenere';

// Columnar Transposition Cipher

// Helper function to create a transposition table
const createTranspositionTable = (text: string, cols: number): string[][] => {
  const rows = Math.ceil(text.length / cols);
  const table: string[][] = [];
  
  for (let i = 0; i < rows; i++) {
    table.push([]);
    for (let j = 0; j < cols; j++) {
      const index = i * cols + j;
      table[i].push(index < text.length ? text[index] : '');
    }
  }
  
  return table;
};

// Helper function to determine column order based on key
const getColumnOrder = (key: string): number[] => {
  const keyChars = key.split('');
  const sortedKeyChars = [...keyChars].sort();
  
  return keyChars.map(k => sortedKeyChars.indexOf(k));
};

// Encrypt using Columnar Transposition
const encryptTransposition = (text: string, key: string): string => {
  if (!key) return text;
  
  const cols = key.length;
  const table = createTranspositionTable(text, cols);
  const columnOrder = getColumnOrder(key);
  
  let result = '';
  
  // Read table by columns in order determined by key
  for (let i = 0; i < cols; i++) {
    const colIndex = columnOrder.indexOf(i);
    for (let row of table) {
      if (colIndex < row.length && row[colIndex]) {
        result += row[colIndex];
      }
    }
  }
  
  return result;
};

// Decrypt using Columnar Transposition
const decryptTransposition = (text: string, key: string): string => {
  if (!key) return text;
  
  const cols = key.length;
  const rows = Math.ceil(text.length / cols);
  const columnOrder = getColumnOrder(key);
  
  // Calculate number of cells and filled cells
  const totalCells = cols * rows;
  const filledCells = text.length;
  const emptyCells = totalCells - filledCells;
  
  // Create empty table
  const table: string[][] = Array(rows).fill(0).map(() => Array(cols).fill(''));
  
  // Determine how many cells are filled in each column
  const colLengths = Array(cols).fill(rows);
  if (emptyCells > 0) {
    // Last row may have empty cells
    for (let i = 0; i < emptyCells; i++) {
      // Reduce count for columns that would have empty cells 
      // (starting from the rightmost column)
      colLengths[columnOrder.indexOf(cols - 1 - i)]--;
    }
  }
  
  // Fill the table by reading ciphertext by columns
  let textIndex = 0;
  for (let i = 0; i < cols; i++) {
    const colIndex = columnOrder.indexOf(i);
    for (let j = 0; j < colLengths[colIndex]; j++) {
      table[j][colIndex] = text[textIndex++];
    }
  }
  
  // Read table row by row
  let result = '';
  for (let row of table) {
    result += row.join('');
  }
  
  return result;
};

// Super Encryption functions

export const encryptSuperEncryption = (plaintext: string, key1: string, key2: string): string => {
  if (!key1 || !key2) return plaintext;
  
  // First, apply Extended Vigenere Cipher
  const vigenereCiphertext = encryptExtendedVigenere(plaintext, key1);
  
  // Then, apply Columnar Transposition
  return encryptTransposition(vigenereCiphertext, key2);
};

export const decryptSuperEncryption = (ciphertext: string, key1: string, key2: string): string => {
  if (!key1 || !key2) return ciphertext;
  
  // First, undo Columnar Transposition
  const transpositionPlaintext = decryptTransposition(ciphertext, key2);
  
  // Then, undo Extended Vigenere Cipher
  return decryptExtendedVigenere(transpositionPlaintext, key1);
};
