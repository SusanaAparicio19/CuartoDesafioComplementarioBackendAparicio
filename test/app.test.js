import { describe, it } from "node:test";
import assert from "assert";
import supertest from "supertest";

import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../src/config.js'

const baseUrl = 'http://localhost:8080'

const requester = supertest(baseUrl)


const mockLoginCredentials = {
  "username": "Totu",
  "password": "987"
}

describe('Pruebas funcionales', () => {

  before(async () => {
    await mongoose.connect(MONGODB_CNX_STR)
  })

  after(async () => {
    await mongoose.disconnect()
  })
/*
  describe('Usuarios', () => {

    beforeEach(async () => {
      await mongoose.connection.collection('users').drop()
    })

    after(async () => {
      await mongoose.connection.collection('users').drop()
    })*/

    describe('Logueo de Usuario', () => {

      describe('con datos válidos', () => {
        it('loguear un usuario', async () => {
          const { body } = await requester
            .post('/api/sessions')
            .send(mockLoginCredentials)

          assert.ok(body?.payload?._id)
        })
      })
  })
})