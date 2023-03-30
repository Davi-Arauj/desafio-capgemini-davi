# Desafio-Capgemini

## Sobre o projeto
* Este projeto foi desenvolvido seguindo os padrões do desafio proposto pela empresa, agradeço pela oportunidade e espero fazer parte do time.

* O projeto trata de uma API NodeJS que valida sequências de caracteres dada uma matriz NxN, também busca a proporção de sequências válidas em relação ao total:

## Para execução local dos containers

- Requisitos:

>Ter o Docker instalado

  - Após realizar o download ou o clone do repositório, entre na pasta raiz do projeto e execute o seguinte comando usando o Makefile, para starta os containers

```bash
$ make up
```

 - Para executar os testes execute o seguinte comando:

 ```bash
 $ make test
 ```
 
### Este comando fará com que o projeto execute


### Rotas disponíveis:
 * post -
[localhost:3000/sequence](http:localhost:3000/sequence) <br>
    ```json
       {
        "letters": ["BUHDHB", "DBHUHD", "UUBUUU", "BHBDHH", "HDHUDB", "UDBDUH"]
       }
    ```
<br>

 * get-
[localhost:3000/stats](http:localhost:3000/stats) <br>
    ```json
        {
            "count_valid": 7,
            "count_invalid": 1,
            "ratio": "0.88"
        }
    ```
<br><br>

### Skills
 * NodeJS
 * MongoDB
 * Docker