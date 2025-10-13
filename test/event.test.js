// test/event.test.js

// 引入 Node.js 內建的 'assert' 模組，用於進行單元測試的斷言。
// 斷言是用來檢查程式的某個條件是否為真，若不為真則拋出錯誤。
const assert = require('assert');

// 從我們的原始碼中，匯入我們想要測試的 'getEventDescription' 函式。
// '{ getEventDescription }' 這種寫法稱為解構賦值，用於取得模組中具名匯出的部分。
const { getEventDescription } = require('../src/utils/eventDescriptions.js');

console.log('--- 正在執行基礎單元測試 ---');

// --- 測試案例 1: 檢查公開倉庫的 PushEvent ---
try {
    // 步驟 1: 準備 (Arrange) - 建立一個模擬的 GitHub 事件物件。
    // 這個物件模擬了一次對公開倉庫 main 分支的 push 操作。
    const event = {
        type: 'PushEvent',
        repo: { name: 'kaigiii/activity-log' },
        payload: { head: 'abcdef123' },
        isPrivate: false
    };

    // 步驟 2: 執行 (Act) - 呼叫我們想要測試的函式，並傳入模擬的事件物件。
    const description = getEventDescription(event);

    // 步驟 3: 斷言 (Assert) - 檢查函式的回傳值是否與我們預期的完全相等。
    const expected = '📝 Committed to [kaigiii/activity-log](https://github.com/kaigiii/activity-log/commit/abcdef123)'  THIS WILL CAUSE A FAILURE;
    assert.strictEqual(description, expected, '測試失敗：PushEvent 的描述文字不正確。');
    
    // 如果 assert.strictEqual 沒有拋出錯誤，代表測試通過。
    console.log('✅ 公開 PushEvent 測試通過！');
} catch (error) {
    // 如果 assert.strictEqual 拋出錯誤，程式會跳到這裡。
    console.error('❌ 公開 PushEvent 測試失敗：', error.message);
    process.exit(1); // 以失敗碼退出，這會讓 CI/CD 流程中止。
}

// --- 測試案例 2: 檢查公開倉庫的 IssuesEvent ---
try {
    const event = {
        type: 'IssuesEvent',
        repo: { name: 'kaigiii/activity-log' },
        payload: { action: 'opened', issue: { number: 42 } },
        isPrivate: false
    };
    const description = getEventDescription(event);
    const expected = '🆕 Opened an issue [#42](https://github.com/kaigiii/activity-log/issues/42) in [kaigiii/activity-log](https://github.com/kaigiii/activity-log)';
    assert.strictEqual(description, expected, '測試失敗：IssuesEvent 的描述文字不正確。');
    console.log('✅ 公開 IssuesEvent 測試通過！');
} catch (error) {
    console.error('❌ 公開 IssuesEvent 測試失敗：', error.message);
    process.exit(1);
}

// --- 測試案例 3: 檢查私有倉庫的 StarEvent ---
try {
    const event = {
        type: 'StarEvent',
        isPrivate: true
    };
    const description = getEventDescription(event);
    // 對於私有倉庫的事件，我們預期它只會回傳一段通用的、不包含具體資訊的文字。
    assert.strictEqual(description, '⭐ Starred a private repo', '測試失敗：私有 StarEvent 應回傳通用訊息。');
    console.log('✅ 私有 StarEvent 測試通過！');
} catch (error) {
    console.error('❌ 私有 StarEvent 測試失敗：', error.message);
    process.exit(1);
}

// 如果所有 try...catch 塊都順利執行完畢，程式才會走到這裡。
console.log('--- 所有單元測試皆成功通過！ ---');
