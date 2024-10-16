import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SelecionarTurma = () => {
  const [turmas, setTurmas] = useState<{ id: string; nome: string }[]>([]);
  const [selectedTurma, setSelectedTurma] = useState<string>('');

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await axios.get('https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/turmas');
        setTurmas(response.data);
      } catch (error) {
        console.error('Erro ao carregar turmas:', error);
        alert('Erro ao carregar turmas. Tente novamente.');
      }
    };

    fetchTurmas();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTurma) {
      window.location.href = `/avaliar_professores?turmaId=${selectedTurma}`;
    } else {
      alert('Por favor, selecione uma turma.');
    }
  };

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Selecionar Turma</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="turma">Turma:</Label>
          <Select value={selectedTurma} onValueChange={setSelectedTurma} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Turmas Disponíveis</SelectLabel>
                {turmas.map((turma) => (
                  <SelectItem key={turma.id} value={turma.id}>
                    {turma.nome}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Iniciar Avaliação</Button>
      </form>
    </div>
  );
};

export default SelecionarTurma;
