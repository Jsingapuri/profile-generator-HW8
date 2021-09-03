const Manager = require("../lib/Manager");

describe("test manager class", () => {
    const manager = new manager("cat","cat@cat.com","1", "7201675309");


    expect(manager.getOfficeNumber()).toBe("7201675039");

});