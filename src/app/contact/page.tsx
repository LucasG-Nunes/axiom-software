'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const contactFormSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  company: z.string().min(2, 'A empresa deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Por favor, insira um e-mail corporativo válido.'),
  whatsapp: z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Formato inválido. Ex: (11) 99999-9999'),
  budget: z.string().min(1, 'Por favor, selecione uma faixa de orçamento.'),
  challenge: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres.')
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    budget: '',
    challenge: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // Limpa o erro do campo quando o usuário digita
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }

    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validação com Zod
    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.issues.forEach(issue => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(formattedErrors);
      return; // Interrompe antes de chamar o Supabase
    }

    setIsSubmitting(true);

    const { error } = await supabase.from('interested_clients').insert([
      {
        full_name: formData.name,
        company_name: formData.company,
        corporate_email: formData.email,
        whatsapp: formData.whatsapp,
        budget: formData.budget,
        description: formData.challenge,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      console.error('Supabase insert error:', error);
      alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.');
      return;
    }

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-md w-full bg-[#111] border border-[#222] rounded-3xl p-10 flex flex-col items-center text-center"
        >
          {/* Cyan Neon Glow Check Icon */}
          <div className="relative mb-8">
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-50"
              style={{ backgroundColor: '#00FFE5' }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
            >
              <CheckCircle2
                className="relative w-20 h-20"
                style={{ color: '#00FFE5', filter: 'drop-shadow(0 0 20px rgba(0, 255, 229, 0.6))' }}
              />
            </motion.div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Solicitação Recebida com Sucesso
          </h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            Nossa equipe de engenharia analisará o seu desafio e entrará em contato em breve.
          </p>

          <Link 
            href="/" 
            className="px-8 py-4 bg-brand-cyan text-black font-semibold rounded-full hover:bg-cyan-400 transition-colors w-full text-center"
          >
            Voltar para a Home
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-3xl mb-12 flex justify-start">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar à Home</span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Inicie seu projeto com a <span className="text-brand-cyan">Axiom</span>
          </h1>
          <p className="text-lg text-zinc-400">
            Preencha os dados abaixo. Analisaremos sua demanda e retornaremos com os próximos passos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111] border border-[#222] rounded-3xl p-8 md:p-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300">Nome Completo</label>
              <input 
                required
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-transparent border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all ${errors.name ? 'border-red-500' : 'border-[#333] focus:border-transparent'}`}
                placeholder="Ex: João Silva"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm font-medium text-zinc-300">Nome da Empresa</label>
              <input 
                required
                type="text" 
                id="company" 
                name="company" 
                value={formData.company}
                onChange={handleChange}
                className={`w-full bg-transparent border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all ${errors.company ? 'border-red-500' : 'border-[#333] focus:border-transparent'}`}
                placeholder="Ex: Acme Corp"
              />
              {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">E-mail Corporativo</label>
              <input 
                required
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-transparent border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all ${errors.email ? 'border-red-500' : 'border-[#333] focus:border-transparent'}`}
                placeholder="joao@acme.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="whatsapp" className="block text-sm font-medium text-zinc-300">WhatsApp</label>
              <input 
                required
                type="tel" 
                id="whatsapp" 
                name="whatsapp" 
                value={formData.whatsapp}
                onChange={handleChange}
                className={`w-full bg-transparent border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all ${errors.whatsapp ? 'border-red-500' : 'border-[#333] focus:border-transparent'}`}
                placeholder="(11) 99999-9999"
              />
              {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="budget" className="block text-sm font-medium text-zinc-300">Orçamento Estimado</label>
            <select 
              required
              id="budget" 
              name="budget" 
              value={formData.budget}
              onChange={handleChange}
              className={`w-full bg-[#111] border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all appearance-none ${errors.budget ? 'border-red-500' : 'border-[#333] focus:border-transparent'}`}
            >
              <option value="" disabled>Selecione uma faixa</option>
              <option value="<10k">&lt; R$ 10.000</option>
              <option value="10k-50k">R$ 10.000 - R$ 50.000</option>
              <option value=">50k">&gt; R$ 50.000</option>
            </select>
            {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="challenge" className="block text-sm font-medium text-zinc-300">Descrição Completa do Desafio</label>
            <textarea 
              required
              id="challenge" 
              name="challenge" 
              rows={5}
              value={formData.challenge}
              onChange={handleChange}
              className={`w-full bg-transparent border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all resize-none ${errors.challenge ? 'border-red-500' : 'border-[#333] focus:border-transparent'}`}
              placeholder="Descreva o objetivo do projeto, funcionalidades principais e prazo desejado..."
            ></textarea>
            {errors.challenge && <p className="text-red-500 text-xs mt-1">{errors.challenge}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 bg-brand-cyan text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando solicitação...
              </>
            ) : (
              "Enviar Solicitação"
            )}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
