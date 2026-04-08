import {
  expect as baseExpect,
  Locator,
  MatcherReturnType,
} from "@playwright/test";

export const expect = baseExpect.extend({
  async toHaveMaxLength(
    locator: Locator,
    expectedValue: number,
    options?: { timeout?: number },
  ): Promise<MatcherReturnType> {
    let message = "";
    let pass = false;
    let actualValue = undefined;

    try {
      await baseExpect(locator).toHaveAttribute(
        "maxlength",
        String(expectedValue),
        options,
      );
      pass = true;
    } catch (error) {
      const e = error as any;
      actualValue = e.MatcherResult?.actual;
    }

    if (pass) {
      message = "passed";
    } else {
      message = `toHaveMaxLength() assertion failed.\n
      You expected the locator to have a maxlength of ${expectedValue},\n
      but got ${actualValue}`;
    }
    return {
      message: () => message,
      pass: pass,
      actual: actualValue,
      expected: expectedValue,
    };
  },
});
