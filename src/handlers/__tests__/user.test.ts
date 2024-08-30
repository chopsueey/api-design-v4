import * as user from "../user";

// Will create an actual new user in your database.
// Make sure to delete the user or you have to change the username,
// as it must be unique.
// In real life it is better to test on a different database than your actual prod DB.
// Every test should be stateless and shouldn't rely on other tests.
// If so, you would need to write tests for your tests at some point.

describe("user handler", () => {
  it("should create a new user", async () => {
    const req = { body: { username: "hello", password: "hi" } };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res, () => {});
  });
});
