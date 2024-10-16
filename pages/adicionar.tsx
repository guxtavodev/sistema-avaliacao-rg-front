import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import styles from '../styles/Home.module.css'; // Importando os estilos

const Adicionar = () => {
    const [nome, setNome] = useState('');
    const [funcaoId, setFuncaoId] = useState('');
    const [tipo, setTipo] = useState<'professor' | 'funcionario' | 'gestor'>('professor');
    const [turmas, setTurmas] = useState<{ id: string; nome: string }[]>([]);
    const [selectedTurmas, setSelectedTurmas] = useState<string[]>([]);
    const [funcoes, setFuncoes] = useState<{ id: string; nome: string }[]>([]);

    useEffect(() => {
        // Carregar turmas disponíveis
        const fetchTurmas = async () => {
            try {
                const response = await axios.get('https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/turmas');
                setTurmas(response.data);
            } catch (error) {
                console.error('Erro ao carregar turmas:', error);
                alert('Erro ao carregar turmas. Tente novamente.');
            }
        };

        // Carregar funções disponíveis
        const fetchFuncoes = async () => {
            try {
                const response = await axios.get('https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/funcoes');
                setFuncoes(response.data);
            } catch (error) {
                console.error('Erro ao carregar funções:', error);
                alert('Erro ao carregar funções. Tente novamente.');
            }
        };

        fetchTurmas();
        fetchFuncoes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let endpoint = '';
            let payload: any = { nome };

            if (tipo === 'professor') {
                endpoint = 'https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/add_professor';
                payload.turmas = selectedTurmas; // Adiciona turmas selecionadas
            } else if (tipo === 'funcionario') {
                endpoint = 'https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/add_funcionario';
                payload.funcao_id = funcaoId; // Adiciona função do funcionário
            } else if (tipo === 'gestor') {
                endpoint = 'https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/add_gestor';
                payload.funcao_id = funcaoId; // Adiciona função do gestor
            }

            const response = await axios.post(endpoint, payload);
            console.log(response.data)
            alert(response.data.message);
            setNome('');
            setFuncaoId('');
            setSelectedTurmas([]);
        } catch (error) {
            console.error('Erro ao adicionar:', error);
            alert('Erro ao adicionar. Tente novamente.');
        }
    };

    const handleTurmaChange = (e) => {
        const value = e.target.value;
        setSelectedTurmas((prev) => {
            if (prev.includes(value)) {
                return prev.filter((turma) => turma !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    return (
        <div>
            <Navbar />
            <h1>Adicionar Novo {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                {tipo === 'funcionario' || tipo === 'gestor' ? (
                    <>
                        <label htmlFor="funcao">Função:</label>
                        <select id="funcao" value={funcaoId} onChange={(e) => setFuncaoId(e.target.value)} required>
                            <option value="">Selecione uma função</option>
                            {funcoes.map((funcao) => (
                                <option key={funcao.id} value={funcao.id}>
                                    {funcao.nome}
                                </option>
                            ))}
                        </select>
                    </>
                ) : (
                    <>
                        <label htmlFor="turmas">Turmas:</label>
                        <select id="turmas" multiple value={selectedTurmas} onChange={handleTurmaChange}>
                            {turmas.map((turma) => (
                                <option key={turma.id} value={turma.id}>
                                    {turma.nome}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                <label htmlFor="tipo">Tipo:</label>
                <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value as any)}>
                    <option value="professor">Professor</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="gestor">Gestor</option>
                </select>

                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default Adicionar;
