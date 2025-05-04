
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type CipherType = 
  | "vigenere" 
  | "autoKeyVigenere" 
  | "extendedVigenere" 
  | "playfair" 
  | "affine" 
  | "hill" 
  | "superEncryption";

interface CipherOption {
  id: CipherType;
  name: string;
  description: string;
}

const cipherOptions: CipherOption[] = [
  {
    id: "vigenere",
    name: "Vigenère Standard",
    description: "Standard 26 letter alphabet Vigenère cipher",
  },
  {
    id: "autoKeyVigenere",
    name: "Auto-Key Vigenère",
    description: "Variant of Vigenère cipher with auto-key generation",
  },
  {
    id: "extendedVigenere",
    name: "Extended Vigenère",
    description: "Extended Vigenère cipher supporting 256 ASCII characters",
  },
  {
    id: "playfair",
    name: "Playfair",
    description: "26 letter alphabet Playfair cipher",
  },
  {
    id: "affine",
    name: "Affine",
    description: "26 letter alphabet Affine cipher",
  },
  {
    id: "hill",
    name: "Hill",
    description: "26 letter alphabet Hill cipher",
  },
  {
    id: "superEncryption",
    name: "Super Encryption",
    description: "Combined Extended Vigenère and Columnar Transposition",
  },
];

interface CipherSelectorProps {
  selectedCipher: CipherType;
  onCipherChange: (cipher: CipherType) => void;
}

const CipherSelector: React.FC<CipherSelectorProps> = ({
  selectedCipher,
  onCipherChange,
}) => {
  return (
    <div className="w-full mb-6">
      <h2 className="text-xl font-bold mb-2 text-center">Pilih Algoritma Cipher</h2>
      <Tabs
        defaultValue={selectedCipher}
        value={selectedCipher}
        onValueChange={(value) => onCipherChange(value as CipherType)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full">
          {cipherOptions.map((option) => (
            <TabsTrigger
              key={option.id}
              value={option.id}
              className="text-xs md:text-sm"
              title={option.description}
            >
              {option.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CipherSelector;
