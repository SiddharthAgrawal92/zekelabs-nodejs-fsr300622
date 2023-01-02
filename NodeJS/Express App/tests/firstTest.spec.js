test('For Equality and Greater/Less than', () => {
    const a = 10, b = 5;
    let result = a + b;
    expect(result).toBe(15);
    expect(result).toEqual(15);
    expect(result).toBeGreaterThan(10);
    expect(result).toBeGreaterThanOrEqual(15);
    expect(result).toBeLessThan(16);
    expect(result).toBeLessThanOrEqual(15);
})

test('For Truthy/Falsy', () => {
    // falsy values - null, undefined, NaN, 0, false, ""(empty string)
    //truthy values - [], {}, 1.0, true, Infinity/-Infinity
    let value = [];
    // expect(value).toBeNull();
    // expect(value).not.toBeNull(); // === null
    // expect(value).toBeUndefined(); //  === undefined
    // expect(value).not.toBeUndefined(); // defined !== undefined
    // expect(value).toBeDefined(); // defined !== undefined
    // expect(value).not.toBeDefined(); // === undefined
    expect(value).toBeTruthy();
    // expect(value).toBeFalsy();
    // expect(value).not.toBeTruthy();
    // expect(value).not.toBeFalsy();
})

test('For Floating', () => {
    let result = 0.1 + 0.2; // !== 0.3 to get the precised value i.e. 0.3 you can use decimal.js
    // expect(result).toBe(0.3);
    expect(result).toBeCloseTo(0.3);
})

test('For Array', () => {
    const itemList = ['Apples', 'Chocolates', 'Snacks', 'Anonymous'];
    const value = 'Apples';
    expect(itemList).toContain(value);
})

const getModule = () => {
    throw new Error('Module import failed');
}

test('For Module Import', () => {
    // expect(() => getModule()).toThrow();
    // expect(() => getModule()).toThrow(Error);
    // expect(() => getModule()).toThrow('Module import failed');
    //check using regex
    // expect(() => getModule()).toThrow(/import/);
    // expect(() => getModule()).toThrow(/^Module import failed$/);
})

const getData = async () => 'Success';

test('For async', async () => {
    //method-1
    // const result = await getData();
    // expect(result).toBe('Success');

    //method-2
    // await expect(getData()).resolves.toBe('Success');

    try {
        await getData();
    } catch (e) {
        expect(e).toBe('Error');
    }
})

const getCallBack = (cb) => {
    return cb(null, 'Data from callback');
}

test('For Callbacks', () => {
    const callbackToBeCalled = (err, data) => {
        if (err) {
            throw err;
        } else {
            expect(data).toBe('Data from callback');
        }
    }
    getCallBack(callbackToBeCalled);
})