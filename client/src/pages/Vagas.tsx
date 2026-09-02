import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Briefcase, MapPin, Clock, Loader2, Wifi, Users, TrendingUp,
  Heart, Award, Coffee, Zap, ChevronRight, Star
} from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HERO_BG = '/images/bg/vagas-hero.webp';
const BENEFITS_BG = '/images/bg/vagas-benefits.webp';

const benefits = [
  {
    icon: <Wifi size={28} />,
    title: 'Internet Ultra Rápida',
    desc: 'Internet fibra óptica de alta velocidade para você e sua família, inclusa no pacote de benefícios.',
  },
  {
    icon: <Heart size={28} />,
    title: 'Plano de Saúde',
    desc: 'Cobertura médica completa para você e seus dependentes, com ampla rede credenciada em Campo Grande.',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Crescimento de Carreira',
    desc: 'Plano de carreira estruturado, treinamentos constantes e oportunidades reais de crescimento interno.',
  },
  {
    icon: <Coffee size={28} />,
    title: 'Ambiente Descontraído',
    desc: 'Escritório moderno com área de descanso, café e snacks à vontade, e clima de equipe unida.',
  },
  {
    icon: <Award size={28} />,
    title: 'Reconhecimento',
    desc: 'Programa de metas com premiações, bônus por desempenho e reconhecimento público das conquistas.',
  },
  {
    icon: <Users size={28} />,
    title: 'Time Incrível',
    desc: 'Trabalhe ao lado de pessoas apaixonadas por tecnologia e pelo impacto que geramos em Campo Grande.',
  },
];

const rotuloTipo: Record<string, string> = {
  clt: 'CLT',
  estagio: 'Estágio',
  temporario: 'Temporário',
  pj: 'PJ',
};

