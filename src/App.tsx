import { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Bot, CalendarDays,
  Check, ChevronDown, ChevronRight, CircleHelp, Compass, FileText, Filter,
  Hash, Instagram, LayoutDashboard, Lightbulb, Link2, Menu, MessageCircle,
  MoreHorizontal, Plus, Search, Send, Settings2, Sparkles, Target, TrendingUp,
  Users, WandSparkles, X, Facebook, MessageSquareText
} from "lucide-react";

type Section = "Visão geral" | "Conversas" | "Radar" | "Conteúdo" | "Contatos" | "Agenda" | "Integrações";

const navItems: { label: Section; icon: typeof LayoutDashboard; hint?: string }[] = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Conversas", icon: MessageCircle, hint: "3" },
  { label: "Radar", icon: Compass },
  { label: "Conteúdo", icon: FileText },
  { label: "Contatos", icon: Users },
  { label: "Agenda", icon: CalendarDays },
  { label: "Integrações", icon: Link2 }
];

const conversations = [
  { initials: "MA", name: "Mariana Alves", platform: "Instagram", color: "pink", time: "há 4 min", text: "Oi! Vi seu conteúdo sobre marketing e queria saber mais.", tag: "Novo contato", unread: true },
  { initials: "RC", name: "Rafael Costa", platform: "WhatsApp", color: "green", time: "há 18 min", text: "Você consegue me enviar os detalhes da proposta?", tag: "Oportunidade", unread: true },
  { initials: "JP", name: "João Pedro", platform: "Facebook", color: "blue", time: "há 1 h", text: "Obrigado pela ajuda! Vou analisar e te retorno.", tag: "Aguardando", unread: false }
];

const trends = [
  { title: "Conteúdo curto com dicas práticas", category: "Formato em alta", score: 94, volume: "+28%" },
  { title: "Bastidores e rotina real", category: "Tema em crescimento", score: 86, volume: "+19%" },
  { title: "Antes e depois / transformação", category: "Engajamento", score: 78, volume: "+14%" }
];

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "Instagram") return <Instagram size={14} />;
  if (platform === "Facebook") return <Facebook size={14} />;
  return <MessageCircle size={14} />;
}

