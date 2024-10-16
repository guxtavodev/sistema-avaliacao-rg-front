import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import LoginDialog from '@/components/LoginDialog';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Componente principal de relatório
const Relatorio: React.FC = () => {
    const [autenticado, setAutenticado] = useState(false); // Controla o acesso ao relatório
    const [dados, setDados] = useState({ professores: [], funcionarios: [] });
    const [carregando, setCarregando] = useState(true);
    const [modalData, setModalData] = useState(null); // Armazena dados para o modal de perguntas
    const [modalTipo, setModalTipo] = useState<string | null>(null); // Identifica o tipo (professor/funcionário) no modal

    // Perguntas para os professores e funcionários
    const perguntasProfessores = [
        "Como você avalia o conhecimento do professor na matéria?",
        "O professor é claro em suas explicações?",
        "O professor respeita os alunos?",
        "O professor está disponível para tirar dúvidas?",
        "O professor se prepara para as aulas?",
        "A comunicação do professor é eficaz?",
        "O professor incentiva a participação dos alunos?",
        "O professor fornece feedback construtivo?",
        "O professor promove um ambiente de respeito?",
        "O professor utiliza recursos visuais?",
        "O professor realiza revisões de conteúdos?",
        "O professor valoriza as contribuições dos alunos?",
        "O professor administra bem o tempo de aula?",
        "O professor estimula o pensamento crítico dos alunos?"
    ];

    const perguntasFuncionarios = [
        "O funcionário é educado?",
        "O funcionário atende prontamente as solicitações?",
        "O funcionário é eficiente no que faz?",
        "O funcionário está disponível quando necessário?",
        "O funcionário é confiável?",
        "O funcionário contribui para um ambiente positivo?"
    ];

    useEffect(() => {
        if (autenticado) {
            const fetchDados = async () => {
                try {
                    const response = await axios.get('https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/relatorio');
                    setDados(response.data);
                    setCarregando(false);
                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                    alert('Erro ao carregar dados. Tente novamente.');
                }
            };
            fetchDados();
        }
    }, [autenticado]);

    const handleLoginSuccess = () => {
        setAutenticado(true);
    };

    const handleModalOpen = (item, tipo) => {
        setModalData(item);
        setModalTipo(tipo);
    };

    const handleModalClose = () => {
        setModalData(null);
        setModalTipo(null);
    };

    if (!autenticado) {
        return (
            <div className="flex justify-center mt-10">
                <LoginDialog onLoginSuccess={handleLoginSuccess} />
            </div>
        );
    }

    if (carregando) return <p>Carregando...</p>;

    return (
        <div className="p-6">
            <Navbar />
            <h1 className="text-3xl font-bold text-center mb-8">Relatório de Avaliações</h1>

            <div className="flex flex-wrap justify-around">
                {dados.professores.map((professor) => (
                    <Dialog key={professor.id}>
                        <DialogTrigger asChild>
                            <Button onClick={() => handleModalOpen(professor, "professor")} className="m-2">
                                {professor.nome} (Professor)
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{modalData?.nome}</DialogTitle>
                                <DialogDescription>Avaliação das respostas por pergunta:</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                {modalData && modalData.respostas && (modalTipo === "professor" ? perguntasProfessores : perguntasFuncionarios).map((pergunta, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="font-bold text-lg mb-2">{pergunta}</h3>
                                        <div className="grid grid-cols-4 gap-2 text-center">
                                            {['A', 'B', 'C', 'D'].map((letra) => (
                                                <div key={letra} className="bg-gray-100 p-2 rounded shadow">
                                                    <span className="font-bold">{letra}:</span> {modalData.respostas[`Pergunta ${index + 1}`]?.[letra] || 0}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <DialogFooter>
                                <Button onClick={handleModalClose}>Fechar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                ))}
                {dados.funcionarios.map((funcionario) => (
                    <Dialog key={funcionario.id}>
                        <DialogTrigger asChild>
                            <Button onClick={() => handleModalOpen(funcionario, "funcionario")} className="m-2">
                                {funcionario.nome} (Funcionário)
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{modalData?.nome}</DialogTitle>
                                <DialogDescription>Avaliação das respostas por pergunta:</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                {modalData && modalData.respostas && (modalTipo === "professor" ? perguntasProfessores : perguntasFuncionarios).map((pergunta, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="font-bold text-lg mb-2">{pergunta}</h3>
                                        <div className="grid grid-cols-4 gap-2 text-center">
                                            {['A', 'B', 'C', 'D'].map((letra) => (
                                                <div key={letra} className="bg-gray-100 p-2 rounded shadow">
                                                    <span className="font-bold">{letra}:</span> {modalData.respostas[`Pergunta ${index + 1}`]?.[letra] || 0}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <DialogFooter>
                                <Button onClick={handleModalClose}>Fechar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    );
};

export default Relatorio;
