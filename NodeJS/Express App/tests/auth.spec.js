const verifyToken = require('../src/middleware/auth.middleware');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('Authorization middleware test', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: code => ({
                send: message => ({ code, message })
            })
        }
    })

    test('without cookies', () => {
        let expectedResponse = 'Token is required';
        const result = verifyToken(mockRequest, mockResponse, nextFunction);
        console.log(result);
        expect(result.code).toBe(403);
        expect(result.message).toBe(expectedResponse);
    })

    test('with cookies', () => {
        const token = jwt.sign({ iss: 'For_Testing_Only' }, process.env.JWT_ACCESS_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
        })
        mockRequest = {
            cookies: {
                access_token: token
            }
        }
        verifyToken(mockRequest, mockResponse, nextFunction);
        expect(nextFunction).toBeCalledTimes(1);
    })

})