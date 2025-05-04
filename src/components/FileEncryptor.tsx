import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function xorEncrypt(data: Uint8Array, key: string): Uint8Array {
  const keyBytes = new TextEncoder().encode(key);
  const encrypted = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    encrypted[i] = data[i] ^ keyBytes[i % keyBytes.length];
  }
  return encrypted;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
  return btoa(binary);
}

const FileEncryptor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [key, setKey] = useState("");
  const [base64, setBase64] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setBase64("");
  };

  const handleEncrypt = () => {
    if (!file || !key) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as ArrayBuffer;
      const encrypted = xorEncrypt(new Uint8Array(result), key);
      const base64Result = arrayBufferToBase64(encrypted);
      setBase64(base64Result);

      const blob = new Blob([encrypted], { type: "application/octet-stream" });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${file.name}.enc`;
      link.click();
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="space-y-4 p-4 border rounded-xl">
      <h2 className="text-xl font-semibold">File Encryptor</h2>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <Button onClick={handleEncrypt} disabled={!file || !key}>Encrypt and Download</Button>

      {base64 && (
        <div>
          <h3 className="font-medium mt-4">Base64 Output:</h3>
          <textarea
            className="w-full h-48 p-2 border rounded text-xs"
            readOnly
            value={base64}
          />
        </div>
      )}
    </div>
  );
};

export default FileEncryptor;