export default function Vagas() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    curriculoUrl: '',
  });

  const { data: jobs, isLoading } = trpc.vagas.listar.useQuery();
  const applyMutation = trpc.vagas.candidatar.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedJob) {
      toast.error('Escolha uma vaga antes de enviar.');
      return;
    }

    setIsApplying(true);
    try {
      await applyMutation.mutateAsync({
        vagaId: selectedJob,
        nome: formData.fullName,
        email: formData.email,
        telefone: formData.phone,
        curriculoUrl: formData.curriculoUrl || undefined,
        apresentacao: formData.coverLetter || undefined,
      });
      toast.success('Candidatura enviada. Entraremos em contato em breve.');
      setSelectedJob(null);
      setFormData({ fullName: '', email: '', phone: '', coverLetter: '', curriculoUrl: '' });
    } catch {
      toast.error('Erro ao enviar candidatura. Tente novamente.');
    } finally {
      setIsApplying(false);
    }
  };

  const selectedJobData = jobs?.find(j => j.id === selectedJob);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section
        className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Overlay escuro com gradiente verde */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B3E]/90 via-[#0D1B3E]/75 to-[#1a4a1a]/70" />

        {/* Partículas decorativas */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#3DD93D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#3DD93D]/15 rounded-full blur-2xl" />

        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#3DD93D]/20 border border-[#3DD93D]/40 text-[#3DD93D] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap size={14} />
            Venha fazer parte do time
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Trabalhe na{' '}
            <span className="text-[#3DD93D]">InternetMais</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Conectamos Campo Grande com fibra óptica de alta velocidade. Venha fazer parte
            do time que está transformando a internet na cidade.
          </p>

          {/* Stats rápidas */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[
              { value: '39+', label: 'Bairros Atendidos' },
              { value: '10k+', label: 'Clientes Satisfeitos' },
              { value: '100%', label: 'Fibra Óptica' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-[#3DD93D]">{stat.value}</div>
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFÍCIOS ── */}
      <section className="relative py-20 overflow-hidden">
        {/* Background com imagem e overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${BENEFITS_BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-[#0D1B3E]/92" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#3DD93D]/15 text-[#3DD93D] text-sm font-bold px-4 py-1.5 rounded-full mb-4 border border-[#3DD93D]/30">
              Por que trabalhar conosco?
            </span>
            <h2 className="text-4xl font-black text-white mb-4">
              Benefícios que fazem a diferença
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Aqui você encontra muito mais do que um emprego — encontra um lugar para crescer,
              se desenvolver e fazer parte de algo maior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group bg-white/5 hover:bg-[#3DD93D]/10 border border-white/10 hover:border-[#3DD93D]/50 rounded-2xl p-6 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 bg-[#3DD93D]/20 group-hover:bg-[#3DD93D]/30 rounded-xl flex items-center justify-center text-[#3DD93D] mb-4 transition-colors">
                  {b.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VAGAS ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#3DD93D]/15 text-[#3DD93D] text-sm font-bold px-4 py-1.5 rounded-full mb-4 border border-[#3DD93D]/30">
              Oportunidades abertas
            </span>
            <h2 className="text-4xl font-black text-[#0D1B3E] mb-4">
              Vagas Disponíveis
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Confira nossas oportunidades e candidate-se para a vaga que mais combina com você.
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-[#3DD93D]" size={48} />
              <p className="text-gray-500">Carregando vagas...</p>
            </div>
          ) : jobs && jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-[#3DD93D]/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Topo colorido */}
                  <div className="h-2 bg-gradient-to-r from-[#3DD93D] to-[#2BA82A]" />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Badge tipo */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 bg-[#3DD93D]/10 text-[#2BA82A] text-xs font-bold px-3 py-1 rounded-full">
                        <Briefcase size={11} />
                        {rotuloTipo[job.tipo] ?? job.tipo}
                      </span>
                      <Star size={16} className="text-gray-200 group-hover:text-[#3DD93D] transition-colors" />
                    </div>

                    {/* Título */}
                    <h3 className="text-xl font-black text-[#0D1B3E] mb-2 group-hover:text-[#2BA82A] transition-colors">
                      {job.titulo}
                    </h3>

                    {/* Localização */}
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-3">
                      <MapPin size={14} />
                      <span>{job.local ?? 'Campo Grande, MS'}</span>
                    </div>

                    {/* Salário */}
                    {job.salario && (
                      <div className="flex items-center gap-1.5 text-[#3DD93D] text-sm font-semibold mb-3">
                        <span className="text-gray-400">💰</span>
                        <span>{job.salario}</span>
                      </div>
                    )}

                    {/* Descrição */}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-6">
                      {job.descricao}
                    </p>

                    {/* CTA */}
                    <Button
                      onClick={() => setSelectedJob(job.id)}
                      className="w-full bg-[#3DD93D] hover:bg-[#2BA82A] text-white font-bold rounded-xl py-5 flex items-center justify-center gap-2 transition-all group-hover:shadow-lg group-hover:shadow-[#3DD93D]/25"
                    >
                      Candidatar-se
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-20 h-20 bg-[#3DD93D]/10 rounded-full flex items-center justify-center">
                <Briefcase size={36} className="text-[#3DD93D]" />
              </div>
              <h3 className="text-xl font-bold text-[#0D1B3E]">Nenhuma vaga no momento</h3>
              <p className="text-gray-500 text-center max-w-sm">
                Não encontramos vagas abertas agora, mas fique de olho! Novas oportunidades
                surgem com frequência.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-16 bg-gradient-to-r from-[#0D1B3E] to-[#1a3a1a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzREQ5M0QiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2Nmg2di02aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Não encontrou a vaga ideal?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Envie seu currículo para nosso banco de talentos. Quando surgir uma oportunidade
            que combine com você, entraremos em contato!
          </p>
          <a
            href="mailto:rh@internetmais.net"
            className="inline-flex items-center gap-2 bg-[#3DD93D] hover:bg-[#2BA82A] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-[#3DD93D]/30"
          >
            Enviar Currículo Espontâneo
            <ChevronRight size={18} />
          </a>
        </div>
      </section>

      <Footer />

      {/* ── DIALOG DE CANDIDATURA ── */}
      <Dialog open={selectedJob !== null} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-[#3DD93D]/15 rounded-xl flex items-center justify-center">
                <Briefcase size={20} className="text-[#3DD93D]" />
              </div>
              <div>
                <DialogTitle className="text-xl font-black text-[#0D1B3E]">
                  {selectedJobData?.title}
                </DialogTitle>
                <DialogDescription className="text-gray-500">
                  Preencha o formulário abaixo para enviar sua candidatura
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome */}
              <div className="md:col-span-2">
                <Label htmlFor="fullName" className="text-[#0D1B3E] font-semibold">
                  Nome Completo *
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Seu nome completo"
                  required
                  className="mt-1 focus-visible:ring-[#3DD93D]"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-[#0D1B3E] font-semibold">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  required
                  className="mt-1 focus-visible:ring-[#3DD93D]"
                />
              </div>

              {/* Telefone */}
              <div>
                <Label htmlFor="phone" className="text-[#0D1B3E] font-semibold">
                  Telefone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(67) 99999-9999"
                  required
                  className="mt-1 focus-visible:ring-[#3DD93D]"
                />
              </div>
            </div>

            {/* Currículo */}
            <div>
              <Label htmlFor="curriculoUrl" className="text-[#0D1B3E] font-semibold">
                Link do currículo
              </Label>
              <Input
                id="curriculoUrl"
                type="url"
                inputMode="url"
                placeholder="https://drive.google.com/... ou seu perfil no LinkedIn"
                value={formData.curriculoUrl}
                onChange={(e) => setFormData({ ...formData, curriculoUrl: e.target.value })}
                className="mt-1"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                Cole o link de um PDF no Drive, Dropbox ou do seu perfil no LinkedIn. Confira se o
                link está aberto para quem tem o endereço.
              </p>
            </div>

            {/* Carta de Apresentação */}
            <div>
              <Label htmlFor="coverLetter" className="text-[#0D1B3E] font-semibold">
                Carta de Apresentação{' '}
                <span className="text-gray-400 font-normal">(Opcional)</span>
              </Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                placeholder="Conte-nos por que você gostaria de trabalhar conosco e o que te diferencia dos demais candidatos..."
                rows={4}
                className="mt-1 focus-visible:ring-[#3DD93D] resize-none"
              />
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedJob(null)}
                className="flex-1 border-gray-200 hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isApplying}
                className="flex-1 bg-[#3DD93D] hover:bg-[#2BA82A] text-white font-bold"
              >
                {isApplying ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Candidatura
                    <ChevronRight className="ml-2" size={16} />
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
