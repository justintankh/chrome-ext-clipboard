import * as React from "react";

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command } from "cmdk";
import { CommandIcon } from "lucide-react";

export type InputWithSuggestionsProps = {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
  onHotkeyPress: () => void;
  autoFocus: boolean;
};

export function InputWithSuggestions(props: InputWithSuggestionsProps) {
  const { value, onChange, categories, autoFocus, onHotkeyPress } = props;
  const [isFocus, setFocus] = React.useState<boolean>(false);
  const listClassName =
    isFocus && value ? "absolute w-full commandList" : "hidden";
  const inputClassName = isFocus
    ? "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:border-indigo-300 rounded-b-none"
    : "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:border-indigo-300";
  const itemClassName =
    "relative flex cursor-default rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:opacity-50 text-left";

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onHotkeyPress();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <Command className="relative">
        <Command.Input
          placeholder={isFocus ? "Category.." : "CMD + K"}
          className={inputClassName}
          onValueChange={onChange}
          value={value}
          autoFocus={autoFocus}
          onFocus={() => {
            onHotkeyPress();
            setFocus(true);
          }}
          onBlur={() => setFocus(false)}
        />
        <CommandList className={listClassName}>
          <CommandEmpty className={itemClassName + "text-neutral-500"}>
            New category
          </CommandEmpty>
          <CommandGroup>
            {categories.map((status) => (
              <CommandItem
                key={status}
                className={itemClassName}
                onSelect={(value) => {
                  onChange(
                    categories.find((category) => category === value) ?? value
                  );
                }}
              >
                {status}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
