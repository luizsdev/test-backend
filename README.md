


## 🎯 ABOUT

  **Its a Service API where it's possible to schedule services of a company**

## 🚀 TECHNOLOGIES

- MySQL
- Prisma
- Express
- TypeScript
- Jest
- Supertest
- Date-FNS


## 🌌 LICENSE

Distributed over the lincence of MIT. look`LICENSE.md` for more info.

## ✅ How to run it locally

- Create in root of the project the file .env and set the database credential, as shown: DATABASE_URL="MySQL" 

```bash

npm install

npm run build
npm run start

```

## 🏁 How to test the application

- **Using npm**

```bash
npm run test
```

## 📝API Endpoints

<details>
<summary>SERVICE ROUTES</summary>

`GET` `/servicos` -> Return a list of all registered services</br>

`GET` `/servicos/?titulo=XXX&desc=XXX&id_tipo_servico=XXX` ->Return a list of services based on the args passed</br>

`DELETE` `/servicos/:id` -> Remove a service based on the paramated if of the requisition </br>

`POST` `/servicos` -> Create a new service based on a date, as the example below:

```json
{
"tituloServico":  "teste",
"descServico":  "teste",
"dataServico":  "10/20/2022",
"idTipoServico":  "1",
"idUsuario":  "1"
}
```

`Post` `/servicomultiplo`-> Create multiple services based on a limit date and the days of the week it should be repeated, passed in an array opcoes with values: "seq, ter, qua, qui, sex, sab, dom'. As the example below  </br>

```json
{
"tituloServico":  "Primeiro",
"descServico":  "teste",
"dataLimite":  "12/30/2022",
"opcoes":["seg","qua"],
"idTipoServico":  "1",
"idUsuario":  "1"
}
```
In this example, it is registering services all mondays and wednesdays until 30th of December.



</details>


