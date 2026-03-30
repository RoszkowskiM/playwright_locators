import { expect as baseExpect, MatcherReturnType } from "@playwright/test";

export const expect = baseExpect.extend({
  toBeOneOfValues(actualValue: number, array: number[]): MatcherReturnType {
    let message = "";
    const isOnList = array.includes(actualValue);
    if (isOnList === true) {
      message = "Passed";
    } else {
      message = `toBeOneOfValues() assertion failed.\nYou expected ${actualValue} to be part of [${array}]`;
    }
    return {
      message: () => message,
      pass: isOnList,
    };
  },

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

  toBePercentageValue(actualValue: string): MatcherReturnType {
    let message = "";
    let pass = false;
    const actualValueAsNumber = parseInt(actualValue);
    const actualValueLastChar = actualValue.endsWith("%");
    const isInRange = actualValueAsNumber >= 0 && actualValueAsNumber <= 100;

    if (isInRange === true && actualValueLastChar === true) {
      message = "Passed";
      pass = true;
    } else {
      message = `toBePercentageValue() assertion failed.\nYou expected ${actualValue} to be in range <0%-100%>\nwith percentage sign "%"`;
    }
    return {
      message: () => message,
      pass: pass,
    };
  },

  toBeCustomPercentageValue(
    actualValue: string,
    min: number,
    max: number,
  ): MatcherReturnType {
    let message = "";
    let pass = false;
    const actualValueAsNumber = parseInt(actualValue);
    const actualValueLastChar = actualValue.endsWith("%");
    const isInRange = actualValueAsNumber >= min && actualValueAsNumber <= max;

    if (isInRange === true && actualValueLastChar === true) {
      message = "Passed";
      pass = true;
    } else {
      message = `toBePercentageValue() assertion failed.\nYou expected ${actualValue} to be in range <${min}%-${max}%>\nwith percentage sign "%"`;
    }
    return {
      message: () => message,
      pass: pass,
    };
  },
});
