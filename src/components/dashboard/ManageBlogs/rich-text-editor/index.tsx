import React from "react";
import MenuBar from "./Menubar";
import { Editor, EditorContent } from "@tiptap/react";
import "./text-editor.css";
const RichtextEdiror = ({ editor }: { editor: Editor | null }) => {
  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichtextEdiror;
