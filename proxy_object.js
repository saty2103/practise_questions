const student = {
  name: "Alpha Student",
  age: 40,
  gender: "Male",
};

const handler = {
  get(target, property) {
    if (property === "age") {
      return new Error("Its a secret. Nobody is allowed to know that.");
    } else {
      return Reflect.get(...arguments);
    }
  },

  set(target, property, value) {
    /**
     * can be used to apply checks like typescript on object updates
     */
    if (property === "gender" && !(value === "Male" || value === "Female")) {
      console.log("Gender can be either Male or Female");
    } else {
      return Reflect.set(...arguments);
    }
  },
};

const proxyStudent = new Proxy(student, handler);