export default function App() {
  const [section, setSection] = useState<Section>("Visão geral");
  const [query, setQuery] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [draft, setDraft] = useState("3 ideias simples para melhorar sua presença digital esta semana...");
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredConversations = useMemo(
    () => conversations.filter((item) => (item.name + item.text + item.platform).toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const chooseSection = (next: Section) => {
    setSection(next);
    setMobileNav(false);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Sparkles size={21} /></div>
          <div><strong>social<span>ai</span></strong><small>INTELLIGENCE HUB</small></div>
          <button className="icon-button mobile-close" onClick={() => setMobileNav(false)} aria-label="Fechar menu"><X size={18}/></button>
        </div>
        <div className="workspace-switch">
          <div className="workspace-avatar">S</div>
          <div className="workspace-copy"><strong>Meu espaço</strong><small>Plano inicial</small></div>
          <ChevronDown size={15} />
        </div>
        <div className="nav-label">PLATAFORMA</div>
        <nav className="main-nav">
          {navItems.map(({ label, icon: Icon, hint }) => (
            <button key={label} className={`nav-item ${section === label ? "active" : ""}`} onClick={() => chooseSection(label)}>
              <Icon size={18} strokeWidth={1.8}/><span>{label}</span>{hint && <b>{hint}</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon"><WandSparkles size={17}/></div>
            <strong>Mais inteligência.</strong>
            <p>Conecte seus canais para desbloquear análises reais.</p>
            <button onClick={() => chooseSection("Integrações")}>Configurar canais <ArrowRight size={14}/></button>
          </div>
          <button className="nav-item"><Settings2 size={18}/><span>Configurações</span></button>
          <div className="profile-row"><div className="profile-avatar">W</div><div><strong>Meu perfil</strong><small>Administrador</small></div><MoreHorizontal size={18}/></div>
        </div>
      </aside>

      {mobileNav && <button className="mobile-scrim" onClick={() => setMobileNav(false)} aria-label="Fechar menu"/>}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setMobileNav(true)} aria-label="Abrir menu"><Menu size={20}/></button>
            <div className="breadcrumb">Workspace <ChevronRight size={14}/> <strong>{section}</strong></div>
          </div>
          <div className="topbar-actions">
            <div className="search-box"><Search size={16}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar conversas e contatos..."/><kbd>⌘ K</kbd></div>
            <button className="icon-button notification-button" onClick={() => setNotice("Você está em dia. Não há novos alertas.")} aria-label="Notificações"><Bell size={18}/><i/></button>
            <div className="top-avatar">W</div>
          </div>
        </header>

        <div className="page-content">
          <div className="welcome-row">
            <div>
              <div className="eyebrow"><span className="live-dot"/> CENTRAL DE COMANDO</div>
              <h1>{section === "Visão geral" ? "Bom dia. Vamos movimentar suas redes." : section}</h1>
              <p className="page-subtitle">{section === "Visão geral" ? "Sua presença digital, conversas e oportunidades em um só lugar." : "Organize suas atividades e transforme dados em decisões."}</p>
            </div>
            <button className="primary-button" onClick={() => setShowComposer(true)}><Plus size={17}/> Criar conteúdo</button>
          </div>

          {notice && <div className="notice"><Check size={16}/>{notice}<button onClick={() => setNotice("")}><X size={15}/></button></div>}

          {section === "Visão geral" && <>
            <div className="connection-banner">
              <div className="connection-symbol"><Link2 size={19}/></div>
              <div className="connection-copy"><strong>Seu Social AI está pronto para receber seus canais</strong><span>Conecte suas contas oficiais para trocar os dados demonstrativos por informações reais.</span></div>
              <button onClick={() => chooseSection("Integrações")}>Conectar canais <ArrowRight size={15}/></button>
              <button className="banner-close" onClick={(e) => e.currentTarget.parentElement?.remove()} aria-label="Fechar aviso"><X size={16}/></button>
            </div>

            <div className="stats-grid">
              <StatCard label="Conversas acompanhadas" value="128" delta="+12,8%" icon={<MessageCircle size={18}/>} trend="up" note="vs. período anterior"/>
              <StatCard label="Pessoas alcançadas" value="8.4k" delta="+8,2%" icon={<Users size={18}/>} trend="up" note="vs. período anterior"/>
              <StatCard label="Oportunidades" value="24" delta="+4 novas" icon={<Target size={18}/>} trend="up" note="neste período"/>
              <StatCard label="Conteúdos planejados" value="12" delta="3 agendados" icon={<CalendarDays size={18}/>} trend="neutral" note="para os próximos dias"/>
            </div>

            <div className="content-grid">
              <section className="panel conversation-panel">
                <div className="panel-heading"><div><h2>Conversas recentes</h2><p>Contexto em um só lugar</p></div><button className="text-action" onClick={() => chooseSection("Conversas")}>Ver todas <ArrowRight size={14}/></button></div>
                <div className="conversation-list">
                  {filteredConversations.map((item) => <div className="conversation-row" key={item.name}>
                    <div className={`contact-avatar ${item.color}`}>{item.initials}</div>
                    <div className="conversation-main"><div className="conversation-title"><strong>{item.name}</strong><span>{item.time}</span></div><p>{item.text}</p><div className="conversation-meta"><span className="platform-tag"><PlatformIcon platform={item.platform}/>{item.platform}</span><span className="status-tag">{item.tag}</span></div></div>
                    {item.unread && <i className="unread-dot"/>}
                  </div>)}
                  {filteredConversations.length === 0 && <div className="empty-state">Nenhuma conversa corresponde à busca.</div>}
                </div>
              </section>

              <section className="panel radar-panel">
                <div className="panel-heading"><div><h2>Radar de tendências</h2><p>Sinais públicos em destaque</p></div><span className="demo-tag">DEMO</span></div>
                <div className="radar-summary"><div className="radar-orb"><Activity size={21}/></div><div><strong>O que está ganhando atenção</strong><span>Exemplos ilustrativos para demonstrar o radar.</span></div></div>
                <div className="trend-list">{trends.map((trend) => <div className="trend-row" key={trend.title}><div className="trend-copy"><strong>{trend.title}</strong><span>{trend.category}</span><div className="trend-track"><i style={{width: trend.score + "%"}}/></div></div><div className="trend-score"><b>{trend.score}</b><span>{trend.volume}</span></div></div>)}</div>
                <button className="panel-footer-action" onClick={() => chooseSection("Radar")}>Explorar radar completo <ArrowRight size={14}/></button>
              </section>

              <section className="panel performance-panel">
                <div className="panel-heading"><div><h2>Visão de desempenho</h2><p>Atividade ilustrativa dos últimos 7 dias</p></div><button className="select-button">Últimos 7 dias <ChevronDown size={14}/></button></div>
                <div className="chart-legend"><span><i className="legend-purple"/> Engajamento</span><span><i className="legend-blue"/> Conversas</span></div>
                <div className="chart-area"><div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-bars">{[42,64,52,78,60,88,72].map((v,i)=><div className="bar-group" key={i}><div className="bars"><i style={{height:v+"%"}}/><b style={{height:(v*.62)+"%"}}/></div><span>{["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"][i]}</span></div>)}</div></div>
              </section>

              <section className="panel assistant-panel">
                <div className="assistant-glow"><Bot size={22}/></div>
                <div className="assistant-content"><div className="assistant-label"><Sparkles size={13}/> SOCIAL AI ASSISTANT</div><h2>Uma ideia para hoje</h2><p>Que tal transformar uma dúvida frequente do seu público em um carrossel com 5 dicas práticas?</p><button onClick={() => {setDraft("Carrossel: 5 dicas práticas para resolver uma dúvida frequente do seu público. Estruture em capa, 5 dicas e chamada para ação.");setShowComposer(true);}}>Criar com IA <ArrowRight size={14}/></button></div>
                <Lightbulb className="assistant-watermark" size={76}/>
              </section>
            </div>
          </>}

          {section !== "Visão geral" && <SectionView section={section} onCompose={() => setShowComposer(true)} onConnect={() => setNotice("As integrações oficiais serão configuradas na próxima etapa.")} conversations={filteredConversations}/>}
          <footer className="page-footer"><span>Social AI <b>•</b> Inteligência social com controle humano</span><span>Versão 0.1.0 <b>•</b> Dados demonstrativos</span></footer>
        </div>
      </main>

      {showComposer && <div className="modal-backdrop" onClick={() => setShowComposer(false)}><div className="composer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-heading"><div><div className="eyebrow"><Sparkles size={13}/> ESTÚDIO DE CONTEÚDO</div><h2>Rascunho inteligente</h2></div><button className="icon-button" onClick={() => setShowComposer(false)}><X size={19}/></button></div>
        <p className="modal-description">Crie e revise sua ideia. Nada será publicado automaticamente.</p>
        <label className="field-label">IDEIA OU TEXTO DO CONTEÚDO</label><textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={6}/>
        <div className="composer-options"><span><Instagram size={15}/> Instagram</span><span><Facebook size={15}/> Facebook</span><span><MessageSquareText size={15}/> WhatsApp</span></div>
        <div className="modal-actions"><button className="secondary-button" onClick={() => setDraft("")}>Limpar</button><button className="primary-button" onClick={() => {setNotice("Rascunho salvo nesta sessão. A publicação ainda exige integração e sua confirmação.");setShowComposer(false);}}>Salvar rascunho <Check size={16}/></button></div>
      </div></div>}
    </div>
  );
}

function StatCard({label,value,delta,icon,trend,note}:{label:string;value:string;delta:string;icon:React.ReactNode;trend:"up"|"neutral";note:string}) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><i>{icon}</i></div><div className="stat-value">{value}</div><div className="stat-bottom"><span className={trend==="up"?"positive":"neutral"}>{trend==="up"?<ArrowUpRight size={14}/>:<CalendarDays size={13}/>} {delta}</span><small>{note}</small></div></div>;
}

function SectionView({section,onCompose,onConnect,conversations}:{section:Section;onCompose:()=>void;onConnect:()=>void;conversations:typeof conversations}) {
  if (section === "Conversas") return <div className="panel section-panel"><div className="panel-heading"><div><h2>Caixa de entrada unificada</h2><p>Prévia com conversas demonstrativas — conecte seus canais para importar dados autorizados.</p></div><span className="demo-tag">DEMO</span></div>{conversations.map(c=><div className="conversation-row" key={c.name}><div className={`contact-avatar ${c.color}`}>{c.initials}</div><div className="conversation-main"><div className="conversation-title"><strong>{c.name}</strong><span>{c.platform} · {c.time}</span></div><p>{c.text}</p><div className="conversation-meta"><span className="status-tag">{c.tag}</span></div></div><button className="secondary-button compact" onClick={onCompose}>Preparar resposta</button></div>)}</div>;
  if (section === "Radar") return <div className="section-cards"><div className="panel section-panel"><div className="panel-heading"><div><h2>Radar de assuntos</h2><p>Descubra temas e formatos com sinais de interesse em fontes públicas.</p></div><Compass size={20}/></div>{trends.map(t=><div className="radar-detail" key={t.title}><div><strong>{t.title}</strong><p>{t.category} · indicador demonstrativo</p></div><b>{t.score}/100</b></div>)}<p className="disclaimer">Os indicadores acima são dados fictícios de demonstração, não tendências medidas em tempo real.</p></div><div className="panel section-panel"><h2>Radar local</h2><p className="muted">Escolha uma cidade e temas para acompanhar fontes públicas, eventos e comunidades.</p><div className="field-label">LOCALIDADE</div><input className="text-input" defaultValue="Teresina, PI"/><div className="field-label">TEMAS</div><input className="text-input" placeholder="Ex.: tecnologia, gastronomia, eventos"/><button className="primary-button full-button" onClick={onConnect}>Preparar monitoramento <ArrowRight size={15}/></button></div></div>;
  if (section === "Conteúdo") return <div className="section-cards"><div className="panel section-panel"><div className="panel-heading"><div><h2>Estúdio de conteúdo</h2><p>Planeje publicações e transforme ideias em formatos prontos para revisão.</p></div><WandSparkles size={20}/></div><div className="content-template"><span>CARROSSEL</span><strong>5 dicas que seu público precisa conhecer</strong><p>Uma sequência educativa com capa, dicas e chamada para ação.</p><button className="text-action" onClick={onCompose}>Abrir rascunho <ArrowRight size={14}/></button></div><div className="content-template"><span>REELS / VÍDEO CURTO</span><strong>Uma pergunta, uma resposta objetiva</strong><p>Roteiro de 30 segundos com gancho, explicação e encerramento.</p><button className="text-action" onClick={onCompose}>Criar roteiro <ArrowRight size={14}/></button></div></div><div className="panel section-panel"><h2>Publicação responsável</h2><p className="muted">Todo conteúdo passa por revisão. A publicação real só será liberada após conectar uma conta elegível e confirmar cada ação.</p><button className="primary-button full-button" onClick={onCompose}><Plus size={16}/> Novo conteúdo</button></div></div>;
  if (section === "Contatos") return <div className="panel section-panel"><div className="panel-heading"><div><h2>Relacionamentos</h2><p>Organize contatos que você adicionou ou que autorizaram o uso dos dados.</p></div><button className="primary-button" onClick={onCompose}><Plus size={15}/> Adicionar nota</button></div><div className="empty-large"><Users size={28}/><strong>Sua rede começa aqui</strong><span>Conecte fontes autorizadas ou cadastre contatos manualmente. Não fazemos coleta de dados privados.</span></div></div>;
  if (section === "Agenda") return <div className="panel section-panel"><div className="panel-heading"><div><h2>Calendário editorial</h2><p>Organize suas próximas publicações.</p></div><button className="primary-button" onClick={onCompose}><Plus size={15}/> Planejar conteúdo</button></div><div className="calendar-empty"><CalendarDays size={30}/><strong>Nenhuma publicação agendada</strong><span>Seus rascunhos e agendamentos aparecerão aqui.</span></div></div>;
  return <div className="section-cards"><div className="panel section-panel"><div className="panel-heading"><div><h2>Conecte seus canais</h2><p>Integrações oficiais, com permissões e escopos transparentes.</p></div><Link2 size={20}/></div><IntegrationRow icon={<Instagram/>} name="Instagram" detail="Contas profissionais elegíveis via Meta Graph API" color="pink"/><IntegrationRow icon={<Facebook/>} name="Facebook" detail="Páginas e permissões aplicáveis" color="blue"/><IntegrationRow icon={<MessageCircle/>} name="WhatsApp Business" detail="WhatsApp Business Platform / Cloud API" color="green"/></div><div className="panel section-panel"><h2>Segurança e permissões</h2><ul className="security-list"><li><Check/> Credenciais armazenadas somente no servidor.</li><li><Check/> Acesso limitado às permissões concedidas.</li><li><Check/> Aprovação humana antes de enviar ou publicar.</li><li><Check/> Sem mensagens em massa ou coleta privada.</li></ul><p className="disclaimer">As conexões ainda não estão ativas. Esta tela é a estrutura inicial do produto.</p></div></div>;
}

function IntegrationRow({icon,name,detail,color}:{icon:React.ReactNode;name:string;detail:string;color:string}) {
  return <div className="integration-row"><div className={`integration-icon ${color}`}>{icon}</div><div><strong>{name}</strong><span>{detail}</span></div><span className="not-connected">Não conectado</span></div>;
}