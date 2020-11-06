const supertest = require("supertest");

  const server = require("./server.js")
 const db = require("../../data/dbConfig.js")

  beforeAll(async ()=> {
     await db("legitdata").truncate();
 })

  describe("server", ()=>{
     it("can run the tests", ()=>{
         expect(true).toBeTruthy();
     })

      describe("GET /", ()=>{
         it("should return status code 200", ()=>{
             return supertest(server).get("/").then(res=>{
                 expect(res.status).toBe(200);
             })
         })
         it("should return {api: up}", ()=>{
             return supertest(server).get("/").then(res=>{
                 expect(res.body.api).toBe("up");
             })
         })
     })
     describe("GET /api/data", ()=>{
         it("should return status code 200", ()=>{
             return supertest(server).get("/api/data").then(res=>{
                 expect(res.status).toBe(200);
             })
         })
         it("should return an array of data", ()=>{
             return supertest(server).get("/api/data").then(res=>{
                 expect(Array.isArray(res.body)).toBe(true);
             })
         })
     })
     describe("POST /api/data", ()=>{
         it("should return status code 201 on successful creation", ()=>{
             const newData = {id: 1, dataValue1: "Data Value 1", dataValue2: "Data Value 2"}
             return supertest(server).post("/api/data").send(newData).then(res=>{
                 expect(res.status).toBe(201)
             })
         })
         it("should return status code 400 on missing required info", ()=>{
             const newData = {dataValue1: "Data Value 2", dataValue3: "haha this isnt a working field"}
             return supertest(server).post("/api/data").send(newData).then(res=>{
                 expect(res.status).toBe(400)
             })
         })
     })
     describe("GET /:id", ()=>{
         it("should return status code 200 on existing data record", ()=>{
             return supertest(server).get("/api/data/1").then(res=>{
                 expect(res.status).toBe(200);
             })
         })
         it("should return an object with id matching the parameters", ()=>{
             return supertest(server).get("/api/data/1").then(res=>{
                 expect(res.body.id).toBe(1);
             })
         })
     })
     describe("DELETE /:id", ()=>{
         it("should return status code 200 upon deletion", ()=>{
             return supertest(server).delete("/api/data/1").then(res=>{
                 expect(res.status).toBe(200)
             })
         })
         it("should return status code 404 if data is not found", ()=>{
             return supertest(server).delete("/api/data/1").then(res=>{
                 expect(res.status).toBe(404);
             })
         })
     })

  }) 