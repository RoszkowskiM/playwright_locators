import {
  expect as baseExpect,
  Locator,
  MatcherReturnType,
} from "@playwright/test";

export const expect = baseExpect.extend({
  toBeInRange(
    actualValue: string,
    min: number,
    max: number,
  ): MatcherReturnType {
    let message = "";
    const actualValueAsNumber = parseInt(actualValue);
    const isInRange = actualValueAsNumber >= min && actualValueAsNumber <= max;

    if (isInRange === true) {
      message = "Passed";
    } else {
      message = `toBeInRange() assertion failed.\nYou expected ${actualValue} to be in range <${min}-${max}>`;
    }
    return {
      message: () => message,
      pass: isInRange,
    };
  },

  async elementValueToBeInRange(
    locator: Locator,
    min: number,
    max: number,
    options?: {
      timeout?: number;
    },
  ): Promise<MatcherReturnType> {
    let pass = false;
    let message = "";
    let actualValue = undefined;

    try {
      await baseExpect(locator).toBeVisible(options);
      const elementValue = await locator.innerText();
      const elementValueAsNumber = parseInt(elementValue);
      const isInRange =
        elementValueAsNumber >= min && elementValueAsNumber <= max;
      pass = isInRange;
      actualValue = elementValue;
    } catch (error: any) {
      actualValue = error.MatcherResult?.actual;
      pass = false;
    }

    if (pass) {
      message = "Passed";
    } else {
      message = `Assertion elementValueToBeInRange() failed\n
        You expected the element to be in range <${min}-${max}>,\n
        but got: ${actualValue}`;
    }

    return {
      message: () => message,
      pass: pass,
      expected: [min, max],
      actual: actualValue,
    };
  },
});
