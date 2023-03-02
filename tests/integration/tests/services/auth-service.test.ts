import {container} from "src/container";
import {UsersService} from "src/services/users-service";

describe("Authentication", () => {
    const userService = container.get(UsersService);

    describe("Register", () => {
        it("should create user", async () => {
            const user = {
                id: "a1039581-065f-4b80-9051-e49166f31046",
                email: "ahmad@gmail.com",
                username: "ahmad",
                password: "pass"
            };

            const result = await userService.createUser(user);
            expect(result).not.toBe(null);
        });
    });
});
