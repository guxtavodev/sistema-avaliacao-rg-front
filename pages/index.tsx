import { NextPage } from "next";
import Head from "next/head";
import Navbar from "@/components/Navbar"; // Importando o componente de navegação
import { Button } from "@/components/ui/button"; // Importando o botão do shadcn/ui

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Avaliação Escolar</title>
        <meta name="description" content="Sistema de Avaliação Escolar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar /> {/* Componente de Navegação */}

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Avaliação de Ensino e Aprendizagem</h1>

        <p className="text-lg mb-4 text-center text-gray-600">
          Colégio Estadual Democrático Professor Rômulo Galvão - Elísio Medrado, Bahia
        </p>

        <p className="text-lg mb-6 text-center text-gray-600">
          Prezados(as) estudantes, este sistema permite que vocês realizem avaliações dos professores e funcionários da escola. A autoavaliação é um momento importante para o aprendizado.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
          <a href="/selecionar_turma">
            <Button variant="outline" className="w-full h-full p-4 flex flex-col items-center bg-white shadow-md hover:bg-gray-100 transition duration-200">
              <h2 className="text-xl font-semibold text-gray-800">Avaliar Professores &rarr;</h2>
              <p className="text-center text-gray-600">Inicie o processo de avaliação dos professores da sua turma.</p>
            </Button>
          </a>

          <a href="/avaliar_funcionarios?funcaoId=1">
            <Button variant="outline" className="w-full h-full p-4 flex flex-col items-center bg-white shadow-md hover:bg-gray-100 transition duration-200">
              <h2 className="text-xl font-semibold text-gray-800">Avaliar Funcionários &rarr;</h2>
              <p className="text-center text-gray-600">Participe da avaliação dos funcionários da escola.</p>
            </Button>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
