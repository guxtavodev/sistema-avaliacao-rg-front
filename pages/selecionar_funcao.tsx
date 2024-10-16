import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { Button } from '@/components/ui/button'; // Importando o botão do shadcn/ui
import { Label } from '@/components/ui/label'; // Importando o label do shadcn/ui
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Importando os componentes do select

const SelecionarFuncao = () => {
  const [funcoes, setFuncoes] = useState<{ id: string; nome: string }[]>([]);
  const [selectedFuncao, setSelectedFuncao] = useState<string>('');

  useEffect(() => {
    const fetchFuncoes = async () => {
      try {
        const response = await axios.get('https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/funcoes');
        setFuncoes(response.data);
      } catch (error) {
        console.error('Erro ao carregar funções:', error);
        alert('Erro ao carregar funções. Tente novamente.');
      }
    };

    fetchFuncoes();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFuncao) {
      window.location.href = `/avaliar_funcionarios?funcaoId=${selectedFuncao}`;
    } else {
      alert('Por favor, selecione uma função.');
    }
  };

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Selecionar Função</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="funcao">Função:</Label>
          <Select value={selectedFuncao} onValueChange={setSelectedFuncao} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma função" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Funções Disponíveis</SelectLabel>
                {funcoes.map((funcao) => (
                  <SelectItem key={funcao.id} value={funcao.id}>
                    {funcao.nome}
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

export default SelecionarFuncao;
