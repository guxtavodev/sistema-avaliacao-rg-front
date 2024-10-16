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

const AvaliarProfessores = () => {
    const router = useRouter();
    const { turmaId } = router.query;
    const [professores, setProfessores] = useState([]);
    const [avaliacao, setAvaliacao] = useState({});
    const [professorIndex, setProfessorIndex] = useState(0);
    const [sugestao, setSugestao] = useState('');

    useEffect(() => {
        if (turmaId) {
            const fetchProfessores = async () => {
                try {
                    const response = await axios.get(`https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/turmas/${turmaId}/professores`);
                    setProfessores(response.data);
                } catch (error) {
                    console.error('Erro ao buscar professores:', error);
                    alert('Erro ao carregar professores. Tente novamente.');
                }
            };
            fetchProfessores();
        }
    }, [turmaId]);

    const handleChange = (e) => {
        setAvaliacao({ ...avaliacao, [e.target.name]: e.target.value });
    };

    const handleSugestaoChange = (e) => {
        setSugestao(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/avaliacao_professor', {
                professor_id: professores[professorIndex].id,
                turma_id: turmaId,
                ...avaliacao,
                sugestoes: sugestao,
            });

            if (professorIndex < professores.length - 1) {
                setProfessorIndex(professorIndex + 1);
                setAvaliacao({});
                setSugestao('');
            } else {
                window.location.href = '/confirmacao';
            }
        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
            alert('Erro ao enviar avaliação. Tente novamente.');
        }
    };

    if (professores.length === 0) return <p>Carregando professores...</p>;

    const professor = professores[professorIndex];

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4 text-center">Avaliação do Professor: {professor.nome}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {[...Array(14)].map((_, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                        <Label htmlFor={`avaliacao_${index + 1}`}>{index + 1}. Pergunta {index + 1}:</Label>
                        <Select name={`avaliacao_${index + 1}`} onValueChange={(value) => handleChange({ target: { name: `avaliacao_${index + 1}`, value } })} required>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione uma opção" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Opções</SelectLabel>
                                    <SelectItem value="A">Ótimo</SelectItem>
                                    <SelectItem value="B">Bom</SelectItem>
                                    <SelectItem value="C">Regular</SelectItem>
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

export default AvaliarProfessores;
