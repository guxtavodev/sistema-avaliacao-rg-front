import { useState } from 'react';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import styles from '../styles/Home.module.css'; // Importando os estilos

const AdicionarFuncao = () => {
    const [nome, setNome] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/add_funcao', {
                nome,
            });
            alert(response.data.message);
            setNome(''); // Limpa o campo após adicionar
        } catch (error) {
            console.error('Erro ao adicionar função:', error);
            alert('Erro ao adicionar função. Tente novamente.');
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Adicionar Nova Função</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome da Função:</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default AdicionarFuncao;
