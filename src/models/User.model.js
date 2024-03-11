import mongoose from 'mongoose';
//import { randomUUID } from "node:crypto";
import bcrypt from 'bcrypt';

import { Schema, model } from 'mongoose'

const schema = new Schema({
  _id: { type: String },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  displayName: { type: String, required: true },
  rol: { type: String }
}, {
  versionKey: false,
  strict: 'throw',
  methods: {
    toPOJO: function () { return JSON.parse(JSON.stringify(this)) }
  }
})


export const userModel = model('users', schema)




