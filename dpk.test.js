const { deterministicPartitionKey } = require("./dpk");

const defaultResult = '58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2';
const undefinedResult = 'c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862';
const emptyResult = 'b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6';
const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.';
const longTextSha256 = 'dabf5eef04b0ea9221a6353983ea585046d6db19dd8bca67aad031d849e37466aca5e9d6fa6855263f26cb31bda3cea4d15646881d7f33f6d561160b6c2050b7';
const incorrectTextOutput = '3bcc076dd92a1b6aee405dd27c42db180ad2a93eccdabde3d3d394bfe3d109949ba547664fbead715ea42104ce437f4639190c3bfea10e1c42668cbad424b077';

describe("deterministicPartitionKey base", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  
  it("Returns the hex equal undefinedResult when given empty event", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).toBe(undefinedResult);
  });
  
  it("Returns the hex equal emptyResult when given empty partition key", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: ''});
    expect(trivialKey).toBe(emptyResult);
  });
  
  it("Returns the hex equal undefinedResult when given undefined partition key", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: undefined});
    expect(trivialKey).toBe(undefinedResult);
  });
  
  it("Returns the hex equal defaultResult when given null partition key", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: null});
    expect(trivialKey).toBe(defaultResult);
  });
});

describe("deterministicPartitionKey advance check", () => {
  it("Returns the hex equal incorrectTextOutput when given incorrect input", () => {
    const trivialKey = deterministicPartitionKey({abc: 'test'});
    expect(trivialKey).toBe(incorrectTextOutput);
  });

  it("Returns the literal test when given test input", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 'test'});
    expect(trivialKey).toBe("test");
  });

  it("Returns the literal test when given number input", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 123});
    expect(trivialKey).toBe("123");
  });
  
  it("Returns the longtextsha256 when given longText input", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: longText});
    expect(trivialKey).toBe(longTextSha256);
  });
});
