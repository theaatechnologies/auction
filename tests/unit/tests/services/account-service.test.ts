import { container } from "src/container";
import {AccountService} from "src/services/account-service";
import {AccountRepository} from "src/repositories/account-repository";

describe("AccountService", () => {
  const accountRepository = jest.mock("src/repositories/account-repository")
  const usersRepository = jest.mock("src/repositories/users-repository")

  const accountService = new AccountService(accountRepository, usersRepository);

  describe("Deposit money", () => {
    it("should deposit money", async () => {
      const account = {
        user: "user",
        deposit: 10
      };

      accountRepository.findByUserId = jest.fn().mockReturnValue({});
      accountRepository.save = jest.fn().mockReturnValue({});

      // act
      await accountService.deposit(account);

      // assert
      expect(accountRepository.findByUserId).toBeCalled()
    });
  });
});
