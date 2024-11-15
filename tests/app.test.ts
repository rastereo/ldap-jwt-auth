import { Server } from 'http';
import request from 'supertest';

import app from '../src/app';
import ErrorMessageList from '../src/utils/errorMessageList';
import env from '../src/utils/envalid';

let server: Server;

let jwt: string;

beforeEach(async () => {
  server = await app.listen(3000);
});

afterEach(async () => {
  server.close();
});

describe('Test app', () => {
  it('Non-existent route', async () => {
    const { status } = await request(server)
      .get('/non-existent')
      .expect(404)
      .expect('Content-Type', /json/);

    expect(status).toBe(404);
  });
});

describe('POST /login', () => {
  it('Request without body', async () => {
    const { body } = await request(server)
      .post('/login')
      .expect(400)
      .expect('Content-Type', /json/);

    expect(body.message).toBe(ErrorMessageList.validationFailed);
  });

  it('Request without username', async () => {
    const { body } = await request(server)
      .post('/login')
      .send({
        password: 'longpassword',
      })
      .expect(400)
      .expect('Content-Type', /json/);

    expect(body.message).toBe(ErrorMessageList.validationFailed);
  });

  it('Request without password', async () => {
    const { body } = await request(server)
      .post('/login')
      .send({
        username: 'username',
      })
      .expect(400)
      .expect('Content-Type', /json/);

    expect(body.message).toBe(ErrorMessageList.validationFailed);
  });

  it('Request with invalid username', async () => {
    const { body } = await request(server)
      .post('/login')
      .send({
        username: 'u',
        password: 'longpassword',
      })
      .expect(400)
      .expect('Content-Type', /json/);

    expect(body.message).toBe(ErrorMessageList.validationFailed);
  });

  it('Request with invalid password', async () => {
    const { body } = await request(server)
      .post('/login')
      .send({
        username: 'username',
        password: 'l',
      })
      .expect(400)
      .expect('Content-Type', /json/);

    expect(body.message).toBe(ErrorMessageList.validationFailed);
  });

  it('Request with wrong password', async () => {
    const { body } = await request(server)
      .post('/login')
      .send({
        username: env.TEST_LDAP_UID,
        password: 'longpassword',
      })
      .expect(401)
      .expect('Content-Type', /json/);

    expect(body.message).toBe(ErrorMessageList.invalidCredentials);
  });

  it('Request with wrong username', async () => {
    const { body } = await request(server)
      .post('/login')
      .send({
        username: 'username',
        password: env.TEST_LDAP_PASSWORD,
      })
      .expect(401)
      .expect('Content-Type', /json/);

    expect(body.message).toBe(ErrorMessageList.invalidCredentials);
  });

  it('Request with valid credentials(email)', async () => {
    const { body, headers } = await request(server)
      .post('/login')
      .send({
        username: env.TEST_LDAP_EMAIL,
        password: env.TEST_LDAP_PASSWORD,
      })
      .expect(200)
      .expect('Content-Type', /json/);

    const jwtCookie = headers['set-cookie'][0];

    const jwtCookieName = jwtCookie.slice(0, env.JWT_COOKIE_NAME.length);

    expect(jwtCookie).toBeTruthy();
    expect(jwtCookieName).toBe(env.JWT_COOKIE_NAME);
    expect(typeof body.name).toBe('string');
  });

  it('Request with valid credentials(uid)', async () => {
    const { body, headers } = await request(server)
      .post('/login')
      .send({
        username: env.TEST_LDAP_UID,
        password: env.TEST_LDAP_PASSWORD,
      })
      .expect(200)
      .expect('Content-Type', /json/);

    jwt = headers['set-cookie'][0].split(';')[0];

    const jwtCookieName = jwt.slice(0, env.JWT_COOKIE_NAME.length);

    expect(jwt).toBeTruthy();
    expect(jwtCookieName).toBe(env.JWT_COOKIE_NAME);
    expect(typeof body.name).toBe('string');
  });
});

describe('GET /verify', () => {
  it('Request without cookie', async () => {
    const { body } = await request(server)
      .get('/verify')
      .expect(400)
      .expect('Content-Type', /json/);

    expect(body.message).toBe(ErrorMessageList.validationFailed);
  });

  it('Request with wrong jwt cookie', async () => {
    const { body } = await request(server)
      .get('/verify')
      .set('Cookie', [`${env.JWT_COOKIE_NAME}=asdjasdalsdkl`])
      .expect(401)
      .expect('Content-Type', /json/);

    expect(body.message).toBe(ErrorMessageList.invalidToken);
  });

  it('Request with valid jwt cookie', async () => {
    const { body } = await request(server)
      .get('/verify')
      .set('Cookie', jwt)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(typeof body.name).toBe('string');
  });
});
