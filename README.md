# 🌿 Natty Lean - Página de Vendas (VSL)

Olá! Este é o resultado do desafio proposto no processo seletivo. Desenvolvi uma landing page de vendas (VSL) completa e funcional, com foco total em performance, experiência do usuário e nas melhores práticas de desenvolvimento front-end.

**🌐 Acesse o projeto online:** [https://athena272.github.io/hw-development/](https://athena272.github.io/hw-development/)

**🎥 Vídeo de demonstração:** [https://youtu.be/JCJe8Xe97Ec](https://youtu.be/JCJe8Xe97Ec)

## ✨ Principais Destaques do Projeto

*   **▶️ Layout Dinâmico com Base no Vídeo**: O conteúdo principal da página, incluindo as ofertas, só aparece após o vídeo atingir 20:14. Criei essa funcionalidade para engajar o usuário e apresentar a oferta no momento certo.
*   **🔁 Componentização Inteligente**: Para reforçar a chamada para ação (CTA), as seções de contador e ofertas são repetidas de forma inteligente em pontos estratégicos da rolagem, conforme o briefing.
*   **📱 Design Responsivo (Mobile-First)**: Garanti uma experiência de usuário impecável em qualquer dispositivo. O layout foi construído com Bootstrap 5 e a ordem das ofertas é ajustada em telas menores para priorizar o pacote de maior valor.
*   **🛒 Modal de Compra Fluido**: Ao clicar para comprar, o usuário interage com um modal elegante do Bootstrap para preencher seus dados, mantendo-o no fluxo da página de vendas.
*   **✅ Página de Agradecimento Personalizada**: Após a compra, o cliente é recebido em uma página que exibe dinamicamente os detalhes do seu pedido (produto, valor, etc.), criando uma experiência pós-venda mais pessoal.
*   **🎁 Bônus Dinâmicos**: A página de agradecimento oferece um e-book de bônus diferente para cada pacote comprado, agregando mais valor à compra do cliente.
*   **🔍 SEO Otimizado com Rich Snippets**: A seção de FAQ foi implementada usando o schema `JSON-LD (FAQPage)` do Google. Essa é uma atenção especial ao SEO, que ajuda a página a se destacar nos resultados de busca.
*   **⚡ Build Automatizado com Gulp**: Configurei um workflow com Gulp.js para automatizar a compilação de SASS e a minificação de CSS e JavaScript. Isso não só agiliza o desenvolvimento, mas garante que os arquivos enviados ao navegador sejam leves e performáticos.

## 🛠️ Minha Stack de Tecnologias

Acredito que a melhor ferramenta é aquela que resolve o problema de forma eficiente. Para este desafio, escolhi uma stack robusta e alinhada aos requisitos:

*   **📄 HTML5 Semântico**: Estruturei o conteúdo de forma lógica e semântica, pensando em acessibilidade e em como os motores de busca leem a página.
*   **🎨 SCSS (Sass)**: Organizei todo o CSS com Sass, dividindo o código em parciais. Isso tornou os estilos mais fáceis de manter e escalar.
*   **🅱️ Bootstrap 5**: Usei o poder do sistema de grid do Bootstrap 5 para criar um layout responsivo complexo de forma rápida e eficiente. Também aproveitei componentes como o Modal e o Accordion.
*   **🍦 JavaScript (Vanilla)**: Para demonstrar domínio dos fundamentos do front-end, toda a interatividade foi construída com JavaScript puro, sem frameworks. Isso inclui a manipulação do DOM, a comunicação com a API do YouTube e a passagem de dados entre páginas.
*   **⚙️ Gulp.js**: Implementei o Gulp para ter um processo de build profissional, otimizando todos os assets para produção e garantindo a melhor performance possível para o usuário final.

## 🚀 Como Rodar o Projeto

Para ver o projeto em ação, basta seguir estes passos:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/athena272/hw-development.git
    cd hw-development
    ```

2.  **Instale as dependências:**
    (Você precisa do [Node.js](https://nodejs.org/) instalado)
    ```bash
    npm install
    ```

3.  **Faça o build inicial dos arquivos:**
    ```bash
    npx gulp
    ```

4.  **Para desenvolver com hot-reload:**
    ```bash
    npx gulp watch
    ```
    Isso vai "ouvir" suas alterações e compilar tudo automaticamente.

5.  **Abra no navegador:**
    Abra o `index.html`. Recomendo usar a extensão "Live Server" do VS Code para uma melhor experiência.

## 📂 Organização dos Arquivos

Mantive uma estrutura de pastas limpa e lógica, separando o código-fonte dos arquivos de produção.

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

