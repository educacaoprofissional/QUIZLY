 Crie um aplicativo web responsivo e navegável chamado “DESAFIO VESTIBULAR”, uma plataforma de estudos gamificada para estudantes brasileiros que estão se preparando para vestibulares.

IMPORTANTE:
Não crie apenas um mockup estático. Crie uma aplicação funcional/protótipo navegável, com telas conectadas, botões funcionando, estados de progresso e componentes reutilizáveis.

==================================================
IDENTIDADE VISUAL
==================================================

Estética:
- EdTech + videogame + vestibular brasileiro
- Jovem, moderna, premium e motivadora
- Visual semelhante a um RPG educacional
- Fundo predominantemente azul-marinho e roxo escuro
- Gradientes discretos
- Amarelo para recompensas e elementos de destaque
- Verde para progresso, sucesso e respostas corretas
- Azul, laranja e rosa como cores auxiliares
- Cards arredondados
- Sombras suaves
- Ícones modernos
- Ilustrações 3D cartoon semi-realistas

Tipografia:
- Sans-serif moderna
- Alta legibilidade
- Títulos fortes
- Hierarquia visual clara

Criar um Design System com:
- Cores
- Tipografia
- Botões
- Cards
- Badges
- Avatares
- Barras de progresso
- Ícones
- Estados de sucesso/erro/bloqueado
- Componentes de questões

Usar Auto Layout e componentes reutilizáveis sempre que possível.

==================================================
TELA 1 — LOGIN / TELA INICIAL
==================================================

Criar uma tela inicial de impacto.

Título:
“DESAFIO VESTIBULAR”

Subtítulo:
“Aprenda. Pratique. Conquiste seu futuro!”

Mostrar um personagem adolescente em estilo 3D cartoon:
- cabelo castanho
- moletom roxo
- mochila
- segurando livros
- expressão simpática e confiante

Botões:
[ INICIAR JOGO ]
[ RANKING ]
[ PERFIL ]
[ CONFIGURAÇÕES ]

Ao clicar em “INICIAR JOGO”:
→ navegar para o MAPA DE FASES.

Ao clicar em “RANKING”:
→ navegar para RANKING.

Ao clicar em “PERFIL”:
→ navegar para PERFIL.

==================================================
TELA 2 — MAPA DE FASES
==================================================

Criar um mapa de progressão gamificado.

Header:
Avatar
“Lucas”
“Nível 4”

Mostrar:
⚡ Energia: 25/30
🪙 Moedas: 320
💎 Gemas: 45
⚙ Configurações

Criar um mapa ilustrado com:
- árvores
- colinas
- pequenas construções
- cidade ao fundo
- caminho pontilhado

Criar 5 fases:

FASE 1
“INTERPRETAÇÃO DE TEXTO”
3 estrelas
Estado: desbloqueada

FASE 2
“GRAMÁTICA”
3 estrelas
Estado: desbloqueada

FASE 3
“FIGURAS DE LINGUAGEM”
3 estrelas
Estado: desbloqueada

FASE 4
“LITERATURA BRASILEIRA”
2 estrelas
Estado: desbloqueada

FASE 5
“SIMULADO FINAL”
Estado: bloqueada
Mostrar cadeado.

Ao clicar na Fase 1:
→ abrir tela de QUESTÃO.

As fases seguintes podem mostrar uma mensagem de bloqueio caso ainda não estejam disponíveis.

==================================================
TELA 3 — QUESTÃO
==================================================

Header:

“Fase 1: Interpretação de Texto”

Mostrar:
1/10

Barra de progresso verde.

Criar card de texto:

“O avanço tecnológico trouxe muitos benefícios para a sociedade, mas também revelou desafios importantes. É preciso saber utilizá-lo de forma consciente para promover um futuro melhor para todos.”

Pergunta:

“Qual é a ideia principal do texto?”

Alternativas:

A) O futuro depende exclusivamente da tecnologia.

B) A tecnologia trouxe benefícios e desafios à sociedade.

C) Os desafios são mais importantes que os benefícios.

D) A tecnologia deve ser evitada pela sociedade.

A alternativa B deve ser a resposta correta.

INTERAÇÃO:

Quando o usuário clicar em uma alternativa:
- destacar visualmente a opção selecionada.

Quando clicar em:
[ ENVIAR RESPOSTA ]

Se escolher B:
→ mostrar estado de resposta correta.

Se escolher qualquer outra:
→ mostrar estado de resposta incorreta.
→ informar que ele pode tentar novamente.

==================================================
TELA 4 — FEEDBACK DE RESPOSTA CORRETA
==================================================

Mostrar grande ícone verde de confirmação.

Texto:

“Resposta Correta!”

“+10 pontos”

Mostrar explicação:

“A ideia principal de um texto é o assunto central que o autor deseja comunicar. Neste texto, o autor destaca que a tecnologia trouxe benefícios, mas também desafios, e que deve ser usada de forma consciente.”

Mostrar recompensas:

+10 XP
+10 moedas
🔥 Sequência de acertos +5

Mostrar botão:

[ PRÓXIMA QUESTÃO ]

Ao clicar:
→ avançar para questão 2/10.

Atualizar visualmente:
- XP
- moedas
- sequência
- progresso

==================================================
TELA 5 — QUESTÃO 2
==================================================

Criar uma segunda questão de interpretação de texto.

Manter o mesmo componente visual da questão anterior.

Indicador:
2/10

Usar uma pergunta diferente e conteúdo educacional apropriado para vestibular.

Permitir responder e mostrar feedback.

Depois da resposta correta:
→ botão “PRÓXIMA QUESTÃO”.

Criar pelo menos 5 questões diferentes para demonstrar o fluxo.

==================================================
TELA