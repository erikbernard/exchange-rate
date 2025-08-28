# Aplicação de Consulta de Taxa de Câmbio

Esta é uma aplicação front-end desenvolvida em Angular para consultar taxas de câmbio de moedas em tempo real e visualizar o histórico diário.

## 📜 Descrição

O projeto consiste em uma Single Page Application (SPA) que permite ao usuário pesquisar por uma sigla de moeda (ex: USD) e visualizar a cotação atual em relação a uma moeda base (ex: BRL), bem como uma lista com o histórico de cotações dos últimos dias. A aplicação é reativa, responsiva e consome uma API externa para obter os dados de câmbio.

## 📜 Minhas impressões sobre o desafio

Sobre o projeto, foi bem tranquilo eu que adicionei mais complexidade no teste, pontos positivos e o fato de não precisar criar o layout no Figma nem elaborar um CRUD completo, já que recebi tudo pronto. Fiquei até surpreso com isso. Nesse sentido, foquei em aplicar recursos do Angular. A versão utilizada foi a 17, que já estava instalada. Pensei em adotar `Signals`, mas optei por seguir com `Observables`. Dos recursos novos, explorei o control flow introduzido no Angular 17 e utilizei componentização, pipes, serviços e o uso do RxJS, para demonstrar domínio dos principais recursos do framework. Também utilizei o padrão BEM (Block, Element, Modifier) na estilização com SCSS, o que, além de organizar melhor o código, contribui para a criação de testes unitários.

## ✨ Tecnologias Utilizadas

As seguintes tecnologias e ferramentas foram utilizadas na construção do projeto:

