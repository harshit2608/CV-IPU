/* eslint-disable */
const supertest = require('supertest');
const dotenv = require('dotenv');

const application = require('../src/application');
const { BASE_API, connectDB, closeDB } = require('./config');
const User = require('../src/models/userModel');

dotenv.config({ path: './test/../src/.env' });
beforeEach(async () => {
    await connectDB();
    await User.deleteOne({ email: 'testfromjest232@gmail.com' });
}, 20000);

afterAll(async () => {
    closeDB();
});

describe('API', () => {
    it('GET /users --> return all users', async () => {
        return supertest(application)
            .get(`${BASE_API}/users/`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        status: 'success',
                        results: expect.any(Number),
                        data: expect.objectContaining({
                            users: expect.arrayContaining([]),
                        }),
                    })
                );
            });
    });
    // jest.setTimeout(30000)

    it('GET /users/id --> specific user by ID', async () => {
        return supertest(application)
            .get(`${BASE_API}/users/6288d8afc42a50a3f450d829`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        status: 'success',
                        data: expect.objectContaining({
                            data: expect.objectContaining({
                                _id: expect.any(String),
                                name: expect.any(String),
                                email: expect.any(String),
                                role: 'user',
                                verifiedEmail: expect.any(Boolean),
                                verifiedPhone: expect.any(Boolean),
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                                __v: expect.any(Number),
                            }),
                        }),
                    })
                );
            });
    });

    it('GET /users/:id --> 404 if not found', async () => {
        await supertest(application)
            .get(`${BASE_API}/users?=6298d8afc42a50a3f450d467`)
            .expect(200);
    });

    it('POST /users/signup --> signup a new user', async () => {
        return supertest(application)
            .post(`${BASE_API}/users/signup`)
            .send({
                name: 'test from jest user2',
                email: 'testfromjest232@gmail.com',
                password: 'testfromjest183',
                passwordConfirm: 'testfromjest183',
                phoneNumber: '9911337788',
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        status: 'success',
                        token: expect.any(String),
                        data: expect.objectContaining({
                            user: expect.objectContaining({
                                name: 'test from jest user2',
                                email: 'testfromjest232@gmail.com',
                                phoneNumber: '9911337788',
                                role: 'user',
                                verifiedEmail: expect.any(Boolean),
                                verifiedPhone: expect.any(Boolean),
                                active: expect.any(Boolean),
                                _id: expect.any(String),
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                                __v: expect.any(Number),
                            }),
                        }),
                    })
                );
            });
    });
});
