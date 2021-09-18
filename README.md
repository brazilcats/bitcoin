# Bitcoin

Bitcoin é um app criado com reactjs + laravel.

## Instalação

Esteja certo de que está no diretório raiz da aplicação.

Depois de clonar o repositório em seu computador execute os seguintes comandos para instalar o node_modules:

```bash
npm install
```
Caso você queira instalar a parte do servidor é preciso instalar o diretório vendor do composer:

```bash
composer install
```

## Configurações

Se você optou por não instalar o backend, pode apenas executar o comando:

```python

npm start

```
Caso contrário, você precisa alterar o arquivo app.js em config dentro de src. Colocando como root o link do localhost: 'http://localhost:8000/'
nesse caso você precisa iniciar o servidor do laravel com o comando abaixo:

```python

php artisan serve

```
É preciso também executar o comando abaixo para criar link virtual que leva até o diretório padrão do laravel (storage): 

```python

php artisan storage:link

```

## Licença
[MIT](https://choosealicense.com/licenses/mit/)