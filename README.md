# ELLP - Sistema de Registro de Oficinas e Presença de Alunos

## Descrição da Atividade

O projeto de extensão **ELLP (Ensino Lúdico de Lógica e Programação)** é uma iniciativa da UTFPR - Câmpus Cornélio Procópio, coordenada pelo Prof. Antonio Carlos Fernandes da Silva. Seu principal objetivo é oferecer a crianças e adolescentes de escolas públicas, ONGs e creches o acesso ao conhecimento em informática básica, lógica, robótica e programação, promovendo também o reforço escolar nas áreas de matemática e ciências.

Esse sistema tem como proposta **ser uma ferramenta de apoio à gestão das oficinas promovidas pelo ELLP**, facilitando o registro de atividades e o acompanhamento da participação dos alunos.

## Funcionalidades

*   **Cadastro de oficinas:** Permite o registro de novas oficinas, com informações como data de realização e demais detalhes relevantes.
*   **Gestão de alunos:** Possibilita o cadastro de novos alunos participantes do projeto, bem como a exclusão daqueles que não fazem mais parte das atividades.
*   **Controle de presença:** Registra a frequência dos alunos nas oficinas, facilitando o acompanhamento da participação individual.
*   **Relatórios de presença:** Gera listagens com os alunos presentes em cada oficina, permitindo uma visão organizada da assiduidade.
*   **Interface intuitiva:** O sistema é projetado para permitir uma navegação simples e direta entre suas funcionalidades.

## Requisitos do Sistema

### Requisitos Funcionais

*   **RF01:** O sistema deve permitir que a conta administradora cadastre novas oficinas, informando o nome da oficina e o dia da semana que ocorrerão os encontros.  
*   **RF02:** O sistema deve permitir que a conta administradora visualize a lista completa de oficinas cadastradas.  
*   **RF03:** O sistema deve permitir que a conta administradora edite as informações de uma oficina previamente cadastrada.  
*   **RF04:** O sistema deve permitir que a conta administradora exclua oficinas cadastradas do sistema.  
*   **RF05:** O sistema deve permitir que a conta administradora cadastre novos alunos na oficina.
*   **RF06:** O sistema deve permitir que a conta administradora exclua alunos das oficinas.
*   **RF07:** O sistema deve permitir que a conta administradora cadastre novos professores no sistema.
*   **RF08:** O sistema deve permitir que a conta administradora exclua professores no sistema
*   **RF09:** O sistema deve permitir o registro de presença dos alunos cadastrados nas oficinas por meio da conta do professor.
*   **RF10:** O sistema deve possuir a capacidade de emitir uma listagem com registros de todos os alunos presentes na oficina.

### Requisitos Não-Funcionais

*   **RNF01:** O sistema deve permitir a navegação entre as páginas e funcionalidades de forma simples e autoexplicativa, com interface clara, acessível e responsiva, garantindo uma boa experiência de uso para usuários com diferentes níveis de familiaridade com tecnologia.  
*   **RNF02:** O sistema deve ser compatível com navegadores modernos (Chrome, Firefox, Edge) e ajustado para visualização em monitores desktop de diferentes tamanhos.  
*   **RNF03:** O sistema deve ser desenvolvido com uma estrutura modular e organizada, facilitando sua manutenção e permitindo a adição de novas funcionalidades futuras sem necessidade de reestruturar partes centrais do código, promovendo boas práticas de engenharia de software.  
*   **RNF04:** O sistema deve utilizar exclusivamente um banco de dados relacional para armazenar as informações, garantindo a padronização dos dados, integridade referencial, consistência das operações e facilidade na execução de consultas complexas.  
*   **RNF05:** O sistema deve garantir que todas as operações de criação, leitura, atualização e remoção de dados (CRUD) realizadas pelos administradores sejam seguras e protegidas, exigindo autenticação de usuário e utilizando mecanismos de controle de acesso para evitar ações não autorizadas ou vazamento de informações sensíveis.  

