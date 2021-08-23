import request from "supertest";
import app from "../src/app";

import { sequelize } from "../src/sequelize";

const api = "/api/v1";

beforeAll(async () => {
  await sequelize.sync({ logging: false });
});

describe("Describe Wallet System", () => {
  test("it should signup a new customer", async () => {
    return request(app)
      .post(`${api}/signup`)
      .send({
        fullname: "Florence Wazobia",
        email: "wazobia@gmail.com",
        phone_no: "08099345709",
        username: "wazobia",
      })
      .expect(201);
  });

  test("it should not verify the otp", async () => {
    return request(app)
      .patch(`${api}/verify`)
      .send({
        otp: "2343",
      })
      .expect(400);
  });

  test("it should not generate new otp", async () => {
    return request(app)
      .patch(`${api}/generate`)
      .send({
        otp: "2343",
      })
      .expect(404);
  });

  test("it should not transfer the amount", async () => {
    return request(app)
      .patch(`${api}/transfer`)
      .send({
        account_no: "0023786995",
        amount: "1200",
      })
      .expect(400);
  });
});
