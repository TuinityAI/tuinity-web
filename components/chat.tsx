import { MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";

export function ChatButton() {
  return (
    <Tooltip>
      <Link href="https://wa.me/50768497142" target="_blank">
        <TooltipTrigger asChild>
          <Button size="icon-lg" className="right-0 bottom-0 fixed mr-8 mb-8">
            <MessageSquare />
          </Button>
        </TooltipTrigger>
      </Link>
      <TooltipContent side="top">Chat via WhatsApp</TooltipContent>
    </Tooltip>
  );
}
