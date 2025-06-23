# Natty Lean - Página de Vendas (VSL)

Este projeto é uma landing page de vendas (VSL - Video Sales Letter) completa, desenvolvida como parte de um processo seletivo. O objetivo foi criar uma experiência de vendas dinâmica e persuasiva, composta por uma página de vendas e uma página de agradecimento, seguindo um briefing detalhado e requisitos técnicos específicos.

## Funcionalidades Implementadas

-   **Layout Dinâmico Baseado no Vídeo**: O conteúdo principal da página (ofertas, garantia, FAQ) é revelado somente após o vídeo atingir um tempo específico (20:14), criando um gatilho de urgência e engajamento.
-   **Componentização e Repetibilidade**: As seções de contador regressivo e ofertas são repetidas ao longo da página para reforçar a chamada para ação (CTA), conforme solicitado no briefing.
-   **Responsividade (Mobile-First)**: O layout foi construído com Bootstrap 5 e se adapta a diferentes tamanhos de tela. A ordem das ofertas é ajustada para otimizar a visualização em dispositivos móveis, priorizando a melhor oferta.
-   **Modal de Compra Interativo**: Ao clicar em "Add to Cart", um modal do Bootstrap é acionado para coletar os dados do usuário (nome, e-mail, telefone) sem que ele precise sair da página.
-   **Página de Agradecimento Personalizada**: Após a finalização, o usuário é redirecionado para uma página de agradecimento que exibe dinamicamente os dados da compra (produto, quantidade, valor total) e as informações do cliente, passados via parâmetros de URL.
-   **Bônus Dinâmicos**: A página de agradecimento exibe um bônus (e-book) diferente com base na quantidade de potes que o cliente comprou.
-   **Otimização para SEO com Rich Snippets**: A seção de FAQ foi estruturada com o schema `JSON-LD (FAQPage)` do Google. Isso permite que os motores de busca entendam o conteúdo e o exibam como um "rich snippet" nos resultados da pesquisa, aumentando a visibilidade e a taxa de cliques.
-   **Build Automatizado e Otimizado**: Foi configurado um ambiente de build com **Gulp.js** para automatizar tarefas de desenvolvimento, como a compilação de SASS e a minificação de arquivos CSS e JavaScript, garantindo melhor performance em produção.

## Escolhas Técnicas e Justificativas

A seleção de tecnologias foi guiada pelos requisitos do processo seletivo, com foco em demonstrar proficiência em tecnologias front-end fundamentais e boas práticas de desenvolvimento.

-   **HTML5 Semântico**: A estrutura do HTML foi organizada de forma semântica para garantir acessibilidade e otimização para os motores de busca.
-   **SCSS (Sass)**: Utilizado para escrever um CSS mais limpo, organizado e manutenível. A estrutura foi dividida em parciais (`_variables.scss`, `_components.scss`, `_layout.scss`), facilitando a gestão dos estilos e a reutilização de código.
-   **Bootstrap 5**: Escolhido por seu robusto sistema de grid, que facilitou a criação de um layout responsivo complexo, incluindo a reordenação de elementos (`order-lg-*`) entre a visualização desktop e mobile. Componentes como o Modal e o Accordion foram usados para acelerar o desenvolvimento.
-   **JavaScript (Vanilla)**: Todo o dinamismo da página foi construído com JavaScript puro, sem o uso de frameworks, para atender aos requisitos. Isso inclui a manipulação do DOM, a interação com a API IFrame do YouTube, a gestão de eventos, a passagem de dados entre páginas via `URLSearchParams` e a lógica de exibição condicional do conteúdo.
-   **Gulp.js**: Implementado como um automatizador de tarefas para otimizar o fluxo de trabalho. As tarefas configuradas incluem:
    -   **Compilação de SASS**: Converte os arquivos `.scss` em `.css`.
    -   **Minificação de CSS e JS**: Reduz o tamanho dos arquivos (`main.min.css`, `main.min.js`) para diminuir o tempo de carregamento da página, uma prática essencial para performance web.
    -   **Watch**: Monitora alterações nos arquivos de desenvolvimento e executa as tarefas de compilação automaticamente, agilizando o desenvolvimento.

## Como Executar o Projeto

Para visualizar e desenvolver o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/athena272/hw-development.git
    cd hw-development
    ```

2.  **Instale as dependências de desenvolvimento:**
    (É necessário ter o [Node.js](https://nodejs.org/) instalado)
    ```bash
    npm install
    ```
    Este comando instalará o Gulp e todos os plugins listados no `package.json`.

3.  **Execute o build inicial:**
    ```bash
    npx gulp
    ```
    Este comando irá compilar os arquivos SCSS e minificar o JavaScript pela primeira vez.

4.  **Para desenvolver:**
    ```bash
    npx gulp watch
    ```
    Este comando ficará ativo, monitorando qualquer alteração nos arquivos `.scss` e `.js` e recompilando-os automaticamente.

5.  **Visualize a página:**
    Abra o arquivo `index.html` em seu navegador. Para uma melhor experiência de desenvolvimento, recomenda-se o uso de um servidor local, como a extensão "Live Server" do VS Code.

## Estrutura do Projeto

A estrutura de pastas foi organizada para separar claramente o código-fonte dos arquivos de distribuição.

```
/
├── assets/
│   ├── css/              # CSS compilado (para depuração)
│   ├── dist/             # Arquivos finais minificados (para produção)
│   │   ├── css/
│   │   └── js/
│   ├── images/           # Imagens do projeto
│   ├── js/               # Código-fonte JavaScript (main.js)
│   ├── lib/              # Bibliotecas de terceiros (Bootstrap)
│   └── scss/             # Código-fonte SCSS (com parciais)
├── gulpfile.js           # Arquivo de configuração das tarefas Gulp
├── index.html            # Página de vendas (VSL)
├── thank-you.html        # Página de agradecimento
├── package.json          # Dependências do projeto
└── README.md             # Este arquivo
```

