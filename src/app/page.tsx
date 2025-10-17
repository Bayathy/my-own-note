import { Button } from "@heroui/react";
import Editor from "@/features/editor/components/editor";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button color="primary" onPress={() => console.log("clicked")}>
        Click me
      </Button>
      <Editor />
    </div>
  );
}
