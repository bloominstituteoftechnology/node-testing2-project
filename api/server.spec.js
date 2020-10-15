const supertest = require('supertest')
const server = require('./server')


describe('server', () => {
    describe('GET', () => {
        it ("should return 200", () => {
            return supertest(server).get('/').then (res=> {expect(res.status).toBe(200)})
        })
        it('should have a body api:up', () => {
            return supertest(server).get('/').then(res => {expect(res.body.api).toBe("up")} )
        })
        it("should return JSON", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });

        it('should get all posts and have a length of 4', () => {
            return supertest(server).get('/posts').then(res => {expect(res.body).toHaveLength(4)} )
        })
        it('should return first post', () => {
            return supertest(server).get('/posts').then(res => {expect(res.body[0]).toStrictEqual({id: 1,
                post_title: "Hello World",
                post_category: "Quotes",
                post_author: "Abdinajib",
                rating: 2,
                post_text: "Let your workings remain a mystery. Just show people the results."})} )
        })

    }) 
})