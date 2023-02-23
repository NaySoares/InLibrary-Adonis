import { test } from '@japa/runner';
import User from 'App/Models/User';

test('display welcome page', async ({ client }) => {
  const response = await client.get('/');

  response.assertStatus(200);
  response.assertBodyContains({ hello: 'world' });
});

test('Should be able to list all users', async ({ client }) => {
  const response = await client.get('/users');

  response.assertStatus(200);
  response.assertBodyContains(User);
});
