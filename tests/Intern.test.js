const Intern = require("../lib/Intern");

describe("test intern class", () => {
    const intern = new intern("cat","cat@cat.com","1", "DU");

    expect(intern.getSchool()).toBe("DU");

});