const Employee = require("../lib/Employee");

describe("test employee class", () => {
    const employee = new Employee("cat","cat@cat.com","1");

    expect(employee.getName()).toBe("cat");
    expect(employee.getEmail()).toBe("cat@cat.com");
    expect(employee.getId()).toBe("1");
});