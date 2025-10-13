// test/event.test.js
const assert = require('assert');
const { getEventDescription } = require('../src/utils/eventDescriptions.js');

console.log('--- Running Basic Unit Tests ---');

try {
    const event = {
        type: 'PushEvent',
        repo: { name: 'kaigiii/activity-log' },
        payload: { head: 'abcdef123' },
        isPrivate: false
    };
    const description = getEventDescription(event);
    const expected = '📝 Committed to [kaigiii/activity-log](https://github.com/kaigiii/activity-log/commit/abcdef123)';
    assert.strictEqual(description, expected, 'Test Failed: PushEvent description is incorrect.');
    console.log('✅ Public PushEvent test passed!');
} catch (error) {
    console.error('❌ Public PushEvent test failed:', error.message);
    process.exit(1);
}

try {
    const event = {
        type: 'IssuesEvent',
        repo: { name: 'kaigiii/activity-log' },
        payload: { action: 'opened', issue: { number: 42 } },
        isPrivate: false
    };
    const description = getEventDescription(event);
    const expected = '🆕 Opened an issue [#42](https://github.com/kaigiii/activity-log/issues/42) in [kaigiii/activity-log](https://github.com/kaigiii/activity-log)';
    assert.strictEqual(description, expected, 'Test Failed: IssuesEvent description is incorrect.');
    console.log('✅ Public IssuesEvent test passed!');
} catch (error) {
    console.error('❌ Public IssuesEvent test failed:', error.message);
    process.exit(1);
}

try {
    const event = {
        type: 'StarEvent',
        isPrivate: true
    };
    const description = getEventDescription(event);
    assert.strictEqual(description, '⭐ Starred a private repo', 'Test Failed: Private StarEvent should return generic message.');
    console.log('✅ Private StarEvent test passed!');
} catch (error) {
    console.error('❌ Private StarEvent test failed:', error.message);
    process.exit(1);
}

console.log('--- All unit tests passed successfully! ---');
