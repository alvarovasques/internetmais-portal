'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, MapPin, DollarSign, FileUp, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Vagas() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null as File | null,
  });

  const { data: jobs, isLoading } = trpc.jobs.list.useQuery();
  const applyMutation = trpc.jobs.createApplication.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedJob || !formData.resume) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    setIsApplying(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = (event.target?.result as string)?.split(',')[1];
        
        const result = await applyMutation.mutateAsync({
          jobId: selectedJob,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          resumeBase64: base64,
          resumeFileName: formData.resume!.name,
          coverLetter: formData.coverLetter,
        });

        toast.success('Candidatura enviada com sucesso!');
        setSelectedJob(null);
        setFormData({ fullName: '', email: '', phone: '', coverLetter: '', resume: null });
      };
      reader.readAsDataURL(formData.resume);
    } catch (error) {
      toast.error('Erro ao enviar candidatura');
    } finally {
      setIsApplying(false);
    }
  };

  const selectedJobData = jobs?.find(j => j.id === selectedJob);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1B3E] to-white">
      {/* Header */}
      <div className="bg-[#0D1B3E] text-white py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-black mb-4">Trabalhe Conosco</h1>
          <p className="text-lg text-white/80">
            Faça parte do time InternetMais e ajude a conectar Campo Grande
          </p>
        </div>
      </div>

      {/* Jobs List */}
      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-[#3DD93D]" size={40} />
          </div>
        ) : jobs && jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedJob(job.id)}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription>{job.location}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase size={16} />
                    <span className="capitalize">{job.jobType.replace('-', ' ')}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign size={16} />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
                  <Button className="w-full bg-[#3DD93D] hover:bg-[#2BA82A] text-white">
                    Candidatar-se
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhuma vaga disponível no momento</p>
          </div>
        )}
      </div>

      {/* Application Dialog */}
      <Dialog open={selectedJob !== null} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Candidatar-se para: {selectedJobData?.title}</DialogTitle>
            <DialogDescription>
              Preencha o formulário abaixo para se candidatar à vaga
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName">Nome Completo *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Seu nome completo"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu.email@exemplo.com"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(67) 99999-9999"
                required
              />
            </div>

            {/* Resume Upload */}
            <div>
              <Label htmlFor="resume">Currículo (PDF) *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileUp className="mx-auto mb-2 text-gray-400" size={32} />
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="resume" className="cursor-pointer">
                  <span className="text-sm text-gray-600">
                    {formData.resume ? formData.resume.name : 'Clique para selecionar seu currículo (PDF)'}
                  </span>
                </label>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <Label htmlFor="coverLetter">Carta de Apresentação (Opcional)</Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                placeholder="Conte-nos por que você gostaria de trabalhar conosco..."
                rows={4}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedJob(null)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isApplying}
                className="flex-1 bg-[#3DD93D] hover:bg-[#2BA82A] text-white"
              >
                {isApplying ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Enviando...
                  </>
                ) : (
                  'Enviar Candidatura'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
