# RS Instalações Elétricas — Sistema de Gestão

Aplicação web para gestão de clientes, orçamentos, equipe, estoque, ordens de serviço, agenda e financeiro. O projeto funciona diretamente no navegador e sincroniza os dados com o Supabase, mantendo também uma cópia local para uso em caso de falha de conexão.

## Funcionalidades

- Cadastro e gerenciamento de clientes e equipe.
- Criação de orçamentos e ordens de serviço.
- Controle financeiro e relatórios.
- Cadastro de produtos e controle de estoque.
- Entradas, saídas, ajustes e devoluções de produtos.
- Histórico de movimentações e alerta de estoque baixo.
- Exportação e importação de backups em JSON.
- Tema claro e escuro.
- Sincronização automática com o Supabase.


## Executar com Live Server

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server**, caso ainda não esteja instalada.
3. Clique com o botão direito em `index.html`.
4. Escolha **Open with Live Server**.
5. Entre com usuário `admin` e senha `admin`.

Não é necessário instalar pacotes, executar `npm` ou iniciar um backend separado.

Ao editar e salvar HTML, CSS ou JavaScript, o Live Server atualiza a página. Cadastros feitos dentro do sistema não modificam os arquivos do projeto; eles são gravados no Supabase e no armazenamento local do navegador.

## Login

Os campos de usuário e senha começam vazios. O login é solicitado sempre que a página é aberta ou recarregada.

O login atual é apenas uma barreira local de conveniência e não substitui um sistema de autenticação seguro. Para uso público ou com dados reais, implemente Supabase Auth e políticas RLS associadas a usuários autenticados.

## Armazenamento e sincronização

- O Supabase é usado como armazenamento remoto principal.
- Uma cópia é mantida no `localStorage` para permitir funcionamento temporário sem conexão.
- Ao abrir o sistema, os dados remotos são carregados quando estiverem disponíveis.
- Alterações são enviadas automaticamente ao Supabase.
- Se a sincronização falhar, os dados continuam salvos localmente e o sistema exibe um aviso.
- A sincronização remota só funcionará depois que `supabase-schema.sql` for executado no painel.

O arquivo `supabase.js` contém funções reutilizáveis para inserir, listar, atualizar, excluir e fazer *upsert* de dados pela API REST.

## Backups

Use **Configurações → Exportar backup** regularmente. Os backups usam JSON e incluem os dados do sistema.

Antes de importar um backup, o sistema valida sua estrutura e versão. O estado atual é exportado automaticamente antes da substituição.

## Arquivos principais

- `index.html`: estrutura da interface e tela de login.
- `app.js`: regras do sistema, telas e sincronização dos dados.
- `supabase.js`: funções de acesso à API REST do Supabase.
- `supabase-config.js`: URL e chave pública do projeto Supabase.
- `supabase-schema.sql`: tabela e políticas necessárias no banco.
- `styles.css`, `sidebar.css` e `theme.css`: estilos visuais.

## Segurança e limitações

- A chave pública presente no frontend não é um segredo; a segurança depende das políticas RLS.
- As políticas fornecidas permitem acesso anônimo à tabela do aplicativo. Elas são adequadas apenas para este modelo simples de acesso local.
- O usuário e a senha de administrador estão definidos no código JavaScript e não oferecem proteção contra alguém com acesso aos arquivos.
- Fotos e assinaturas desenhadas não são armazenadas nesta versão.
- A geração de PDF utiliza a caixa de impressão do navegador.
- Limpar os dados do navegador remove apenas a cópia local; dados já sincronizados permanecem no Supabase.
