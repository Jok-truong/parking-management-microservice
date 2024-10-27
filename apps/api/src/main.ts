import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //stackoverflow.com/questions/78138516/how-to-redirect-to-apollo-graphql-sandbox-from-nestjs-app-in-local
  app.enableCors({
    origin: '*',
    credentials: true,
    // all headers that client are allowed to use
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  })
  const config = new DocumentBuilder()
    .setTitle('Parking Management')
    .setDescription(
      `The Parking Management API.
<h2>Looking for the graphql api?</h2>
Go to <a href="/graphql" target="_blank">/graphql</a>.
Or,
You might also need to use the <a target="_blank" href="https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:${PORT}/graphql&document=query users{users{ uid }}
">Apollo explorer</a> for a greater experience.
      `,
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)

  await app.listen(PORT, '0.0.0.0')

  console.log(
    `Listening on port http://localhost:${PORT}. Graphql server started on http://localhost:${PORT}/graphql`,
  )
}
bootstrap()
