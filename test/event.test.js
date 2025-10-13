// test/event.test.js
const assert = require('assert');
const { getEventDescription } = require('../src/utils/eventDescriptions.js');

console.log('--- Running Basic Unit Tests ---');

try {
    const pushEvent = { type: 'PushEvent', payload: { ref: 'refs/heads/main' } };
    const description = getEventDescription(pushEvent, 'kaigiii');
    assert.strictEqual(description, 'Pushed to `main` at', 'Test Failed: PushEvent description is incorrect.');
    console.log('✅ PushEvent test passed!');
} catch (error) {
    console.error('❌ PushEvent test failed:', error.message);
    process.exit(1);
}

try {
    const issuesEvent = { type: 'IssuesEvent', payload: { action: 'opened' } };
    const description = getEventDescription(issuesEvent, 'kaigiii');
    assert.strictEqual(description, 'Opened an issue in', 'Test Failed: IssuesEvent description is incorrect.');
    console.log('✅ IssuesEvent test passed!');
} catch (error) {
    console.error('❌ IssuesEvent test failed:', error.message);
    process.exit(1);
}

try {
    const unknownEvent = { type: 'UnknownEvent' };
    const description = getEventDescription(unknownEvent, 'kaigiii');
    assert.strictEqual(description, null, 'Test Failed: UnknownEvent should return null.');
    console.log('✅ UnknownEvent test passed!');
} catch (error) {
    console.error('❌ UnknownEvent test failed:', error.message);
    process.exit(1);
}

console.log('--- All unit tests passed successfully! ---');
