import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';
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
import { Textarea } from '@/components/ui/textarea'; 

const AvaliarFuncionarios = () => {
    const router = useRouter();
    const { funcaoId } = router.query;
    const [funcoes, setFuncoes] = useState([]); 
    const [funcionarios, setFuncionarios] = useState([]);
    const [avaliacao, setAvaliacao] = useState({});
    const [sugestao, setSugestao] = useState('');
    const [funcionarioIndex, setFuncionarioIndex] = useState(0);
    const [funcaoNome, setFuncaoNome] = useState(''); // Estado para armazenar o nome da função

    // Carrega todas as funções disponíveis no sistema
    useEffect(() => {
        const fetchFuncoes = async () => {
            try {
                const response = await axios.get('https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/funcoes');
                setFuncoes(response.data); 
            } catch (error) {
                console.error('Erro ao buscar funções:', error);
                alert('Erro ao carregar funções. Tente novamente.');
            }
        };
        fetchFuncoes();
    }, []);

    // Carrega os funcionários da função atual
    useEffect(() => {
        if (funcaoId) {
            const fetchFuncionarios = async () => {
                try {
                    const response = await axios.get(`https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/funcoes/${funcaoId}/funcionarios`);
                    setFuncionarios(response.data);
                    const funcaoAtual = funcoes.find(funcao => funcao.id == funcaoId); // Obtém o nome da função
                    setFuncaoNome(funcaoAtual ? funcaoAtual.nome : ''); // Atualiza o nome da função
                } catch (error) {
                    console.error('Erro ao buscar funcionários:', error);
                    alert('Erro ao carregar funcionários. Tente novamente.');
                }
            };
            fetchFuncionarios();
        }
    }, [funcaoId, funcoes]); // Adiciona funcoes como dependência

    const handleChange = (e) => {
        setAvaliacao({ ...avaliacao, [e.target.name]: e.target.value });
    };

    const handleSugestaoChange = (e) => {
        setSugestao(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/avaliacao_funcionario', {
                funcionario_id: funcionarios[funcionarioIndex].id,
                ...avaliacao,
                sugestoes: sugestao,
            });

            if (funcionarioIndex < funcionarios.length - 1) {
                setFuncionarioIndex(funcionarioIndex + 1);
                setAvaliacao({}); // Reseta as seleções de avaliação
                setSugestao('');   // Reseta o campo de sugestões
            } else {
                const currentFuncaoIndex = funcoes.findIndex(funcao => funcao.id == funcaoId);
                if (currentFuncaoIndex < funcoes.length - 1) {
                    const nextFuncaoId = funcoes[currentFuncaoIndex + 1].id;
                    router.push(`/avaliar_funcionarios?funcaoId=${nextFuncaoId}`);
                } else {
                    window.location.href = '/confirmacao';
                }
            }
        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
            alert('Erro ao enviar avaliação. Tente novamente.');
        }
    };

    if (funcionarios.length === 0) return <p>Carregando funcionários...</p>;

    const funcionario = funcionarios[funcionarioIndex];

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Navbar />
            <h1 className="text-2xl font-bold mb-2 text-center">Avaliação: {funcionario.nome}</h1>
            <h2 className="text-xl mb-4 text-center">Função: {funcaoNome}</h2> {/* Exibe o nome da função */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                        <Label htmlFor={`avaliacao_${index + 1}`}>{index + 1}. Pergunta {index + 1}:</Label>
                        <Select name={`avaliacao_${index + 1}`} onValueChange={(value) => handleChange({ target: { name: `avaliacao_${index + 1}`, value } })} value={avaliacao[`avaliacao_${index + 1}`] || ''} required>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione uma opção" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Opções</SelectLabel>
                                    <SelectItem value="A">Sim</SelectItem>
                                    <SelectItem value="B">Não</SelectItem>
                                    <SelectItem value="C">Às Vezes</SelectItem>
                                    <SelectItem value="D">Necessita Melhorar</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                ))}

                <div className="flex flex-col space-y-2">
                    <Label htmlFor="sugestao">Sugestões:</Label>
                    <Textarea
                        id="sugestao"
                        value={sugestao}
                        onChange={handleSugestaoChange}
                        placeholder="Escreva suas sugestões aqui..."
                        rows={4}
                    />
                </div>

                <Button type="submit" className="w-full mt-4">
                    Próximo
                </Button>
            </form>
        </div>
    );
};

export default AvaliarFuncionarios;
