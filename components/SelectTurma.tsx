import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Turma {
  id: string;
  nome: string;
}

interface SelectTurmaProps {
  turmas: Turma[];
  selectedTurma: string;
  setSelectedTurma: (turmaId: string) => void;
}

export const SelectTurma: React.FC<SelectTurmaProps> = ({
  turmas,
  selectedTurma,
  setSelectedTurma,
}) => {
  return (
    <Select value={selectedTurma} onValueChange={setSelectedTurma}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione uma turma" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Turmas Disponíveis</SelectLabel>
          {turmas.map((turma) => (
            <SelectItem className="text-black" key={turma.id} value={turma.id}>
              {turma.nome}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
