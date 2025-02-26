import 'dotenv/config'
import fastify from 'fastify'
import { petsRoutes } from './http/controller/pets'
import { organizationsRoutes } from './http/controller/organizations';
 
const app = fastify()

app.register(petsRoutes);
app.register(organizationsRoutes);

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT,
}).then(() => {
  console.log('HTTP server running');
})
