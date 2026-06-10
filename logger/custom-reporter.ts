import { logError, logInfo } from "./logger-api";
import type {
  Reporter,
  TestStep,
  TestCase,
  TestResult,
  FullConfig,
  Suite,
} from "@playwright/test/reporter";

export default class CustomReporter implements Reporter {
  constructor() {
    logInfo(`CustomReporter initialized`);
  }

  onBegin(config: FullConfig, suite: Suite) {
    logInfo(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase): void {
    logInfo(`🚀 Test Case Started : ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    logInfo(`🧹 Test Case Completed : ${test.title} Status : ${result.status}`);
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === `test.step`) {
      logInfo(`Executing Step : ${step.title}`);
    }
  }

  onStdErr(chunk: string | Buffer, test?: TestCase): void {
    logError(chunk.toString(), { testTitle: test?.title });
  }

  onStdOut(chunk: string | Buffer, test?: TestCase): void {
    logInfo(chunk.toString(), { testTitle: test?.title });
  }
}
