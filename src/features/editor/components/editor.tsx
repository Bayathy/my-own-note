"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral dark:prose-invert prose-lg focus:outline-none min-h-screen p-8 max-w-none",
      },
    },
  });

  return (
    <div className="h-full w-full overflow-auto bg-background">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
