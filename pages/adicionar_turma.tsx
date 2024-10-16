import { useState } from 'react';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { Button } from '@/components/ui/button'; // Importando o botão do shadcn/ui
import { Input } from '@/components/ui/input'; // Importando o input do shadcn/ui
import { Label } from '@/components/ui/label'; // Importando o label do shadcn/ui
import styles from '../styles/Home.module.css'; // Importando os estilos
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdicionarTurma = () => {
    const [nome, setNome] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/add_turma', {
                nome,
            });
            alert(response.data.message);
            setNome('');
        } catch (error) {
            console.error(error);
            alert('Erro ao adicionar turma. Tente novamente.');
        }
    };

    return (
        <div className="p-4">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4">Adicionar Nova Turma</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label htmlFor="nome">Nome da Turma:</Label>
                    <Input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        placeholder="Digite o nome da turma"
                    />
                </div>
                <Button type="submit">Adicionar</Button>
            </form>
        </div>
    );
};

export default AdicionarTurma;
