# RS Instalações Elétricas — Sistema de Gestão

Aplicação estática para gestão local de clientes, orçamentos, agenda, ordens de serviço, estoque, equipe, fornecedores e financeiro.

## Executar

1. Abra esta pasta no VS Code.
2. Abra `index.html`.
3. Clique com o botão direito e escolha **Open with Live Server**.
4. Acesse com usuário `admin` e senha `admin`.

Não é necessário instalar dependências, executar `npm`, configurar banco de dados ou iniciar backend.

## Dados e segurança

Os dados ficam no `localStorage` do navegador, vinculados à origem/porta do Live Server e ao perfil do navegador. O login usa `sessionStorage` e é apenas uma barreira local, não autenticação segura. Use **Configurações → Exportar backup** regularmente.

O sistema usa schema local versão 1. Um backup só é importado depois de validar estrutura e versão; antes da substituição, o estado atual é exportado automaticamente.

## Limitações locais

- Dados não sincronizam entre computadores ou navegadores.
- Limpar os dados do navegador remove a base local se não houver backup.
- Não há controle de acesso por usuário, auditoria remota ou segurança de servidor.
- Fotos e assinatura desenhada não são armazenadas nesta versão, evitando exceder o limite do armazenamento local.
- A impressão/PDF utiliza a caixa de impressão do navegador.
