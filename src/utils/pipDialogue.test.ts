import test from 'node:test';
import assert from 'node:assert/strict';
import { getPipDialogueResponse } from './pipDialogue.ts';

test('Pip responds to sleep questions with calming instructions', () => {
  const res = getPipDialogueResponse("I can't sleep", 'Barnaby', 2);
  assert.ok(res.text.includes('Barnaby'));
  assert.ok(res.text.toLowerCase().includes('shoulders') || res.text.toLowerCase().includes('breath') || res.text.toLowerCase().includes('lullaby'));
  assert.equal(res.mood, 'comforting');
});

test('Pip explains his nightcap and bow', () => {
  const res = getPipDialogueResponse('Why the nightcap and pink ribbon?', 'Luna', 1);
  assert.ok(res.text.toLowerCase().includes('nightcap'));
  assert.ok(res.text.toLowerCase().includes('bow') || res.text.toLowerCase().includes('ribbon'));
  assert.equal(res.mood, 'happy');
});

test('Pip explains skull baby identity reassuringly', () => {
  const res = getPipDialogueResponse('What kind of skull baby are you?', 'Oliver', 1);
  assert.ok(res.text.includes('Pip'));
  assert.ok(res.text.toLowerCase().includes('engineer') || res.text.toLowerCase().includes('stardust'));
});

test('Pip provides warm fallback for arbitrary inputs', () => {
  const res = getPipDialogueResponse('What is the circumference of Jupiter in miles?', 'Astrid', 1);
  assert.ok(res.text.length > 20);
  assert.ok(res.text.includes('Astrid'));
});
