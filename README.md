# PoC Invillia - Star Wars Character List

## Overview

Listagem dos personagens de Star Wars, com algumas informações sobre eles e suas Starships.

O projeto foi realizado utilizando ReactJS, Bootstrap, CSS e HTML.
Foi utilizado o axios para o consumo das APIs utilizadas.

Tentei realizar o projeto de uma forma clean ambientando no tema.
Adicionei um campo de pesquisa, para pesquisas pelo nome do Personagem.
Quando o personagem possui uma Starship, o botão fica habilitado e uma Modal abre com a lista delas.
Tentei atender ao máximo de requisitos solicitados.

## Quick Start

Requisitos:

- node e npm

Clonando o projeto:

```
> git clone https://github.com/Marcelosyd/pocInvillia.git
> cd pocInvillia
> yarn install
> yarn start
```

## Dependências

    "axios": "^0.19.2",
    "bootstrap": "^4.4.1",
    "react": "^16.13.0",
    "react-bootstrap": "^1.0.0-beta.17",
    "react-dom": "^16.13.0",
    "react-scripts": "3.4.0"

## API Google

Na pasta /src/services/, no arquivo api.js, contém a key do Google Search Custom que pode ser necessário gerar outra em, https://developers.google.com/custom-search/v1/overview. Isso pois a versão free tem limite de consultas.
