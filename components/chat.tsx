import { MessageSquare } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";

function Corner({ className }: { className: string }) {
  return (
    <span
      className={`absolute w-2.5 h-2.5 border-white ${className}`}
    />
  );
}

export function ChatButton() {
  return (
    <Tooltip>
      <Link href="https://wa.me/50768497142" target="_blank">
        <TooltipTrigger asChild>
          <span
            className="right-0 bottom-0 z-50 fixed mr-5 mb-5 flex items-center justify-center w-10 h-10 cursor-pointer transition-transform hover:scale-110 mix-blend-difference"
          >
            <Corner className="top-0 left-0 border-t border-l" />
            <Corner className="top-0 right-0 border-t border-r" />
            <Corner className="bottom-0 right-0 border-b border-r" />
            <Corner className="bottom-0 left-0 border-b border-l" />
            <MessageSquare className="size-4 text-white" />
          </span>
        </TooltipTrigger>
      </Link>
      <TooltipContent side="top">Chat via WhatsApp</TooltipContent>
    </Tooltip>
  );
}
