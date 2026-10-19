import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LULLABY_MOODS,
  DELIVERY_ROUTES,
  LANTERN_COLLECTION,
  calculateRouteDistance,
  formatOdometer,
  validateGuestbookEntry,
} from './dreamLogic.ts';

test('Lullaby moods configuration contains valid notes and positive frequencies', () => {
  const moods = Object.values(LULLABY_MOODS);
  assert.equal(moods.length, 3);
  for (const mood of moods) {
    assert.ok(mood.name.length > 0);
    assert.ok(mood.notes.length >= 4);
    for (const note of mood.notes) {
      assert.ok(note.freq > 100 && note.freq < 5000, `Frequency ${note.freq} is within human audible sweet spot`);
      assert.ok(note.duration > 0);
    }
  }
});

test('Delivery route calculates consistent non-zero distance', () => {
  const distance = calculateRouteDistance(DELIVERY_ROUTES);
  assert.ok(distance > 500, `Expected distance > 500m, got ${distance}m`);
  assert.equal(calculateRouteDistance([]), 0);
  assert.equal(calculateRouteDistance([DELIVERY_ROUTES[0]]), 0);
});

test('Lantern collection has unique designs with valid color hexes', () => {
  assert.equal(LANTERN_COLLECTION.length, 3);
  const ids = new Set(LANTERN_COLLECTION.map(l => l.id));
  assert.equal(ids.size, 3);
  for (const lantern of LANTERN_COLLECTION) {
    assert.match(lantern.colorHex, /^#[0-9a-fA-F]{6}$/);
  }
});

test('Odometer pads numbers correctly to 6 digits', () => {
  assert.equal(formatOdometer(42), '000042');
  assert.equal(formatOdometer(1717), '001717');
  assert.equal(formatOdometer(0), '000000');
  assert.equal(formatOdometer(-5), '000000');
});

test('Guestbook validation enforces polite limits', () => {
  assert.equal(validateGuestbookEntry('A', 'Sweet dreams!').valid, false);
  assert.equal(validateGuestbookEntry('Pip', 'zzz').valid, false);
  assert.equal(validateGuestbookEntry('Starlight Fox', 'May every tiny star find a cozy cloud tonight.').valid, true);
});
