const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Estado y tipo dato correcto de los cafes", async () => {
        const { statusCode: code, body: cafes } = await request(server)
            .get("/cafes")
            .send();
        expect(code).toBe(200);
        expect(cafes).toBeInstanceOf(Array);
        expect(cafes.length).toBeGreaterThanOrEqual(1);
    });

    it("Borrar id inexistente", async () => {
        const token = "jwt";
        const idInvalid = 123456789;
        const { statusCode } = await request(server)
            .delete(`/cafes/${idInvalid}`)
            .set("Authorization", token)
            .send();
        expect(statusCode).toBe(404);
    });

    it("Agregando un cafe", async () => {
        const agregado = { id: 123456789, nombre: "nuevo" };
        const { statusCode, body } = await request(server)
            .post("/cafes")
            .send(agregado);
        expect(statusCode).toBe(201);
        expect(body).toContainEqual(agregado);
    });

    it("Acutalizando los cafes", async () => {
        const idTest = 100;
        const newCafe = { idTest: idTest + 1, nombre: "Vainilla" };
        const { statusCode } = await request(server)
            .put(`/cafes/${idTest}`)
            .send(newCafe);
        expect(statusCode).toBe(400)
        
    });
});
