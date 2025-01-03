import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { InfoIcon } from 'lucide-react'
  
  interface InfoTooltipProps {
    content: string;
  }
  
  export function InfoTooltip({ content }: InfoTooltipProps) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  
  