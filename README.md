# D'Gusto La Pizza

### Requisitos:

### JDK 11

Instalação: https://jdk.java.net/archive/

Configurando no windows: adicionar a variável de ambiente JAVA_HOME: 

https://www.devmedia.com.br/preparacao-do-ambiente-para-desenvolvimento-em-java/25188

### Maven

Instalação: https://maven.apache.org/index.html

Configurando no windows: adicionar a variável de ambiente MAVEN_HOME: 

https://pt.stackoverflow.com/questions/259927/como-configurar-vari%C3%A1veis-de-ambiente-maven-java 

### API Url

AWS - http://3.130.86.83:8080/

### Protótipo (figma)

https://www.figma.com/file/vVbIIxSkU2UjmnGDaTggoP/Prot%C3%B3tipo---%5BPUCPR%5D---OISI---D'gusto-La-Pizza?node-id=1171%3A9223


## Instalação de dependências:

Na pasta `back` rode o seguinte comando:

``mvn install``

Na pasta `front` rode o seguinte comando:

``npm install`` ou se preferir ``yarn install`` 

## Executar o back-end:

Na pasta `back` rode o seguinte comando:

``mvn spring-boot:run`` 

E seu servidor deverá estar rodando na porta 8080.

## Executar o front-end:

Na pasta `front` rode o seguinte comando:

``npm run dev`` 

E seu servidor deverá estar rodando na porta 3000.

## Banco de dados:

Para acessar o banco de dados você pode subir o MySQL e o servidor Apache no XAMPP e importar o arquivo da pasta `db` pelo phpmyadmin

PS: Não esqueça de criar o banco de dados `dgusto` para fazer a importação

## Sugestões:

Você pode testar os retornos da API utilizando o ``Postman`` ou o ``Insomnia``

- Postman download for Windows: https://www.postman.com/downloads/
- Insomnia download for Windows: https://insomnia.rest/download

Para o back-end recomenda-se a utilização da IDE IntelliJ IDEA

- IntelliJ IDEA download for Windows: https://www.jetbrains.com/pt-br/idea/download
