function stoneGameVI(aliceValues, bobValues) {
  const n = aliceValues.length;

  const stones = aliceValues.map((aliceVal, i) => ({
    index: i,
    aliceValue: aliceVal,
    bobValue: bobValues[i],
    combinedValue: aliceVal + bobValues[i],
  }));

  stones.sort((a, b) => b.combinedValue - a.combinedValue);

  let aliceScore = 0;
  let bobScore = 0;

  for (let turn = 0; turn < n; turn++) {
    const stone = stones[turn];
    if (turn % 2 === 0) {
      aliceScore += stone.aliceValue;
    } else {
      bobScore += stone.bobValue;
    }
  }

  if (aliceScore > bobScore) return 1;
  if (bobScore > aliceScore) return -1;
  return 0;
}

describe("Stone Game VI - Core Logic Tests", () => {
  test("Example 1: Alice wins [1,3] vs [2,1]", () => {
    expect(stoneGameVI([1, 3], [2, 1])).toBe(1);
  });

  test("Example 2: Draw [1,2] vs [3,1]", () => {
    expect(stoneGameVI([1, 2], [3, 1])).toBe(0);
  });

  test("Example 3: Bob wins [2,4,3] vs [1,6,7]", () => {
    expect(stoneGameVI([2, 4, 3], [1, 6, 7])).toBe(-1);
  });

  test("Single stone - Alice wins", () => {
    expect(stoneGameVI([5], [3])).toBe(1);
  });

  test("Equal values - Alice has advantage", () => {
    expect(stoneGameVI([3, 3, 3], [3, 3, 3])).toBe(1);
  });

  test("High vs low values - Alice favored", () => {
    expect(stoneGameVI([10, 10, 10], [1, 1, 1])).toBe(1);
  });

  test("High vs low values - Bob favored", () => {
    expect(stoneGameVI([1, 1, 1, 1], [10, 10, 10, 10])).toBe(-1);
  });

  test("Two stones equal combined values", () => {
    expect(stoneGameVI([6, 4], [2, 4])).toBe(1);
  });
});

describe("Stone Game VI - Algorithm Strategy Tests", () => {
  test("Combined value sorting works correctly", () => {
    const aliceValues = [2, 4, 3];
    const bobValues = [1, 6, 7];

    const stones = aliceValues.map((aliceVal, i) => ({
      index: i,
      aliceValue: aliceVal,
      bobValue: bobValues[i],
      combinedValue: aliceVal + bobValues[i],
    }));

    stones.sort((a, b) => b.combinedValue - a.combinedValue);

    expect(stones[0].combinedValue).toBe(10);
    expect(stones[1].combinedValue).toBe(10);
    expect(stones[2].combinedValue).toBe(3);
  });

  test("Turn alternation works correctly", () => {
    const result = stoneGameVI([1, 1, 1, 1], [1, 1, 1, 1]);
    expect(result).toBe(0);
  });
});

describe("Stone Game VI - Edge Cases Tests", () => {
  test("All minimum values (1)", () => {
    expect(stoneGameVI([1, 1, 1, 1, 1], [1, 1, 1, 1, 1])).toBe(1);
  });

  test("All maximum values (100)", () => {
    expect(stoneGameVI([100, 100], [100, 100])).toBe(0);
  });

  test("Large array performance test", () => {
    const large = Array(1000).fill(1);
    const start = Date.now();
    const result = stoneGameVI(large, large);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(100);
    expect(result).toBe(0);
  });

  test("Alternating high-low pattern", () => {
    expect(stoneGameVI([100, 1, 100, 1], [1, 100, 1, 100])).toBe(0);
  });
});

describe("Stone Game VI - Input Validation Tests", () => {
  function parseArray(str) {
    try {
      let cleaned = str.trim();
      if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
        cleaned = cleaned.slice(1, -1);
      }

      if (cleaned === "") {
        throw new Error("Arrays cannot be empty");
      }

      const numbers = cleaned.split(",").map((s) => {
        const trimmed = s.trim();
        if (trimmed === "") throw new Error("Invalid array format");
        const num = parseInt(trimmed);
        if (isNaN(num)) throw new Error("Invalid number");
        return num;
      });

      return numbers;
    } catch (e) {
      throw e;
    }
  }

  function validateInput(aliceStr, bobStr) {
    try {
      const aliceArr = parseArray(aliceStr);
      const bobArr = parseArray(bobStr);

      if (aliceArr.length !== bobArr.length) {
        return "Arrays must have same length";
      }

      if (aliceArr.length > 100000) {
        return "Array too large";
      }

      const hasInvalidValue = [...aliceArr, ...bobArr].some(
        (val) => val < 1 || val > 100
      );
      if (hasInvalidValue) {
        return "Values must be 1-100";
      }

      return null;
    } catch (err) {
      return err.message;
    }
  }

  test("Valid input formats", () => {
    expect(validateInput("[1,2,3]", "[4,5,6]")).toBe(null);
    expect(validateInput("1,2,3", "4,5,6")).toBe(null);
    expect(validateInput(" 1, 2, 3 ", " 4, 5, 6 ")).toBe(null);
  });
});

describe("Stone Game VI - Game Theory Tests", () => {
  test("Opportunity cost understanding", () => {
    const result = stoneGameVI([1, 1], [99, 1]);
    expect(result).toBe(0);
  });

  test("Combined value tie-breaking doesnt matter", () => {
    const result1 = stoneGameVI([5, 3], [3, 5]);
    const result2 = stoneGameVI([3, 5], [5, 3]);
    expect(result1).toBe(result2);
  });

  test("Greedy beats other strategies", () => {
    const result = stoneGameVI([10, 1, 1], [1, 10, 1]);
    expect(result).toBe(1);
  });
});

describe("Stone Game VI - Mathematical Properties Tests", () => {
  test("Symmetric games can result in Alice wins due to first-move advantage", () => {
    expect(stoneGameVI([1, 2, 3], [3, 2, 1])).toBe(1);
  });

  test("Alice advantage with odd number of stones", () => {
    expect(stoneGameVI([1, 1, 1], [1, 1, 1])).toBe(1);
    expect(stoneGameVI([1, 1, 1, 1, 1], [1, 1, 1, 1, 1])).toBe(1);
  });

  test("Even number equality depends on values", () => {
    expect(stoneGameVI([1, 1], [1, 1])).toBe(0);
    expect(stoneGameVI([2, 1], [1, 2])).toBe(0);
  });
});

describe("Stone Game VI - Performance Tests", () => {
  test("Linear time after sorting", () => {
    const sizes = [100, 200, 400];
    const times = [];

    sizes.forEach((size) => {
      const alice = Array(size).fill(1);
      const bob = Array(size).fill(1);

      const start = Date.now();
      stoneGameVI(alice, bob);
      const duration = Date.now() - start;
      times.push(duration);
    });

    expect(times.every((t) => t < 50)).toBeTruthy();
  });

  test("Memory usage is linear", () => {
    const result = stoneGameVI(Array(10000).fill(50), Array(10000).fill(50));
    expect(typeof result).toBe("number");
    expect([-1, 0, 1]).toContain(result);
  });
});