-   **[Angular V17](https://angular.io/):** Framework principal para a construção da interface de usuário.
-   **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript que adiciona tipagem estática ao código.
-   **[SCSS](https://sass-lang.com/):** Pré-processador CSS que adiciona recursos como variáveis, aninhamento e mixins.
-   **[RxJS](https://rxjs.dev/):** Biblioteca para programação reativa usando Observables, utilizada extensivamente no Angular para lidar com eventos assíncronos.
-   **[Karma](https://karma-runner.github.io/):** Ferramenta para execução de testes de unidade.
-   **[Jasmine](https://jasmine.github.io/):** Framework de testes BDD (Behavior-Driven Development) para JavaScript.

## 🏗️ Conceitos do Angular Aplicados

### Gerenciamento de Estado

Para o gerenciamento de estado da aplicação, foi adotada uma abordagem reativa utilizando `BehaviorSubject` do RxJS dentro dos serviços.

-   **`ExchangeRateService`**: Este serviço centraliza a lógica de negócio e a comunicação com a API. Ele utiliza um `BehaviorSubject` para manter o estado atual dos dados de câmbio (`exchangeRateData$`).
-   **Fluxo de Dados**: Quando um componente solicita os dados (por exemplo, através de uma busca), o serviço faz a chamada à API, atualiza o `BehaviorSubject` com os novos dados e notifica todos os componentes que estão inscritos (`subscribed`) neste `Observable`. Isso garante que a UI seja atualizada de forma reativa e consistente em toda a aplicação.

Essa é uma abordagem simples para aplicações de pequeno porte. Seria possível implementá-la de forma ainda mais enxuta? Sim. Porém, optei por explorar melhor os recursos do `RxJS`, mantendo os componentes mais limpos ao utilizar o `async pipe`, que já realiza o unsubscribe dos observables automaticamente.

### Componentização

Na aplicação apliquei estrutura em componentes focando no conceito de Dumb e Smart components, para facilitar os testes de unidade.

-   **Componentes de Apresentação (Dumb Components):** Componentes como `HeaderComponent`, `FooterComponent`, `DailyExchangeItemComponent` e `CurrentExchangeComponent` são responsáveis apenas por exibir dados recebidos via `@Input()` e emitir eventos via `@Output()`. Eles não possuem lógica de negócio.
-   **Componentes de Container (Smart Components):** A `HomePage` atua como um componente container, orquestrando a interação entre os serviços e os componentes de apresentação. Ela é responsável por buscar os dados e repassá-los para os componentes filhos.

### Pipes

A criação de pipes customizados para manipular e formatar dados diretamente nos templates HTML, nesse caso foi aplicado justamente para isolar a logica dos componentes mantendo os mais limpos.

-   **`CalculateDiffPipe`**: Recebe o valor de fechamento atual e o anterior para calcular e retornar a diferença percentual, formatando o resultado para exibição.
-   **`PreviousClosePipe`**: Recebe o histórico de cotações e um índice para encontrar e retornar o valor de fechamento do dia anterior.

### Metodologia BEM e Testes
A utilização da metodologia BEM (Block, Element, Modifier) para a nomeação de classes CSS no projeto não apenas organiza o estilo, mas também facilita significativamente os testes de unidade e combina perfeitamente o scss do Angular.

- Seletores Previsíveis e Únicos: BEM cria nomes de classes específicos e previsíveis (ex: `.search__input, .list__item--active`). Isso torna a seleção de elementos do DOM nos testes de unidade extremamente confiável e direta, usando `By.css('.search__input')`.

- Testes Menos Frágeis: Ao atrelar os seletores de teste a classes BEM, os testes se tornam mais resilientes a mudanças na estrutura do HTML. Alterar uma div para um article não quebra o teste, desde que a classe BEM funcional (`.daily-list__item`) seja mantida. Isso desacopla a lógica do teste da estrutura exata do DOM.

- Clareza e Legibilidade: Os nomes das classes BEM descrevem a função de cada elemento. Um seletor como `.button--disabled `em um teste deixa claro para qualquer desenvolvedor qual estado do componente está sendo verificado, melhorando a manutenibilidade dos testes.


## 📂 Organização do Repositório

A estrutura de diretórios do projeto, optei por essa forma por conter apenas uma pagina, no caso a de home, normalmente e colocado dentro de uma diretório 'features':

```
/src
|-- /app
|   |-- /components     # Componentes reutilizáveis
|   |-- /models         # Modelos de dados (interfaces)
|   |-- /pages          # Componentes de página (containers)
|   |-- /pipes          # Pipes customizados
|   |-- /services       # Serviços (lógica de negócio, API)
|   |-- app.config.ts   # Configurações globais da aplicação
|   |-- app.routes.ts   # Definição de rotas
|-- /assets             # Arquivos estáticos (imagens, etc.)
|-- /environments       # Arquivos de configuração de ambiente
```

## 🚀 Instruções de Execução

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18.x ou superior)
-   [Angular CLI](https://angular.io/cli) (versão 18.x ou superior)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/erikbernard/exchange-rate.git
    ```

2.  Navegue até o diretório do projeto:
    ```bash
    cd exchange-rate
    ```

3.  Instale as dependências:
    ```bash
    npm install
    ```

### Configurando Variáveis de Ambiente

Antes de executar, você precisa configurar as variáveis de ambiente. No `src/environments/environment.ts` e preencha as informações da API.

**`src/environments/environment.ts`**
```typescript
export const environment = {
  production: false,
  apiUrl: 'URL_DA_SUA_API', // Ex: https://api.exchangerate-api.com/v4/latest
  apiKey: 'SUA_CHAVE_DE_API' // Se a API exigir uma chave
};
```
Faça o mesmo para o arquivo `src/environments/environment.prod.ts` para o ambiente de produção.

### Executando a Aplicação

1.  Inicie o servidor de desenvolvimento:
    ```bash
    ng serve
    ```

2.  Abra seu navegador e acesse `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos de origem.

## 🧪 Testes Unitários

Para garantir a qualidade e o funcionamento correto dos componentes, serviços e pipes, foram criados testes unitários com Karma e Jasmine.

Para executar os testes, utilize o seguinte comando:

```bash
ng test
```

Isso iniciará o executor de testes Karma, que abrirá um navegador para exibir os resultados.

## 📦 Deploy

Para gerar uma versão de produção da aplicação, execute o comando abaixo:

```bash
ng build
```

Os artefatos da compilação serão armazenados no diretório `dist/`. Você pode então implantar o conteúdo deste diretório em qualquer servidor web estático.

