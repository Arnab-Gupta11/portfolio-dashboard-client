import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Code,
  Quote,
  Undo,
  Redo,
  Minus,
} from "lucide-react";
import { BsJustify } from "react-icons/bs";

import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip component from ShadCN UI

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Undo className="size-4" />,
      onClick: () => editor.chain().focus().undo().run(),
      preesed: false,
      disabled: !editor.can().undo(),
      tooltip: "Undo",
    },
    {
      icon: <Redo className="size-4" />,
      onClick: () => editor.chain().focus().redo().run(),
      preesed: false,
      disabled: !editor.can().redo(),
      tooltip: "Redo",
    },
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
      tooltip: "Heading 1",
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
      tooltip: "Heading 2",
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
      tooltip: "Bold",
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
      tooltip: "Italic",
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
      tooltip: "Strikethrough",
    },
    {
      icon: <Quote className="size-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      preesed: editor.isActive("blockquote"),
      tooltip: "Blockquote",
    },
    {
      icon: <Minus className="size-4" />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      preesed: false,
      tooltip: "Horizontal Rule",
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
      tooltip: "Align Left",
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
      tooltip: "Align Center",
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
      tooltip: "Align Right",
    },
    {
      icon: <BsJustify className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      preesed: editor.isActive({ textAlign: "justify" }),
      tooltip: "Justify",
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
      tooltip: "Bullet List",
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
      tooltip: "Ordered List",
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      preesed: editor.isActive("codeBlock"),
      tooltip: "Code Block",
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
      tooltip: "Highlight",
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 dark:border-[#1e232e] dark:text-dark-secondary-txt text-light-secondary-txt z-50 flex flex-wrap">
      {Options.map((option, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle pressed={option.preesed} onPressedChange={option.onClick} disabled={option.disabled}>
                {option.icon}
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-dark-bg-secondary text-light-primary-txt dark:text-dark-primary-txt shadow-sm shadow-primary">
              <p>{option.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
