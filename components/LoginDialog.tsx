import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LoginDialog = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://d21088ab-1dd0-4a4c-98fd-e4e8fe3befc3-00-2p2ppzd4hne54.kirk.replit.dev/login', { email, senha });
            if (response.status === 200) {
                setErro('');
                onLoginSuccess(); // Callback ao fazer login com sucesso
            }
        } catch (error) {
            setErro('Credenciais inválidas! Tente novamente.');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Acessar Relatório</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Acesso Restrito</DialogTitle>
                    <DialogDescription>Entre com suas credenciais para acessar o relatório.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    {erro && <p className="text-red-500">{erro}</p>}
                </div>
                <DialogFooter>
                    <Button onClick={handleLogin}>Entrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
