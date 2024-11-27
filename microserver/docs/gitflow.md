
### 1. **Workflow do GitFlow baseado em Branches**

O **GitFlow** é um modelo de branching popular para organizar o desenvolvimento de projetos. Esse workflow utiliza branches para gerenciar diferentes estágios do desenvolvimento, como novas funcionalidades, correções de bugs e lançamentos.

#### **Estrutura de Branches do GitFlow:**

- **`main` (ou `master`)**: Contém o código estável, pronto para produção.
- **`develop`**: Contém o código em desenvolvimento e é onde as novas funcionalidades são integradas antes de serem lançadas.
- **`feature/*`**: Branches para novas funcionalidades, que são criadas a partir de `develop`.
- **`release/*`**: Usado para preparar uma versão de produção (testar, corrigir bugs, fazer ajustes).
- **`hotfix/*`**: Usado para corrigir rapidamente bugs em produção diretamente na branch `main`.

#### **Workflow do GitFlow (Baseado em Branches)**

1. **Criação da branch `develop`**: O desenvolvimento começa com a criação da branch `develop` a partir de `main` para reunir o trabalho de todas as funcionalidades.
   
2. **Criação de branches de funcionalidades** (`feature/*`):
   - Sempre que uma nova funcionalidade for iniciada, cria-se uma branch a partir de `develop` com o prefixo `feature/` (por exemplo, `feature/login`).
   - Quando a funcionalidade estiver pronta, faz-se um **merge** de volta para `develop`.

3. **Criar uma branch de release** (`release/*`):
   - Quando o desenvolvimento em `develop` está pronto para ser lançado, cria-se uma branch `release/` a partir de `develop` para testes finais, ajustes e correções de bugs.
   - Após os ajustes, a branch de release é **merged** para `main` e `develop` para refletir a versão final.
   
4. **Hotfixes** (`hotfix/*`):
   - Para correções de emergência em produção, cria-se uma branch `hotfix/` a partir de `main` e a correção é feita.
   - Depois, a branch `hotfix/*` é **merged** tanto em `main` quanto em `develop` para garantir que a correção seja refletida em ambos os lugares.

#### **Diagrama do GitFlow baseado em Branches**

```
       +-----------------------+
       |                       |
       |          main          |
       |                       |
       +-----------------------+
               |     
               v
        +---------------------+
        |     develop         |
        +---------------------+
         /        |        \
        v         v         v
   +-----------+ +--------+ +---------+
   | feature/* | | release/| | hotfix/*|
   +-----------+ +--------+ +---------+
        \         |        /
         v        v       v
    +-------------------------+
    |         main             |
    +-------------------------+
```

---

### 2. **Workflow do GitFlow baseado em Forks**

No **workflow baseado em forks**, é comum em projetos de código aberto, onde cada colaborador cria seu próprio fork do repositório principal. Esse workflow é muito utilizado em contribuições externas para um repositório, como pull requests em projetos públicos.

#### **Estrutura de Forks no GitFlow:**

- **Fork de Repositório Principal**: Cada colaborador cria um **fork** do repositório principal.
- **Branches no Fork**: No seu fork, você cria branches de funcionalidades, correções de bugs e outros, como no workflow baseado em branches.
- **Pull Request (PR)**: Após a finalização de uma funcionalidade ou correção, o colaborador cria um pull request do seu fork para o repositório principal.

#### **Workflow do GitFlow (Baseado em Forks)**

1. **Criação do Fork**:
   - O desenvolvedor cria um **fork** do repositório principal para começar a trabalhar em seu código localmente.

2. **Criação de branches no fork**:
   - Dentro do seu fork, cria-se uma branch (por exemplo, `feature/login`) a partir da branch `main` ou `develop`, dependendo da estratégia do projeto.
   - O desenvolvedor realiza suas alterações nessa branch.

3. **Sincronização com o repositório original**:
   - Periodicamente, o desenvolvedor **sincroniza seu fork** com o repositório original para garantir que está trabalhando com a versão mais recente do código. Isso pode ser feito via `git remote` para puxar as atualizações do repositório principal.

4. **Criação do Pull Request (PR)**:
   - Quando a funcionalidade estiver pronta, o desenvolvedor cria um **pull request** da sua branch para o repositório original.
   - O repositório original (maintainer) revisa o código e decide se aceita a contribuição.

5. **Merge do PR**:
   - Se o pull request for aprovado, o repositório principal faz o **merge** das alterações na branch principal (geralmente `develop` ou `main`).

#### **Diagrama do GitFlow baseado em Forks**

```
          +--------------------------+
          | Fork do Repositório      |
          | Principal                |
          +--------------------------+
                      |
                      v
          +---------------------------+
          | branch feature/login       |   <- Desenvolvedor cria branches no fork
          +---------------------------+
                      |
                      v
          +---------------------------+    <- Repositório original
          | Repositório Principal      |     (maintainers do projeto)
          +---------------------------+    (merge via PR)
                      |
                      v
          +---------------------------+
          | branch main (principal)    |   <- Merge do PR para main ou develop
          +---------------------------+
```

#### **Passos no Workflow baseado em Forks:**

1. Fork o repositório principal.
2. Crie uma branch no seu fork, baseada em `develop` ou `main`.
3. Faça suas alterações.
4. Sincronize seu fork com o repositório principal periodicamente.
5. Crie um Pull Request (PR) do seu fork para o repositório principal.
6. O repositório principal faz o **merge** do PR.

---

### Diferenças entre os dois workflows:

1. **Branches vs Forks**:
   - No workflow baseado em **branches**, todos os colaboradores trabalham dentro de um único repositório, criando branches dentro do repositório principal.
   - No workflow baseado em **forks**, cada colaborador trabalha em um fork do repositório principal, e as alterações são integradas via pull requests.

2. **Controle**:
   - No workflow baseado em **branches**, o controle de quem pode fazer mudanças nas branches principais é restrito ao repositório original.
   - No workflow baseado em **forks**, qualquer pessoa pode fazer um fork e criar pull requests, mas o controle final sobre a aceitação de mudanças é do mantenedor do repositório principal.

3. **Usabilidade**:
   - O workflow baseado em **branches** é mais simples para equipes internas ou pequenos grupos de desenvolvimento.
   - O workflow baseado em **forks** é mais utilizado para projetos públicos ou de código aberto, onde contribuições externas são feitas por meio de pull requests.
