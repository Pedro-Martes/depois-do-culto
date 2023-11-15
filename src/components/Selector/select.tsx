import * as React from "react";
import { CaretDown } from "phosphor-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { SelectContent, SelectIcon, SelectTrigger, StyledItem } from "./style";


interface SelectItemProps {
    children: React.ReactNode;
    value: string;
  }

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(({children, ...props}, forwardRef) => {
  return(
    <StyledItem {...props} ref={forwardRef} >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText> 
    </StyledItem>
  );
});

export function Selector() {
    const Select = SelectPrimitive.Root;

    return (
        <Select>
            <SelectTrigger color="indigo">
                <SelectPrimitive.Value placeholder="Selecione Comando"  />
                <SelectIcon>
                    <CaretDown size={12} />
                </SelectIcon>
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="1">
                   Guia de estudo bíblico
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
