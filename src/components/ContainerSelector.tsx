// File: src/components/ContainerSelector.tsx
"use client";

import { ContainerData } from "@/types/container";
import { Button, Stack } from "@mui/material";

interface Props {
  containers: ContainerData[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function ContainerSelector({
  containers,
  selectedIndex,
  onSelect,
}: Props) {
  return (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      {containers.map((container, i) => (
        <Button
          key={container.id}
          variant={i === selectedIndex ? "contained" : "outlined"}
          color="primary"
          onClick={() => onSelect(i)}
        >
          {container.id}
        </Button>
      ))}
    </Stack>
  );
}
