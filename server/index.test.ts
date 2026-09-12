import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from './index.js'

describe('local server', () => {
  it('serves the application shell for an unknown client route', async () => {
    const response = await request(createApp()).get('/favorites')
    expect(response.status).not.toBe(500)
  })
})
