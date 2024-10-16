import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button'; // Importando o botão do shadcn/ui

const Confirmacao = () => {
  const router = useRouter();

  const handleVerificarFuncionarios = () => {
    router.push('/selecionar_funcao'); // Redireciona para a página de verificação de funcionários
  };

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Confirmação</h1>
      <p>A sua avaliação foi registrada com sucesso!</p>
      <div className="mt-4">
        <Button onClick={handleVerificarFuncionarios}>Ir para Verificação de Funcionários</Button>
      </div>
    </div>
  );
};

export default Confirmacao;
