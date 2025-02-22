import 'dotenv/config'
import fastify from 'fastify'
import { petsRoutes } from './http/controller/pets'
 
const app = fastify()

app.register(petsRoutes);

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT,
}).then(() => {
  console.log('HTTP server running');
})
