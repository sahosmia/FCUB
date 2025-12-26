import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
// import {
// Command,
// CommandEmpty,
// CommandGroup,
// CommandInput,
// CommandItem,
// CommandList,
// } from "@/components/ui/command";

import FormField from './form-field';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function SearchableSelectForm({
    label,
    error,
    value,
    onValueChange,
    placeholder,
    options = [],
}) {
    const [open, setOpen] = useState(false);

    return (
        <FormField label={label} error={error}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between font-normal"
                    >
                        {value
                            ? options.find(
                                  (opt) => String(opt.value) === String(value),
                              )?.label
                            : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    <Command>
                        <CommandInput
                            placeholder={`Search ${label.toLowerCase()}...`}
                        />
                        <CommandList>
                            <CommandEmpty>
                                No {label.toLowerCase()} found.
                            </CommandEmpty>
                            <CommandGroup>
                                {options.map((opt) => (
                                    <CommandItem
                                        key={opt.value}
                                        value={opt.label} // CommandInput এই ভ্যালুর ওপর ভিত্তি করে সার্চ করে
                                        onSelect={() => {
                                            onValueChange(String(opt.value));
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                String(value) ===
                                                    String(opt.value)
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                        {opt.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </FormField>
    );
}
