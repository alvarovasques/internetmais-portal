import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Briefcase, Users, Plus, Pencil, Trash2, Eye, ChevronDown, ChevronUp,
  MapPin, Clock, DollarSign, FileText, Phone, Mail, Download, LogOut,
  CheckCircle, XCircle, Clock3, Search
} from 'lucide-react';

type Tab = 'vagas' | 'candidaturas';
type JobType = 'full-time' | 'part-time' | 'contract' | 'temporary';
type AppStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected';

const JOB_TYPE_LABELS: Record<JobType, string> = {
  'full-time': 'Tempo Integral',
  'part-time': 'Meio Período',
  'contract': 'Contrato',
  'temporary': 'Temporário',
};

const STATUS_LABELS: Record<AppStatus, string> = {
  pending: 'Pendente',
  reviewed: 'Em Análise',
  accepted: 'Aprovado',
  rejected: 'Reprovado',
};

const STATUS_COLORS: Record<AppStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewed: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

interface JobFormData {
  title: string;
  description: string;
  requirements: string;
  salary: string;
  location: string;
  jobType: JobType;
}

const emptyForm: JobFormData = {
  title: '',
  description: '',
  requirements: '',
  salary: '',
  location: '',
  jobType: 'full-time',
};

export default function AdminRH() {
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('vagas');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<JobFormData>(emptyForm);
  const [expandedApp, setExpandedApp] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const utils = trpc.useUtils();

  // Queries
  const { data: jobs, isLoading: jobsLoading } = trpc.jobs.listAll.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });
  const { data: applications, isLoading: appsLoading } = trpc.applications.listAll.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // Mutations
  const createJob = trpc.jobs.create.useMutation({
    onSuccess: () => {
      utils.jobs.listAll.invalidate();
      toast.success('Vaga criada com sucesso!');
      setShowForm(false);
      setForm(emptyForm);
    },
    onError: (e) => toast.error('Erro ao criar vaga: ' + e.message),
  });

  const updateJob = trpc.jobs.update.useMutation({
    onSuccess: () => {
      utils.jobs.listAll.invalidate();
      toast.success('Vaga atualizada com sucesso!');
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
    },
    onError: (e) => toast.error('Erro ao atualizar vaga: ' + e.message),
  });

  const deleteJob = trpc.jobs.delete.useMutation({
    onSuccess: () => {
      utils.jobs.listAll.invalidate();
      toast.success('Vaga removida!');
    },
    onError: (e) => toast.error('Erro ao remover vaga: ' + e.message),
  });

  const toggleJobStatus = trpc.jobs.update.useMutation({
    onSuccess: () => utils.jobs.listAll.invalidate(),
  });

  const updateStatus = trpc.applications.updateStatus.useMutation({
    onSuccess: () => {
      utils.applications.listAll.invalidate();
      toast.success('Status atualizado!');
    },
    onError: (e) => toast.error('Erro: ' + e.message),
  });

  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => { window.location.href = '/'; },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#3DD93D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Acesso Restrito</h2>
          <p className="text-gray-500 mb-6">Esta área é exclusiva para administradores do RH.</p>
          <Button onClick={() => window.location.href = '/'} className="bg-[#3DD93D] hover:bg-[#2BA82A] text-white">
            Voltar ao Site
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateJob.mutate({ id: editingId, ...form });
    } else {
      createJob.mutate(form);
    }
  };

  const handleEdit = (job: any) => {
    setEditingId(job.id);
    setForm({
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      salary: job.salary || '',
      location: job.location,
      jobType: job.jobType,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredApps = applications?.filter(app =>
    app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/logo_internetmais_6b7e3e4a.png" alt="InternetMais" className="h-10" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Painel RH</h1>
              <p className="text-xs text-gray-500">Gestão de Vagas e Candidaturas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden sm:block">Olá, {user?.name || 'Admin'}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout.mutate()}
              className="flex items-center gap-2 text-gray-600"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{jobs?.filter(j => j.isActive).length || 0}</p>
                <p className="text-xs text-gray-500">Vagas Ativas</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{applications?.length || 0}</p>
                <p className="text-xs text-gray-500">Candidaturas</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock3 className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{applications?.filter(a => a.status === 'pending').length || 0}</p>
                <p className="text-xs text-gray-500">Pendentes</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{applications?.filter(a => a.status === 'accepted').length || 0}</p>
                <p className="text-xs text-gray-500">Aprovados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('vagas')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'vagas'
                ? 'bg-[#3DD93D] text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Vagas ({jobs?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('candidaturas')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'candidaturas'
                ? 'bg-[#3DD93D] text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Candidaturas ({applications?.length || 0})
          </button>
        </div>

        {/* VAGAS TAB */}
        {activeTab === 'vagas' && (
          <div>
            {/* Form */}
            {showForm && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-5">
                  {editingId ? 'Editar Vaga' : 'Nova Vaga'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Título da Vaga *</label>
                      <input
                        type="text"
                        required
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD93D]/30 focus:border-[#3DD93D]"
                        placeholder="Ex: Técnico de Redes"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Localização *</label>
                      <input
                        type="text"
                        required
                        value={form.location}
                        onChange={e => setForm({ ...form, location: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD93D]/30 focus:border-[#3DD93D]"
                        placeholder="Ex: Campo Grande, MS"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Contrato *</label>
                      <select
                        required
                        value={form.jobType}
                        onChange={e => setForm({ ...form, jobType: e.target.value as JobType })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD93D]/30 focus:border-[#3DD93D]"
                      >
                        <option value="full-time">Tempo Integral</option>
                        <option value="part-time">Meio Período</option>
                        <option value="contract">Contrato</option>
                        <option value="temporary">Temporário</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Salário (opcional)</label>
                      <input
                        type="text"
                        value={form.salary}
                        onChange={e => setForm({ ...form, salary: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD93D]/30 focus:border-[#3DD93D]"
                        placeholder="Ex: R$ 2.000 - R$ 3.000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição da Vaga *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD93D]/30 focus:border-[#3DD93D]"
                      placeholder="Descreva as responsabilidades e atividades da vaga..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos *</label>
                    <textarea
                      required
                      rows={3}
                      value={form.requirements}
                      onChange={e => setForm({ ...form, requirements: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD93D]/30 focus:border-[#3DD93D]"
                      placeholder="Liste os requisitos necessários..."
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={createJob.isPending || updateJob.isPending}
                      className="bg-[#3DD93D] hover:bg-[#2BA82A] text-white"
                    >
                      {createJob.isPending || updateJob.isPending ? 'Salvando...' : editingId ? 'Atualizar Vaga' : 'Criar Vaga'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Add button */}
            {!showForm && (
              <div className="flex justify-end mb-4">
                <Button
                  onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
                  className="bg-[#3DD93D] hover:bg-[#2BA82A] text-white flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Nova Vaga
                </Button>
              </div>
            )}

            {/* Jobs list */}
            {jobsLoading ? (
              <div className="text-center py-12 text-gray-500">Carregando vagas...</div>
            ) : jobs?.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Nenhuma vaga cadastrada</p>
                <p className="text-gray-400 text-sm mt-1">Clique em "Nova Vaga" para começar</p>
              </div>
            ) : (
              <div className="space-y-3">
                {jobs?.map(job => (
                  <div key={job.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-gray-800">{job.title}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${job.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {job.isActive ? 'Ativa' : 'Inativa'}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                            {JOB_TYPE_LABELS[job.jobType as JobType]}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                          {job.salary && <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>}
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {applications?.filter(a => a.jobId === job.id).length || 0} candidatura(s)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleJobStatus.mutate({ id: job.id, isActive: job.isActive ? 0 : 1 })}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                            job.isActive
                              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                        >
                          {job.isActive ? 'Desativar' : 'Ativar'}
                        </button>
                        <button
                          onClick={() => handleEdit(job)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Tem certeza que deseja remover esta vaga?')) {
                              deleteJob.mutate({ id: job.id });
                            }
                          }}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CANDIDATURAS TAB */}
        {activeTab === 'candidaturas' && (
          <div>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD93D]/30 focus:border-[#3DD93D] bg-white"
              />
            </div>

            {appsLoading ? (
              <div className="text-center py-12 text-gray-500">Carregando candidaturas...</div>
            ) : filteredApps?.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Nenhuma candidatura encontrada</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredApps?.map(app => (
                  <div key={app.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div
                      className="p-5 cursor-pointer"
                      onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-bold text-gray-800">{app.fullName}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[app.status as AppStatus]}`}>
                              {STATUS_LABELS[app.status as AppStatus]}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{app.email}</span>
                            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{app.phone}</span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5" />
                              {jobs?.find(j => j.id === app.jobId)?.title || `Vaga #${app.jobId}`}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {expandedApp === app.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                        </div>
                      </div>
                    </div>

                    {expandedApp === app.id && (
                      <div className="border-t border-gray-100 p-5 bg-gray-50">
                        {app.coverLetter && (
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Carta de Apresentação</p>
                            <p className="text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-100">{app.coverLetter}</p>
                          </div>
                        )}
                        <div className="flex items-center gap-3 flex-wrap">
                          {app.resumeUrl && (
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              Baixar Currículo
                            </a>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Status:</span>
                            <select
                              value={app.status}
                              onChange={e => updateStatus.mutate({ id: app.id, status: e.target.value as AppStatus })}
                              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD93D]/30 focus:border-[#3DD93D] bg-white"
                            >
                              <option value="pending">Pendente</option>
                              <option value="reviewed">Em Análise</option>
                              <option value="accepted">Aprovado</option>
                              <option value="rejected">Reprovado</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
