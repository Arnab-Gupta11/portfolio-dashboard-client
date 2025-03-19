// hooks/useRichTextEditor.ts
import { useMemo } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { createLowlight, all } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
// Create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const useRichTextEditor = (defaultContent: string | null) => {
  const editor = useEditor({
    extensions: useMemo(
      () => [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
          codeBlock: false,
        }),
        Underline,
        CodeBlockLowlight.configure({
          lowlight,
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
          alignments: ["left", "center", "right", "justify"],
        }),
        Highlight.configure({ multicolor: true }),
      ],
      []
    ),
    content: defaultContent || "", // Initial content
    editorProps: {
      attributes: {
        class:
          "h-[300px] rounded-md py-2 px-3 overflow-y-auto border focus:outline-none dark:border-[#1e232e] dark:text-white text-slate-950 shadow-md dark:shadow-slate-900",
      },
    },

    immediatelyRender: false,
  });

  return editor;
};

export default useRichTextEditor;
