"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { fileToBase64 } from "@/lib/utils";
import "@blocknote/mantine/style.css";
import { useEffect } from "react";

export default function Editor({ 
  initialContent, 
  onChange, 
  theme = "light" 
}: { 
  initialContent: any[]; 
  onChange: (content: any) => void;
  theme?: "light" | "dark";
}) {
  const initial = (initialContent && initialContent.length > 0) ? initialContent : undefined;

  const editor = useCreateBlockNote({
    initialContent: initial,
    uploadFile: async (file) => {
      const base64 = await fileToBase64(file);
      return base64;
    },
  });

  return (
    <BlockNoteView 
      editor={editor} 
      theme={theme}
      onChange={() => {
        onChange(editor.document);
      }}
    />
  );
}
