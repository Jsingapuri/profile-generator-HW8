const Engineer = require("../lib/Engineer");

describe("test engineer class", () => {
    const engineer = new Engineer("cat","cat@cat.com","1", "cat1");

    expect(engineer.getGitHub()).toBe("cat1");

});