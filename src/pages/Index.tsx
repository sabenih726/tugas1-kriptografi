import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CipherInput from "@/components/CipherInput";
import CipherSelector, { CipherType } from "@/components/CipherSelector";
import { encryptVigenere, decryptVigenere } from "@/utils/ciphers/vigenere";
import { encryptAutoKeyVigenere, decryptAutoKeyVigenere } from "@/utils/ciphers/autoKeyVigenere";
import { encryptExtendedVigenere, decryptExtendedVigenere } from "@/utils/ciphers/extendedVigenere";
import { encryptPlayfair, decryptPlayfair } from "@/utils/ciphers/playfair";
import { encryptAffine, decryptAffine } from "@/utils/ciphers/affine";
import { encryptHill, decryptHill } from "@/utils/ciphers/hill";
import { encryptSuperEncryption, decryptSuperEncryption } from "@/utils/ciphers/superEncryption";
import { useToast } from "@/components/ui/use-toast";
import FileEncryptor from "@/components/FileEncryptor"; // Komponen baru

const Index = () => {
  const { toast } = useToast();
  const [selectedCipher, setSelectedCipher] = useState<CipherType>("vigenere");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [key, setKey] = useState("");
  const [key2, setKey2] = useState("");
  const [affineA, setAffineA] = useState<number>(1);
  const [affineB, setAffineB] = useState<number>(0);
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  useEffect(() => {
    setOutput("");
  }, [selectedCipher, input]);

  const handleProcess = () => {
    try {
      if (!input) {
        toast({
          title: "Input Kosong",
          description: "Silakan masukkan teks untuk diproses",
          variant: "destructive",
        });
        return;
      }

      if (selectedCipher !== "affine" && !key) {
        toast({
          title: "Kunci Kosong",
          description: "Silakan masukkan kunci untuk diproses",
          variant: "destructive",
        });
        return;
      }

      let result = "";

      if (mode === "encrypt") {
        switch (selectedCipher) {
          case "vigenere":
            result = encryptVigenere(input, key);
            break;
          case "autoKeyVigenere":
            result = encryptAutoKeyVigenere(input, key);
            break;
          case "extendedVigenere":
            result = encryptExtendedVigenere(input, key);
            break;
          case "playfair":
            result = encryptPlayfair(input, key);
            break;
          case "affine":
            result = encryptAffine(input, affineA, affineB);
            break;
          case "hill":
            result = encryptHill(input, key);
            break;
          case "superEncryption":
            if (!key2) {
              toast({
                title: "Kunci Kedua Kosong",
                description: "Super Enkripsi membutuhkan dua kunci",
                variant: "destructive",
              });
              return;
            }
            result = encryptSuperEncryption(input, key, key2);
            break;
        }
      } else {
        switch (selectedCipher) {
          case "vigenere":
            result = decryptVigenere(input, key);
            break;
          case "autoKeyVigenere":
            result = decryptAutoKeyVigenere(input, key);
            break;
          case "extendedVigenere":
            result = decryptExtendedVigenere(input, key);
            break;
          case "playfair":
            result = decryptPlayfair(input, key);
            break;
          case "affine":
            result = decryptAffine(input, affineA, affineB);
            break;
          case "hill":
            result = decryptHill(input, key);
            break;
          case "superEncryption":
            if (!key2) {
              toast({
                title: "Kunci Kedua Kosong",
                description: "Super Enkripsi membutuhkan dua kunci",
                variant: "destructive",
              });
              return;
            }
            result = decryptSuperEncryption(input, key, key2);
            break;
        }
      }

      setOutput(result);
      toast({
        title: "Berhasil",
        description: mode === "encrypt" ? "Enkripsi selesai" : "Dekripsi selesai",
      });
    } catch (error) {
      toast({
        title: "Terjadi Kesalahan",
        description: `Error: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive",
      });
      console.error("Processing error:", error);
    }
  };

  const renderCipherSpecificInputs = () => {
    if (selectedCipher === "affine") {
      return (
        <>
          <CipherInput
            id="affine-a"
            label="Nilai A (harus coprime dengan 26)"
            value={affineA.toString()}
            onChange={(val) => setAffineA(parseInt(val) || 1)}
            type="number"
            inputMode="numeric"
            min={1}
          />
          <CipherInput
            id="affine-b"
            label="Nilai B"
            value={affineB.toString()}
            onChange={(val) => setAffineB(parseInt(val) || 0)}
            type="number"
            inputMode="numeric"
            min={0}
            max={25}
          />
        </>
      );
    } else if (selectedCipher === "superEncryption") {
      return (
        <>
          <CipherInput
            id="key"
            label="Kunci 1 (untuk Extended Vigenere)"
            value={key}
            onChange={setKey}
          />
          <CipherInput
            id="key2"
            label="Kunci 2 (untuk Transposisi Kolom)"
            value={key2}
            onChange={setKey2}
          />
        </>
      );
    } else {
      return (
        <CipherInput
          id="key"
          label={`Kunci ${
            selectedCipher === "hill"
              ? "(min. 4 karakter untuk matrix 2x2)"
              : ""
          }`}
          value={key}
          onChange={setKey}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="w-full max-w-5xl mx-auto shadow-lg">
        <CardHeader className="cipher-gradient text-white rounded-t-lg">
          <CardTitle className="text-center text-2xl md:text-3xl font-bold">
            Implementasi Algoritma Kriptografi
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <CipherSelector
            selectedCipher={selectedCipher}
            onCipherChange={setSelectedCipher}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="cipher-card">
              <CardHeader>
                <CardTitle className="text-lg">Input</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4 mb-4">
                    <Button
                      variant={mode === "encrypt" ? "default" : "outline"}
                      onClick={() => setMode("encrypt")}
                      className="flex-1"
                    >
                      Enkripsi
                    </Button>
                    <Button
                      variant={mode === "decrypt" ? "default" : "outline"}
                      onClick={() => setMode("decrypt")}
                      className="flex-1"
                    >
                      Dekripsi
                    </Button>
                  </div>

                  <CipherInput
                    id="input"
                    label={mode === "encrypt" ? "Plaintext" : "Ciphertext"}
                    value={input}
                    onChange={setInput}
                    multiline
                    fullWidth
                  />

                  {renderCipherSpecificInputs()}

                  <Button 
                    onClick={handleProcess} 
                    className="w-full"
                  >
                    {mode === "encrypt" ? "Enkripsi" : "Dekripsi"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="cipher-card">
              <CardHeader>
                <CardTitle className="text-lg">Output</CardTitle>
              </CardHeader>
              <CardContent>
                <CipherInput
                  id="output"
                  label={mode === "encrypt" ? "Ciphertext" : "Plaintext"}
                  value={output}
                  onChange={setOutput}
                  multiline
                  fullWidth
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Komponen File Encryptor */}
      <div className="max-w-5xl mx-auto mt-10">
        <FileEncryptor />
      </div>

      <footer className="mt-6 text-center text-sm text-muted-foreground">
        &copy; 2025 Tugas 1 Kriptografi Rizki Fermanta
      </footer>
    </div>
  );
};

export default Index;
