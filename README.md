## Controller
In NestJS, a Controller is the entry point of the application, responsible for handling and responding to HTTP requests. It is identified by the `@Controller` decorator and uses other decorators like `@Get`, `@Post`, etc., to define routes and HTTP methods. Controllers are responsible for exposing the application's logic to the clients.

## Module
A Module in NestJS is a class that organizes the structure of the application. It gathers Controllers, Providers (such as services and repositories), and other necessary configurations. Every NestJS application has a root module, and additional modules can be created and imported to modularize the application. The `@Module` decorator configures the Controllers, Providers, and other modules needed.

## Service
A Service in NestJS is a class that contains business logic or other functionalities that need to be reused or injected into other parts of the application. Identified by the `@Injectable` decorator, Services are declared in the `Providers` of a module and can be injected into Controllers or other Services. In NestJS, anything that isn't a Controller is typically a Provider.