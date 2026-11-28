import { generateAccessToken } from "../lib/paypal";
import { expect, test } from "@jest/globals";

// Test to generate access token from paypal

test("generates a token from paypal", async () => {
  const tokenRespnse = await generateAccessToken();
  console.log(tokenRespnse);
  expect(typeof tokenRespnse).toBe("string");
  expect(tokenRespnse.length).toBeGreaterThan(0);
}, 15000);
