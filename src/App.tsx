import { useState } from 'react'

type Screen = 'login' | 'register' | 'home' | 'map' | 'question' | 'feedback' | 'profile' | 'ranking'

const phases = [
  { id: 1, name: 'Interpretação\nde Texto', color: '#22c55e', stars: 3, locked: false },
  { id: 2, name: 'Gramática', color: '#7c3aed', stars: 2, locked: false },
  { id: 3, name: 'Figuras de\nLinguagem', color: '#6366f1', stars: 2, locked: false },
  { id: 4, name: 'Literatura\nBrasileira', color: '#f59e0b', stars: 2, locked: false },
  { id: 5, name: 'Simulado\nFinal', color: '#64748b', stars: 0, locked: true },
]

const questions = [
  {
    phase: 'Fase 1: Interpretação de Texto',
    num: 1,
    total: 10,
    text: '"O avanço tecnológico trouxe muitos benefícios para a sociedade, mas também revelou desafios importantes. É preciso saber utilizá-lo de forma consciente para promover um futuro melhor para todos."',
    question: 'Qual é a ideia principal do texto?',
    options: [
      { id: 'A', text: 'O futuro depende exclusivamente da tecnologia.' },
      { id: 'B', text: 'A tecnologia trouxe benefícios e desafios à sociedade.' },
      { id: 'C', text: 'Os desafios são mais importantes que os benefícios.' },
      { id: 'D', text: 'A tecnologia deve ser evitada pela sociedade.' },
    ],
    correct: 'B',
    explanation:
      'A ideia principal de um texto é o assunto central que o autor deseja comunicar. No texto, o autor destaca que a tecnologia trouxe benefícios, mas também desafios, e que deve ser usada de forma consciente para um futuro melhor.',
  },
]

const leaderboard = [
  { pos: 1, name: 'Maria Eduarda', level: 8, score: 1250, isMe: false },
  { pos: 2, name: 'João Pedro', level: 7, score: 1120, isMe: false },
  { pos: 3, name: 'Lucas Almeida', level: 6, score: 980, isMe: false },
  { pos: 4, name: 'Ana Clara', level: 6, score: 870, isMe: false },
  { pos: 5, name: 'Você (Lucas)', level: 4, score: 320, isMe: true },
]

const medals: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

function StarRow({ count, total = 3 }: { count: number; total?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={i < count ? 'text-amber-400' : 'text-white/20'} style={{ fontSize: 14 }}>
          ★
        </span>
      ))}
    </div>
  )
}

function StarsBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: (i % 3) + 1,
            height: (i % 3) + 1,
            top: `${(i * 7.3) % 100}%`,
            left: `${(i * 13.7) % 100}%`,
            opacity: 0.08 + (i % 5) * 0.05,
          }}
        />
      ))}
    </div>
  )
}

function AuthLogo() {
  return (
    <div className="text-center">
      <div
        className="font-display font-bold leading-none"
        style={{
          fontSize: 'clamp(32px, 10vw, 48px)',
          background: 'linear-gradient(135deg, #f59e0b, #fde68a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        DESAFIO
      </div>
      <div
        className="font-display font-bold leading-none"
        style={{
          fontSize: 'clamp(32px, 10vw, 48px)',
          background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        VESTIBULAR
      </div>
      <div className="text-white/50 text-xs mt-1 tracking-wide">Aprenda. Pratique. Conquiste.</div>
    </div>
  )
}

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
}: {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  icon: string
}) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-white/70">{label}</label>
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all focus-within:ring-2"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          ringColor: '#7c3aed',
        }}
      >
        <span className="text-white/40 text-base">{icon}</span>
        <input
          type={isPassword && show ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none"
          autoComplete={isPassword ? 'current-password' : type === 'email' ? 'email' : 'off'}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="text-white/30 hover:text-white/60 transition-colors text-sm"
          >
            {show ? '🙈' : '👁️'}
          </button>
        )}
      </div>
    </div>
  )
}

function LoginScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Preencha todos os campos.')
      return
    }
    if (!email.includes('@')) {
      setError('E-mail inválido.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onNav('home')
    }, 1200)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative px-5 py-10"
      style={{ background: 'radial-gradient(ellipse at 60% 30%, #1e0f5c 0%, #0d0a2e 70%)' }}
    >
      <StarsBg />

      <div className="relative z-10 w-full max-w-sm flex flex-col gap-8">
        {/* Logo + icon */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #4338ca)',
              boxShadow: '0 8px 32px rgba(124,58,237,0.5)',
            }}
          >
            🎓
          </div>
          <AuthLogo />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <InputField
            label="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="seu@email.com"
            icon="✉️"
          />
          <InputField
            label="Senha"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            icon="🔒"
          />

          <div className="flex justify-end">
            <button type="button" className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-semibold">
              Esqueci minha senha
            </button>
          </div>

          {error && (
            <div className="rounded-xl px-4 py-3 text-sm text-red-300 flex items-center gap-2"
              style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-display font-semibold text-lg text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:scale-100 mt-1"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #4338ca)',
              boxShadow: '0 4px 20px rgba(124,58,237,0.45)',
            }}
          >
            {loading ? '⏳ Entrando...' : 'ENTRAR'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span className="text-xs text-white/30 font-semibold">OU</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Google */}
        <button
          type="button"
          className="w-full py-3.5 rounded-xl font-semibold text-white/80 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <span className="text-lg">G</span>
          Continuar com Google
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-white/50">
          Não tem conta?{' '}
          <button
            type="button"
            onClick={() => onNav('register')}
            className="text-amber-400 font-bold hover:text-amber-300 transition-colors"
          >
            Criar conta gratuita
          </button>
        </p>
      </div>
    </div>
  )
}

function RegisterScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name || !email || !password || !confirm) {
      setError('Preencha todos os campos.')
      return
    }
    if (!email.includes('@')) {
      setError('E-mail inválido.')
      return
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onNav('home')
    }, 1400)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative px-5 py-10"
      style={{ background: 'radial-gradient(ellipse at 40% 30%, #1e0f5c 0%, #0d0a2e 70%)' }}
    >
      <StarsBg />

      <div className="relative z-10 w-full max-w-sm flex flex-col gap-7">
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              boxShadow: '0 6px 24px rgba(245,158,11,0.45)',
            }}
          >
            ✏️
          </div>
          <AuthLogo />
          <p className="text-white/50 text-sm text-center">Crie sua conta e comece a conquistar!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <InputField
            label="Nome completo"
            type="text"
            value={name}
            onChange={setName}
            placeholder="Seu nome"
            icon="👤"
          />
          <InputField
            label="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="seu@email.com"
            icon="✉️"
          />
          <InputField
            label="Senha"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Mínimo 6 caracteres"
            icon="🔒"
          />
          <InputField
            label="Confirmar senha"
            type="password"
            value={confirm}
            onChange={setConfirm}
            placeholder="Repita a senha"
            icon="🔑"
          />

          {/* Password strength */}
          {password.length > 0 && (
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5 rounded-full transition-all"
                  style={{
                    background:
                      password.length >= i * 3
                        ? i <= 1 ? '#ef4444' : i <= 2 ? '#f59e0b' : i <= 3 ? '#22c55e' : '#22c55e'
                        : 'rgba(255,255,255,0.1)',
                  }}
                />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-xl px-4 py-3 text-sm text-red-300 flex items-center gap-2"
              style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-display font-semibold text-lg text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:scale-100 mt-1"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              boxShadow: '0 4px 20px rgba(245,158,11,0.4)',
            }}
          >
            {loading ? '⏳ Criando conta...' : 'CRIAR CONTA'}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-white/50">
          Já tem conta?{' '}
          <button
            type="button"
            onClick={() => onNav('login')}
            className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
          >
            Entrar
          </button>
        </p>
      </div>
    </div>
  )
}

