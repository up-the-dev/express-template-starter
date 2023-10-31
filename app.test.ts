import { Add } from "./src/add";
import App from "./src/app";
import request from "supertest";

describe("App", () => {
    it("should add two numbers", () => {
        const result = Add(3, 5);
        expect(result).toBe(8);
    });

    it("should return status 200", async () => {
        const response = await request(App).get("/").send();
        expect(response.statusCode).toBe(200);
    });
});
