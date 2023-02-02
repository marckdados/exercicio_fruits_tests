import app from "app";
import httpStatus from "http-status";
import supertest from "supertest";

describe("testing fruits", () => {
  it("get all fruits with array no have data", async () => {
    const result = await supertest(app).get("/fruits");
    expect(result.body).toEqual(expect.arrayContaining([]));
  });

  it("create fruit", async () => {
    const body = {
      name: "Caju",
      price: 1000,
    };
    const result = await supertest(app).post("/fruits").send(body);
    expect(result.status).toBe(httpStatus.CREATED);
  });

  it("create fruit with existing name", async () => {
    const body = {
      name: "Caju",
      price: 3000,
    };
    const result = await supertest(app).post("/fruits").send(body);
    expect(result.status).toBe(httpStatus.CONFLICT);
  });

  it("create fruit with body missing data", async () => {
    const body = {
      name: "Melão",
    };
    const result = await supertest(app).post("/fruits").send(body);
    expect(result.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("get all fruits with array having data", async () => {
    const result = await supertest(app).get("/fruits");
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
        }),
      ])
    );
  });

  it("get unique fruit per id", async () => {
    const id = 1;
    const result = await supertest(app).get(`/fruits/${id}`);
    expect(result.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
      })
    );
  });

  it("get unique fruit but id no exists", async () => {
    const id = 29;
    const result = await supertest(app).get(`/fruits/${id}`);
    expect(result.status).toBe(httpStatus.NOT_FOUND);
  });
});