## Tecnologias Utilizadas

### Banco de Dados
* **PostgreSQL:** Utilizado para a autenticação dos usuários e armazenamento de dados, oferecendo segurança e facilidade de integração com a plataforma.
* **Prisma:** Ferramenta para hospedar o banco de dados PostgreSQL.

### Backend
* **Node.js com Express:** Plataforma de desenvolvimento do servidor, permitindo a construção da API que servirá de base para comunicação com o frontend.

### Frontend
* **Vue.js:** Framework JavaScript para a construção de interfaces dinâmicas e responsivas, facilitando a experiência do usuário.

### Modelagem de Dados e API
* **Postman:** Ferramenta para testar e documentar as rotas da API.
* **BRMODELOWEB:** Utilizado para modelagem e planejamento das tabelas do banco de dados e relações entre entidades.

### Controle de Versão
* **Git e GitHub:** Controle de versão para gerenciar as diferentes fases do desenvolvimento e facilitar a colaboração entre os membros da equipe.

### Gerenciamento de Projeto
* **Github Projects:** Organização das tarefas e atividades, promovendo a gestão ágil por meio do quadro Kanban.
* **Discord:** Comunicação entre a equipe para trocas rápidas de informações e discussões de melhorias no projeto.
* **Google Drive:** Armazenamento e versionamento de documentação de planejamento não diretamente ligada ao desenvolvimento.

## Testes
Serão realizados principalmente **testes unitários (UTs)** para validar as funcionalidades do projeto.
Será utilizada a ferramenta **Jest** para automatizar e executar os testes ao longo do desenvolvimento.

## Configuração do Ambiente

Para configurar o ambiente de desenvolvimento, siga os passos abaixo:

1. **Clonar o Repositório:**

    ```bash
    git clone https://github.com/Monegatto/sistema-de-presenca-ELLP
    cd sistema-de-presenca-ELLP
    ```

2. **Instalar as dependências:**

    ```bash
    npm install
    ```

3. **Executar as migrations do prisma:**

    Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:

    ```bash
    cp .env.example .env
    ```

    Abra o arquivo `.env` e substitua os valores de exemplo pelas suas credenciais do Firebase:

    ```env
    DATABASE_URL="Database_url"
    ```

4. **Executar o Projeto:**

    ```bash
    npm run dev
    ```

5. **Outras Instruções:**

   Existe uma conta admin fixa dentro do projeto, ela é a conta capaz de adiministrar os usuários e será a unica conta para acessar o sistema na primeira configuração.
   
   Credenciais:
   
   * User: admin
   * Senha: password
        

## Estrutura do Projeto

O projeto segue a arquitetura **MVC (Model-View-Controller)**, organizando o código de forma a separar responsabilidades entre camadas de dados, lógica de negócio e interface do usuário.

Essa organização visa facilitar a manutenção, escalabilidade e legibilidade do código ao longo do desenvolvimento.

## Modelagem do Banco

![ModeloLogico](https://github.com/user-attachments/assets/1b9aea2c-fa1b-4be5-a407-c9e3e29a539e)
Modelo Lógico

![ModeloConceitual](https://github.com/user-attachments/assets/16187a3d-2473-4ecf-b66a-cae2af5f280f)
Modelo Conceitual

## Documentação Adicional

* [Documentação do Vue.js](https://vuejs.org/)
* [Documentação do Vuetify](https://vuetifyjs.com/)
* [Documentação do Projeto](https://docs.google.com/document/d/1AOV5VbKBeztEs_ue7OdyKU5Ud0U3gnlGyvixVEJ7Lbc/edit?usp=sharing)
* [Figma do Projeto](https://www.figma.com/design/ZVFf0QR1Qr5ZSUeeGhsYPM/Oficina-2?node-id=314-1339&t=HcfhPwbzFZ85YmCs-1)
## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.
