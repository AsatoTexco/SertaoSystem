## Requisitos

- Node v18.17+

## Getting Started

Clone Project:
```bash
git clone https://github.com/AsatoTexco/SertaoRush.git
```

Instalando as Dependências:
```bash
npm install
# or
yarn install
# or 
pnpm install
# or 
bun install 
```
Executar:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador para visualizar o Resultado.
 

 
## Documentação da API

#### Retorna um Token JWT

```http
  POST /api/users/login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório**. |
| `password` | `string` | **Obrigatório**.  |

#### Válida o Token JWT e retorna Boolean
```http
  POST /api/users/validate-token
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token`      | `string` | **Obrigatório**. O token do Usuário |

 
#### Retorna todos os produtos disponíveis
```http
  GET /api/products/
```

 #### Retorna o produto pelo ID
```http
  GET api/products/[id]
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Campo Retornado |
| `titulo`      | `string` | Campo Retornado |
| `descricao`      | `string` | Campo Retornado |
| `valor`      | `float` | Campo Retornado |
| `qnt`      | `int` | Campo Retornado |
| `image`      | `string` | Campo Retornado |

 
 

 #### Retorna o produto editado
```http
  PUT api/products/[id]
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ | 
| `token`      | `string` | **Obrigatório**. Token JWT do usuário |
| `titulo`      | `string` | **Obrigatório**. Titulo a ser modificado |
| `descricao`      | `string` | **Obrigatório**. Descrição a ser modificada |
| `valor`      | `float` | **Obrigatório**. valor a ser modificado |
| `qnt`      | `int` | **Obrigatório**. quantidade a ser modificado |
| `image`      | `string` | **Opcional**. image a ser modificado |

  
#### Retorna o produto Excluído
```http
  DELETE api/products/[id]
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ | 
| `token`      | `string` | **Obrigatório**. Token JWT do usuário |


 #### Retorna o produto Excluído
```http
  PUT api/products/qnt/[id]
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ | 
| `token`      | `string` | **Obrigatório**. Token JWT do usuário |
| `qnt`      | `string` | **Obrigatório**. Quantidade a ser atualizada |

 #### Cadastra e retorna o Produto cadastrado
```http
  POST api/products/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ | 
| `token`      | `string` | **Obrigatório**. Token JWT do usuário |
| `qnt`      | `string` | **Obrigatório**. Quantidade a ser atualizada |


 ## Documentação de cores

| Cor               | Hexadecimal                                                |
| ----------------- | ---------------------------------------------------------------- |
| Cor 1       | ![#022873](https://via.placeholder.com/10/022873?text=+) #022873 |
| Cor 2       | ![#0460D9](https://via.placeholder.com/10/0460D9?text=+) #0460D9 |
| Cor 3       | ![#022859](https://via.placeholder.com/10/022859?text=+) #022859 |
| Cor 4       | ![#0597F2](https://via.placeholder.com/10/00b48a?text=+) #0597F2 |
| Cor Background       | ![#0D0D0D](https://via.placeholder.com/10/0D0D0D?text=+) #0D0D0D |
 
 
 


## Stacks utilizada

**Framework:** NextJs

**Front-end:** React , TailwindCSS

**Back-end:** Node, Cookies, JWT

Veja o Exemplo Hospedado:
[Site](https://sertao-rush-kldexnywa-asatotexcos-projects.vercel.app/)