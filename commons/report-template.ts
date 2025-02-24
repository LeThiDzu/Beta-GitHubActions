import { Block, KnownBlock } from "@slack/types";
import { SummaryResults } from "playwright-slack-report/dist/src";

const generateCustomLayout = (summaryResults: SummaryResults): Array<KnownBlock | Block> => {
    const blocks: Array<KnownBlock | Block> = [];
    const service: String = process.env.SERVICE_NAME || "Playwright";
    const testType: String = process.env.TEST_TYPE || "E2E";
    const testEnv: String = process.env.ENV_NAME || "Local";
    // Add a header block
    blocks.push({
        type: "header",
        text: {
            type: "plain_text",
            text: `${service} - ${testEnv} - ${testType} Test Results`,
            emoji: true,
        },
    });

    // Add a divider
    blocks.push({ type: "divider" });

    // Create objects to store results by suite
    const suiteResults: { [key: string]: { failed: number; passed: number } } = {};

    // Loop through each test and count successes and failures by suite
    summaryResults.tests.forEach(test => {
        if (!suiteResults[test.suiteName]) {
            suiteResults[test.suiteName] = { failed: 0, passed: 0 };
        }
        if (test.status === 'failed') {
            suiteResults[test.suiteName].failed++;
        } else if (test.status === 'passed') {
            suiteResults[test.suiteName].passed++;
        }
    });

    // Display results for each suite
    Object.entries(suiteResults).forEach(([suiteName, { failed, passed }]) => {
        const statusIcon = failed === 0 ? "✅" : "❌";
        blocks.push({
            type: "section",
            text: {
                type: "mrkdwn",
                text: `${statusIcon} *${suiteName}:* ${passed} passed, ${failed} failed`,
            }
        });

        // Add a divider for readability
        blocks.push({ type: "divider" });
    });

    // Calculate summary information
    const totalTests = summaryResults.passed + summaryResults.failed + (summaryResults.skipped || 0);
    const summaryText = `*Summary:* Total Tests: ${totalTests}, Passed: ${summaryResults.passed}, Failed: ${summaryResults.failed}, Skipped: ${summaryResults.skipped}`;

    // Add a summary block at the end
    blocks.push({
        type: "section",
        text: {
            type: "mrkdwn",
            text: summaryText,
        },
    });

    blocks.push({
        type: "section",
        text: {
            type: "mrkdwn",
            text: `Link to job: ${process.env.TEST_RUN_LINK}`,
        },
    });

    return blocks;
};

export default generateCustomLayout;