import axios from 'axios';
import * as schema from "../src/api/schema";
import { matchers } from 'jest-json-schema';
expect.extend(matchers);



const url = "http://www.boredapi.com/api/activity";
describe('Test https://www.boredapi.com/ ', () => {
    describe('Test GET /api/activity/',  () => {
        //const res = await axios.get( url);
        const res = {
            status: 200,
            data: {
                activity: {type: "string"},
                accessibility: {type: "number"},
                type: {type: "string"},
                participants: {type: "number"},
                price: {type: "number"},
                link: {type: "string"},
                key: {type: "string"}
            }};

        test('Is status 200', () => {
            expect(res.status).toBe(200);
        });
        test('Has "activity" property', () => {
            expect(res.data).toHaveProperty("activity");
        });
        test('Has "accessibility" property', () => {
            expect(res.data).toHaveProperty("accessibility");
        });
        test('Has "participants" property', () => {
            expect(res.data).toHaveProperty("participants");
        });
        test('Has "price" property', () => {
            expect(res.data).toHaveProperty("price");
        });
        test('Has "key" property', () => {
            expect(res.data).toHaveProperty("key");
        });
        test('Has "link" property', () => {
            expect(res.data).toHaveProperty("link");
        });
        test('Is "link" property existed', () => {
            expect(res.data.link).toBeDefined();
        });
        test('Response JSON matches schema', () => {
            expect(res.data).toMatchSchema(schema);
        });
        console.log(res.data);
    });
    test('Test GET /api/activity?key=:key', async () => {
        const key_id = "5881028";
        const res = await axios.get(url, {params: { key: key_id } });
        expect(res.status).toBe(200);
        expect(res.data.key).toBe(key_id);
        expect(res.data).toMatchSchema(schema);
        console.log(res.data);
    });
    test('Test GET /api/activity?type=:type', async () => {
        const type = "recreational";
        const res = await axios.get(url, {params: { type: type } });
        expect(res.status).toBe(200);
        expect(res.data.type).toBe(type);
        console.log(res.data);
    });
    test('Test GET /api/activity?participants=:participants', async () => {
        const parts = 2;
        const res = await axios.get(url, {params: { participants: parts } });
        expect(res.status).toBe(200);
        expect(res.data.participants).toBe(parts);
        console.log(res.data);
    });
    test('Test GET /api/activity?price=:price', async () => {
        const price_min = 0.1;
        const res = await axios.get(url, {params: { price: price_min } });
        expect(res.status).toBe(200);
        expect(res.data.price).toBeCloseTo(price_min);
        console.log(res.data);
    });
    test('Test GET /api/activity?minprice=:minprice&maxprice=:maxprice', async () => {
        const price_min = 0.1;
        const price_max = 2.5;
        const res = await axios.get(url,{params: { minprice: price_min,  maxprice: price_max} });
        expect(res.status).toBe(200);
        expect(res.data.price).toBeGreaterThanOrEqual(price_min);
        expect(res.data.price).toBeLessThanOrEqual(price_max);
        console.log(res.data);
    });
    test('Test GET /api/activity?accessibility=:accessibility', async () => {
        const accessibility_min = 0;
        const res = await axios.get(url,{params: { accessibility: accessibility_min} });
        expect(res.status).toBe(200);
        expect(res.data.accessibility).toBe(accessibility_min);
        expect(res.data).toMatchSchema(schema);
        console.log(res.data);
    });
    test('Test GET /api/activity?minaccessibility=:minaccessibility&maxaccessibility=:maxaccessibility', async () => {
        const accessibility_min = 0;
        const accessibility_max = 1;
        const res = await axios.get(url,{
            params: { minaccessibility: accessibility_min, maxaccessibility: accessibility_max} });
        expect(res.status).toBe(200);
        expect(res.data.price).toBeGreaterThanOrEqual(accessibility_min);
        expect(res.data.price).toBeLessThanOrEqual(accessibility_max);
        console.log(res.data);
    });
});
