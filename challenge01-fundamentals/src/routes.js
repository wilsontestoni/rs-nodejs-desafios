import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {

      const { title, description } = req.body

      if (!title || typeof title !== 'string' || title.trim() === '') {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Title is required and must be a non-empty string' }))
        
      }
  
      if (!description || typeof description !== 'string' || description.trim() === '') {
        res.statusCode = 400;
        return res.writeend(JSON.stringify({ error: 'Description is required and must be a non-empty string' }))
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: null
      }

      database.insert('tasks', req.body ? task : null)

      res.statusCode = 201;
      return res.end()
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const search = req.query
      
      const tasks = database.select('tasks', search ? search : null)

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      
      database.delete('tasks', id)

      res.statusCode = 204;
      return res.end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const [task] = database.select('tasks', { id })

      if(!task) {
        res.statusCode = 404;
        return res.end()
      }
      
      const taskCompleted = !!task.completed_at
      const completed_at = taskCompleted ? null : new Date().toISOString()     

      database.update('tasks', id, { completed_at })

      res.statusCode = 204;
      return res.end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title || typeof title !== 'string' || title.trim() === '') {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Title is required and must be a non-empty string' }))
      }
  
      if (!description || typeof description !== 'string' || description.trim() === '') {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Description is required and must be a non-empty string' }))
      }

      database.update('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date().toISOString()
      })

      res.statusCode = 204;
      return res.end()
    }
  },

]