function ResourceBar({ energy, coins, gems }: { energy: number; coins: number; gems: number }) {
  return (
    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
      <span className="flex items-center gap-1">
        <span className="text-yellow-400">⚡</span>
        <span className="text-white">{energy}/30</span>
        <span className="text-white/40 text-xs ml-0.5">04:15</span>
      </span>
      <span className="flex items-center gap-1">
        <span className="text-amber-400">🪙</span>
        <span className="text-white">{coins}</span>
      </span>
      <span className="flex items-center gap-1">
        <span className="text-cyan-400">💎</span>
        <span className="text-white">{gems}</span>
      </span>
    </div>
  )
}

function HomeScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 60% 40%, #1e0f5c 0%, #0d0a2e 70%)',
      }}
    >
      <StarsBg />

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-4 sm:px-6">
        {/* Logo */}
        <div className="text-center mb-2">
          <div
            className="font-display font-bold leading-none"
            style={{
              fontSize: 'clamp(36px, 12vw, 56px)',
              background: 'linear-gradient(135deg, #f59e0b, #fde68a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
              letterSpacing: '-1px',
            }}
          >
            DESAFIO
          </div>
          <div
            className="font-display font-bold leading-none"
            style={{
              fontSize: 'clamp(36px, 12vw, 56px)',
              background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px',
            }}
          >
            VESTIBULAR
          </div>
          <div className="text-white/60 text-sm mt-1 font-semibold tracking-wide">
            🎓 Aprenda. Pratique. Conquiste seu futuro!
          </div>
        </div>

        {/* Avatar placeholder */}
        <div className="my-6 w-32 h-40 rounded-2xl flex items-end justify-center overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #1e1566 0%, #0d0a2e 100%)' }}>
          <div className="text-7xl">🧑‍🎓</div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => onNav('map')}
            className="w-full py-4 rounded-xl font-display font-semibold text-lg text-white flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 4px 20px rgba(245,158,11,0.4)' }}
          >
            ▶ INICIAR JOGO
          </button>
          <button
            onClick={() => onNav('ranking')}
            className="w-full py-3 rounded-xl font-semibold text-white/90 flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.5)' }}
          >
            🏆 RANKING
          </button>
          <button
            onClick={() => onNav('profile')}
            className="w-full py-3 rounded-xl font-semibold text-white/90 flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.5)' }}
          >
            👤 PERFIL
          </button>
          <button
            className="w-full py-3 rounded-xl font-semibold text-white/90 flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.5)' }}
          >
            ⚙️ CONFIGURAÇÕES
          </button>
        </div>

        <div className="text-white/30 text-xs mt-6">v1.0.0</div>
      </div>
    </div>
  )
}

function MapScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'radial-gradient(ellipse at 50% 30%, #1e0f5c 0%, #0d0a2e 80%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-lg">🧑‍🎓</div>
          <div>
            <div className="font-semibold text-sm text-white">Lucas</div>
            <div className="text-xs text-amber-400">Nível 4</div>
          </div>
        </div>
        <ResourceBar energy={25} coins={320} gems={45} />
        <button className="text-white/60 hover:text-white transition-colors">⚙️</button>
      </div>

      {/* Phase map */}
      <div className="flex-1 flex flex-col items-center py-8 px-4 gap-6 relative">
        <div className="font-display text-2xl font-bold text-white mb-2">Mapa de Fases</div>

        <div className="w-full max-w-xs flex flex-col gap-4 relative">
          {/* Connecting path */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-white/10" />

          {phases.map((phase, i) => (
            <div
              key={phase.id}
              className={`flex items-center gap-4 transition-transform ${!phase.locked ? 'hover:scale-102 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
              onClick={() => !phase.locked && onNav('question')}
            >
              <div
                className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-2xl text-white flex-shrink-0"
                style={{
                  background: phase.locked ? '#334155' : `linear-gradient(135deg, ${phase.color}, ${phase.color}bb)`,
                  boxShadow: phase.locked ? 'none' : `0 4px 20px ${phase.color}66`,
                }}
              >
                {phase.locked ? '🔒' : phase.id}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white text-sm whitespace-pre-line leading-snug">{phase.name}</div>
                {!phase.locked && <StarRow count={phase.stars} />}
              </div>
            </div>
          ))}
        </div>

        {/* Chest progress */}
        <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="text-2xl">🪙</span>
          <StarRow count={5} total={15} />
          <span className="text-white/60 text-sm ml-1">5/15</span>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around py-3 px-4 pb-safe" style={{ background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        {[
          { icon: '🗺️', label: 'Mapa', screen: 'map' as Screen },
          { icon: '👤', label: 'Perfil', screen: 'profile' as Screen },
          { icon: '🏆', label: 'Ranking', screen: 'ranking' as Screen },
          { icon: '🏠', label: 'Início', screen: 'home' as Screen },
        ].map((item) => (
          <button
            key={item.screen}
            onClick={() => onNav(item.screen)}
            className="flex flex-col items-center gap-0.5 text-white/60 hover:text-white transition-colors"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function QuestionScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const q = questions[0]
  const [selected, setSelected] = useState<string | null>(null)

  function handleSubmit() {
    if (selected) onNav('feedback')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0d0a2e' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3" style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => onNav('map')} className="text-white/60 hover:text-white transition-colors text-lg">← Voltar</button>
          <span className="text-white/60 text-sm">{q.num}/{q.total}</span>
        </div>
        <div className="font-display text-lg font-semibold text-white">{q.phase}</div>
        <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${(q.num / q.total) * 100}%`, background: 'linear-gradient(90deg, #22c55e, #4ade80)' }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-sm font-semibold text-white/80 mb-2">Leia o texto abaixo:</p>
          <p className="text-sm text-white/70 italic leading-relaxed">{q.text}</p>
        </div>

        <p className="font-semibold text-white">{q.question}</p>

        <div className="flex flex-col gap-3">
          {q.options.map((opt) => {
            const isSelected = selected === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className="flex items-center gap-3 w-full text-left rounded-xl px-4 py-3 transition-all"
                style={{
                  background: isSelected ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.04)',
                  border: isSelected ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: isSelected ? '0 0 16px rgba(124,58,237,0.3)' : 'none',
                }}
              >
                <span
                  className="font-display font-bold text-base w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isSelected ? '#7c3aed' : 'rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                >
                  {opt.id}
                </span>
                <span className="text-sm text-white/90">{opt.text}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 flex gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button
          className="flex-1 py-3 rounded-xl font-semibold text-white/70 transition-all hover:text-white"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          💡 DICA
        </button>
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="flex-2 px-8 py-3 rounded-xl font-display font-semibold text-white transition-all disabled:opacity-40"
          style={{
            background: selected ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'rgba(34,197,94,0.2)',
            boxShadow: selected ? '0 4px 16px rgba(34,197,94,0.4)' : 'none',
          }}
        >
          ENVIAR RESPOSTA
        </button>
      </div>
    </div>
  )
}

function FeedbackScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const q = questions[0]
  const [timer, setTimer] = useState(3)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0d0a2e' }}>
      {/* Result banner */}
      <div
        className="px-4 pt-8 pb-6 flex flex-col items-center gap-2"
        style={{ background: 'linear-gradient(180deg, rgba(34,197,94,0.15) 0%, transparent 100%)' }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-1"
          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 0 24px rgba(34,197,94,0.5)' }}
        >
          ✓
        </div>
        <div className="font-display text-2xl font-bold text-white">
          Resposta <span style={{ color: '#22c55e' }}>Correta!</span>
        </div>
        <div className="text-amber-400 font-semibold">+10 pontos</div>
      </div>

      {/* Explanation */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-sm font-semibold text-white/80 mb-2">Explicação:</p>
          <p className="text-sm text-white/70 leading-relaxed">{q.explanation}</p>
        </div>

        {/* Rewards */}
        <div className="flex gap-3">
          <div className="flex-1 rounded-xl px-3 py-2 flex items-center gap-2 font-semibold text-sm"
            style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}>
            <span className="text-blue-300">XP</span>
            <span className="text-white">+10</span>
          </div>
          <div className="flex-1 rounded-xl px-3 py-2 flex items-center gap-2 font-semibold text-sm"
            style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.3)' }}>
            <span className="text-amber-400">🪙</span>
            <span className="text-white">+10</span>
          </div>
          <div className="flex-1 rounded-xl px-3 py-2 flex items-center gap-2 font-semibold text-sm"
            style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
            <span>🔥</span>
            <span className="text-white text-xs">Sequência de acertos! Bônus <span className="text-red-400">+5</span></span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 flex items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="text-white/60 text-sm">
          Próxima questão em:{' '}
          <span
            className="w-8 h-8 inline-flex items-center justify-center rounded-full font-bold text-white ml-1"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4338ca)' }}
          >
            {timer}
          </span>
        </div>
        <button
          onClick={() => onNav('question')}
          className="px-6 py-3 rounded-xl font-display font-semibold text-white transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 4px 16px rgba(245,158,11,0.4)' }}
        >
          PRÓXIMA QUESTÃO →
        </button>
      </div>
    </div>
  )
}

function ProfileScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [tab, setTab] = useState<'perfil' | 'desempenho' | 'conquistas'>('perfil')

  const subjects = [
    { name: 'Interpretação de Texto', pct: 80 },
    { name: 'Gramática', pct: 70 },
    { name: 'Figuras de Linguagem', pct: 65 },
    { name: 'Literatura Brasileira', pct: 75 },
  ]

  const badges = ['🏅', '⭐', '🎖️', '🏆', '🔥', '💎']

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0d0a2e' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={() => onNav('home')} className="text-white/60 hover:text-white mr-2">←</button>
        <div className="font-display text-xl font-bold text-white">Perfil do Aluno</div>
      </div>

      {/* Profile card */}
      <div className="px-4 py-5 flex items-center gap-4" style={{ background: 'rgba(124,58,237,0.1)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center text-3xl">🧑‍🎓</div>
        <div className="flex-1">
          <div className="font-display text-xl font-bold text-white">Lucas</div>
          <div className="text-amber-400 text-sm font-semibold">Nível 4</div>
          <div className="mt-1">
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full rounded-full" style={{ width: '53%', background: 'linear-gradient(90deg, #7c3aed, #a78bfa)' }} />
            </div>
            <div className="text-xs text-white/40 mt-0.5">320 / 600 XP</div>
          </div>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-1"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4338ca)' }}>🎓</div>
          <div className="text-xs text-white/60">Estudante Dedicado</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        {(['perfil', 'desempenho', 'conquistas'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-3 text-sm font-semibold capitalize transition-colors"
            style={{
              color: tab === t ? '#a78bfa' : 'rgba(255,255,255,0.4)',
              borderBottom: tab === t ? '2px solid #7c3aed' : '2px solid transparent',
            }}
          >
            {t === 'perfil' ? 'Perfil' : t === 'desempenho' ? 'Desempenho' : 'Conquistas'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {tab === 'perfil' && (
          <div className="flex flex-col gap-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Questões Respondidas', val: '128' },
                { label: 'Taxa de Acerto', val: '78%' },
                { label: 'Sequência de Acertos', val: '12' },
                { label: 'Melhor Pontuação', val: '930' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl p-4 text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="font-display text-2xl font-bold text-white">{s.val}</div>
                  <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Matérias */}
            <div className="rounded-2xl p-4 flex flex-col gap-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="font-semibold text-white text-sm mb-1">Matérias</div>
              {subjects.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70">{s.name}</span>
                    <span className="text-white font-semibold">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${s.pct}%`, background: 'linear-gradient(90deg, #22c55e, #4ade80)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'desempenho' && (
          <div className="flex flex-col gap-4">
            <div className="text-center py-8 text-white/40">
              <div className="text-4xl mb-3">📊</div>
              <div className="font-semibold">Gráficos de desempenho em breve!</div>
            </div>
          </div>
        )}

        {tab === 'conquistas' && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-3">
              {badges.map((b, i) => (
                <div key={i} className="rounded-2xl p-4 flex flex-col items-center gap-2"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-3xl">{b}</div>
                  <div className="text-xs text-white/50">Conquista {i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function RankingScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [tab, setTab] = useState<'geral' | 'amigos' | 'escola'>('geral')

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0d0a2e' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={() => onNav('home')} className="text-white/60 hover:text-white mr-2">←</button>
        <div className="font-display text-xl font-bold text-white">🏆 Ranking</div>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mt-4 mb-2 gap-1 rounded-xl p-1"
        style={{ background: 'rgba(255,255,255,0.06)' }}>
        {(['geral', 'amigos', 'escola'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2 text-sm font-display font-semibold rounded-lg capitalize transition-all"
            style={{
              background: tab === t ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
              color: tab === t ? 'white' : 'rgba(255,255,255,0.5)',
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Table headers */}
      <div className="flex items-center px-4 py-2 text-xs text-white/40 font-semibold uppercase tracking-wider">
        <span className="w-10">Pos.</span>
        <span className="flex-1">Jogador</span>
        <span className="w-14 text-center">Nível</span>
        <span className="w-20 text-right">Pontuação</span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2 pb-4">
        {leaderboard.map((row) => (
          <div
            key={row.pos}
            className="flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{
              background: row.isMe
                ? 'rgba(124,58,237,0.25)'
                : 'rgba(255,255,255,0.04)',
              border: row.isMe
                ? '1px solid rgba(124,58,237,0.5)'
                : '1px solid rgba(255,255,255,0.06)',
              boxShadow: row.isMe ? '0 0 16px rgba(124,58,237,0.2)' : 'none',
            }}
          >
            <span className="w-10 font-display font-bold text-lg text-center">
              {medals[row.pos] ?? <span className="text-white/50">{row.pos}</span>}
            </span>
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
              style={{ background: 'rgba(124,58,237,0.4)' }}>🧑‍🎓</div>
            <div className="flex-1">
              <div className={`font-semibold text-sm ${row.isMe ? 'text-purple-300' : 'text-white'}`}>{row.name}</div>
            </div>
            <div className="w-14 text-center">
              <span className="px-2 py-0.5 rounded-lg font-bold text-sm text-white"
                style={{ background: 'rgba(124,58,237,0.5)' }}>
                {row.level}
              </span>
            </div>
            <div className={`w-20 text-right font-display font-bold ${row.isMe ? 'text-amber-400' : 'text-white'}`}>
              {row.score.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 text-center text-white/30 text-xs">
        O ranking é atualizado diariamente.
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('login')

  const nav = (s: Screen) => setScreen(s)

  return (
    <div className="w-full min-h-screen relative md:max-w-md md:mx-auto" style={{ background: '#0d0a2e' }}>
      {screen === 'login' && <LoginScreen onNav={nav} />}
      {screen === 'register' && <RegisterScreen onNav={nav} />}
      {screen === 'home' && <HomeScreen onNav={nav} />}
      {screen === 'map' && <MapScreen onNav={nav} />}
      {screen === 'question' && <QuestionScreen onNav={nav} />}
      {screen === 'feedback' && <FeedbackScreen onNav={nav} />}
      {screen === 'profile' && <ProfileScreen onNav={nav} />}
      {screen === 'ranking' && <RankingScreen onNav={nav} />}
    </div>
  )
}
