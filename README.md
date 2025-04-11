# **BACKEND-SPRING**

Esta asignatura te permitirá crear la API de tu apliación, gestionando además con ella la Base de Datos.
Este proyecto recoge el código de apoyo para ver los diferentes conceptos de la asignatura, con la filosofía de separar en distintos _**commits**_ las diferentes sesiones, para ayudar al alumno a tener el temario estructurado con ejemplos.

Para ello se ha separado en tres ramas:

1. Rama [**conceptos-iniciales**](https://git.institutomilitar.com/backend-spring/proyecto-asignatura-por-ramas/-/commits/conceptos-iniciales), donde se utiliza un proyecto SpringBoot sencillo para ver los conceptos iniciales de Spring y la utilización de Spring Boot.

    Para ello se ha separado o dividido el proyecto en los siguientes _**commits**_:
    
    - Inyectando Beans por XML
    - Anotaciones @Component
    - Cambiar paquete base para escanear
    - Desambiguar entre 2 Beans
    - ConfiguracionPorJava (@Configuration y @Bean)
    - Propiedades y @Value
    - Logging
    - Inyección de dependencias y @Autowired 

1. Rama [**persistencia-xml-clase-externa-onetomany**](https://git.institutomilitar.com/backend-spring/proyecto-asignatura-por-ramas/-/commits/persistencia-xml-clase-externa-onetomany), donde se crea un proyecto de SpringBoot sencillo para realizar una API completa nivel 3 HATEOAS, usando archivos XML para poder persistir objetos que heredan de clases externas a la API. Incluye tanto la persistencia de las entidades, metodos personalizados..., incluyendo el despliegue en la nube (tanto de la Base de Datos como de la API).

    Para ello se ha separado o dividido el proyecto en los siguientes _**commits**_:
    
    - Defino EntityManager y persisto con @Entity y @Repository
    - @OneToMany
    - @SINGLE_TABLE 
    - Persistir clase externa usando ORM por XML
    - Persistir entidad con herencia de clase externa (ORM por XML mapped-superclass con one-to-many)
    - @RepositoryRestResource API HATEOAS 3
    - Personalizando endpoints con @RestResource
    - MixIns
    - @EntityListeners
    - Añadir metodo personalizado a repositorio
    - Exponer metodo personalizado con @RepositoryRestController
    - Añadir link a /search
    - @PathVariable
    - Configuracion Rest
    - Preparando para conectar a BBDD (nube-SQL EXPRESS)
    - Para desplegar en AWS y Back4app (no se verá en clase pero se ofrece al alumno como info)
    - Para despliegue en Heroku
    - Preparando para generar Javadoc
    - Javadoc generado para exponerlo en Github pages
    - Spring Security Autenticación Básica
    - Spring Security Autenticación por JWT-Bearer token (Permite registro y login)
    - Prohibiendo registro de nuevos usuarios
    - Añadiendo colección de postman al proyecto

1. Rama [**persistencia-xml-clase-externa-no-onetomany**](https://git.institutomilitar.com/backend-spring/proyecto-asignatura-por-ramas/-/commits/persistencia-xml-clase-externa-no-onetomany), donde se crea un proyecto de SpringBoot sencillo para realizar una API completa nivel 3 HATEOAS, usando archivos XML para poder persistir objetos que heredan de clases externas a la API. Incluye tanto la persistencia de las entidades, metodos personalizados..., incluyendo el despliegue en la nube (tanto de la Base de Datos como de la API).

    La diferencia de la rama anterior es que anteriormente ha dejado de funcionar correctamente la relación _**one to many**_ sobre clases externas usando archivos XML (con alguna actualización de SpringBoot y Gradle), no pudiendose utilizar la librería externa con relaciones "one to many". Esta rama se ha creado por si se repitiese esta situación, ya que se enfocan de distinto modo las sesiones de persistencia por XML.

    Para ello se ha separado o dividido el proyecto en los siguientes _**commits**_:
    
    - Defino EntityManager y persisto con @Entity y @Repository
    - @OneToMany
    - @SINGLE_TABLE 
    - Persistir clase externa usando ORM por XML
    - Persistir entidad con herencia de clase externa (ORM por XML mapped-superclass sin one-to-many)
    - @RepositoryRestResource API HATEOAS 3
    - Personalizando endpoints con @RestResource
    - MixIns
    - @EntityListeners
    - Añadir metodo personalizado a repositorio
    - Exponer metodo personalizado con @RepositoryRestController
    - Añadir link a /search
    - @PathVariable
    - Configuracion Rest
    - Preparando para conectar a BBDD (nube-SQL EXPRESS)
    - Para desplegar en AWS y Back4app (no se verá en clase pero se ofrece al alumno como info)
    - Para despliegue en Heroku
    - Preparando para generar Javadoc
    - Javadoc generado para exponerlo en Github pages
    - Spring Security Autenticación Básica
    - Spring Security Autenticación por JWT-Bearer token (Permite registro y login)
    - Prohibiendo registro de nuevos usuarios
    - Añadiendo colección de postman al proyecto