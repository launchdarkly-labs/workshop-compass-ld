"use client"

import * as React from "react"
import {
    RotateCcw,
    FlaskConical,
} from "lucide-react"
import { useRouter } from "next/router";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { toast } from "./ui/use-toast";
import ExperimentGenerator from "@/components/ui/marketcomponents/experimentgenerator";

export function QuickCommandDialog({ children }) {
    const [open, setOpen] = React.useState(false)
    const location = useRouter();
    const [timer, setTimer] = React.useState(0);


    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            {children}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Actions">
                        <CommandItem>
                            <FlaskConical className="mr-2 h-4 w-4" />
                            <ExperimentGenerator />
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}