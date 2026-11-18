import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: 'AXIOM | Engenharia de Software & Automação com IA',
  description: 'Descubra como implementar Inteligência Artificial na sua empresa. Substituímos processos manuais e tentativas amadoras por Agentes de IA e engenharia de software de alta performance.',
  keywords: [
    /* Gatilhos de Busca (Como Fazer / DIY frustrado) */
    'como utilizar IA na minha empresa',
    'como implementar inteligência artificial nos negócios',
    'como automatizar processos da empresa com IA',
    'como usar agentes de IA no trabalho',
    'ferramentas de IA para automatizar tarefas',
    
    /* Gatilhos de Solução B2B (Fundo de Funil) */
    'consultoria em inteligência artificial para empresas',
    'soluções corporativas em inteligência artificial',
    'automação de processos com agentes de IA',
    'desenvolvimento de software com IA',
    'engenharia de sistemas críticos',
    'redução de custos com IA'
  ],
  openGraph: {
    title: 'AXIOM | Transforme sua operação com Agentes de IA',
    description: 'Pare de tentar implementar IA sozinho. Entregamos engenharia de ponta para automatizar seus processos corporativos com segurança.',
    type: 'website',
    locale: 'pt_BR',
    // url: 'https://sua-url-aqui.com.br',
  },
  robots: {
    index: true,
    follow: true,
  }
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
