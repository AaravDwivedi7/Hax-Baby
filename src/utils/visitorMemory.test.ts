import test from 'node:test';
import assert from 'node:assert/strict';
import { generateCustomGreeting, type VisitorProfile } from './visitorMemory.ts';

test('Visitor greeting customizes for first-time visitor', () => {
  const profile: VisitorProfile = {
    id: 'test-1',
    name: 'Aster',
    visitCount: 1,
    firstVisitTimestamp: Date.now(),
    lastVisitTimestamp: Date.now(),
    wishesSubmitted: 0,
    stardust: 10,
    guardianConstellation: 'Ursa Lullaby',
    favoriteChamber: 'The Great Telescope',
  };

  const greeting = generateCustomGreeting(profile, 23);
  assert.ok(greeting.greeting.includes('Welcome, newcomer Aster'));
  assert.equal(greeting.badge, 'First Stargaze');
});

test('Visitor greeting customizes for returning second visit', () => {
  const profile: VisitorProfile = {
    id: 'test-2',
    name: 'Cosmo',
    visitCount: 2,
    firstVisitTimestamp: Date.now() - 100000,
    lastVisitTimestamp: Date.now(),
    wishesSubmitted: 1,
    stardust: 20,
    guardianConstellation: 'Chamomile Corona',
    favoriteChamber: 'Dream Matter Shaper',
  };

  const greeting = generateCustomGreeting(profile, 23);
  assert.ok(greeting.greeting.includes('Welcome back, Cosmo'));
  assert.equal(greeting.badge, 'Returning Stargazer · Visit #2');
});

test('Visitor greeting customizes for veteran stargazer with visit count >= 5', () => {
  const profile: VisitorProfile = {
    id: 'test-3',
    name: 'Luna',
    visitCount: 7,
    firstVisitTimestamp: Date.now() - 1000000,
    lastVisitTimestamp: Date.now(),
    wishesSubmitted: 3,
    stardust: 50,
    guardianConstellation: 'The Slumber Ring',
    favoriteChamber: 'Lullaby Lab',
  };

  const greeting = generateCustomGreeting(profile, 2);
  assert.ok(greeting.greeting.includes('Honorary Dream Keeper') || greeting.badge.includes('Visit #7'));
  assert.ok(greeting.subtext.includes('Visit #7'));
});
