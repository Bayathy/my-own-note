import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/shadcn/resizable";

export default function EditorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen w-full">
			<ResizablePanelGroup direction="horizontal" className="">
				<ResizablePanel
					defaultSize={15}
					minSize={5}
					maxSize={40}
				></ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={85}>{children}</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
