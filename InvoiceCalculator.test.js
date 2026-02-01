// Unit Tests for InvoiceCalculator
// Tests pricing calculations and invoice generation

const InvoiceCalculator = require('./InvoiceCalculator');
const assert = require('assert');

const calculator = new InvoiceCalculator();

console.log('Running InvoiceCalculator Tests...\n');

// Test 1: API Calls - Below tier limit
console.log('Test 1: API Calls Below 10,000');
const apiCharge1 = calculator.calculateAPICharges(8500);
const expected1 = 8500 * 0.01; // $85.00
assert.strictEqual(apiCharge1, expected1, `Expected ${expected1}, got ${apiCharge1}`);
console.log(`✓ PASSED: 8,500 calls = $${apiCharge1.toFixed(2)}\n`);

// Test 2: API Calls - Exactly at tier limit
console.log('Test 2: API Calls Exactly 10,000');
const apiCharge2 = calculator.calculateAPICharges(10000);
const expected2 = 10000 * 0.01; // $100.00
assert.strictEqual(apiCharge2, expected2, `Expected ${expected2}, got ${apiCharge2}`);
console.log(`✓ PASSED: 10,000 calls = $${apiCharge2.toFixed(2)}\n`);

// Test 3: API Calls - Above tier limit
console.log('Test 3: API Calls Above 10,000');
const apiCharge3 = calculator.calculateAPICharges(12500);
const expected3 = (10000 * 0.01) + (2500 * 0.008); // $100 + $20 = $120.00
assert.strictEqual(apiCharge3, expected3, `Expected ${expected3}, got ${apiCharge3}`);
console.log(`✓ PASSED: 12,500 calls = $${apiCharge3.toFixed(2)}\n`);

// Test 4: API Calls - Large amount above tier
console.log('Test 4: API Calls Large Amount');
const apiCharge4 = calculator.calculateAPICharges(18000);
const expected4 = (10000 * 0.01) + (8000 * 0.008); // $100 + $64 = $164.00
assert.strictEqual(apiCharge4, expected4, `Expected ${expected4}, got ${apiCharge4}`);
console.log(`✓ PASSED: 18,000 calls = $${apiCharge4.toFixed(2)}\n`);

// Test 5: Storage Charges
console.log('Test 5: Storage Charges');
const storageCharge = calculator.calculateStorageCharges(45.5);
const expected5 = 45.5 * 0.25; // $11.375
assert.strictEqual(storageCharge, expected5, `Expected ${expected5}, got ${storageCharge}`);
console.log(`✓ PASSED: 45.5 GB = $${storageCharge.toFixed(2)}\n`);

// Test 6: Compute Charges
console.log('Test 6: Compute Charges');
const computeCharge = calculator.calculateComputeCharges(150);
const expected6 = 150 * 0.05; // $7.50
assert.strictEqual(computeCharge, expected6, `Expected ${expected6}, got ${computeCharge}`);
console.log(`✓ PASSED: 150 minutes = $${computeCharge.toFixed(2)}\n`);

// Test 7: Complete Invoice Calculation - CUST001
console.log('Test 7: Complete Invoice for CUST001');
const invoice1 = calculator.calculateInvoice({
    CustomerId: 'CUST001',
    API_Calls: 8500,
    Storage_GB: 45.5,
    Compute_Minutes: 150
});
const expectedTotal1 = 85.00 + 11.375 + 7.50; // $103.875
assert.strictEqual(invoice1.total, expectedTotal1, `Expected ${expectedTotal1}, got ${invoice1.total}`);
assert.strictEqual(invoice1.customerId, 'CUST001');
console.log(`✓ PASSED: CUST001 total = $${invoice1.total.toFixed(2)}\n`);

// Test 8: Complete Invoice Calculation - CUST002
console.log('Test 8: Complete Invoice for CUST002');
const invoice2 = calculator.calculateInvoice({
    CustomerId: 'CUST002',
    API_Calls: 12500,
    Storage_GB: 120,
    Compute_Minutes: 310
});
const expectedTotal2 = 120.00 + 30.00 + 15.50; // $165.50
assert.strictEqual(invoice2.total, expectedTotal2, `Expected ${expectedTotal2}, got ${invoice2.total}`);
console.log(`✓ PASSED: CUST002 total = $${invoice2.total.toFixed(2)}\n`);

// Test 9: Zero Usage
console.log('Test 9: Zero Usage');
const invoice3 = calculator.calculateInvoice({
    CustomerId: 'CUST000',
    API_Calls: 0,
    Storage_GB: 0,
    Compute_Minutes: 0
});
assert.strictEqual(invoice3.total, 0, `Expected 0, got ${invoice3.total}`);
console.log(`✓ PASSED: Zero usage = $${invoice3.total.toFixed(2)}\n`);

// Test 10: Edge case - 1 API call
console.log('Test 10: Edge Case - Minimal Usage');
const apiCharge10 = calculator.calculateAPICharges(1);
assert.strictEqual(apiCharge10, 0.01, `Expected 0.01, got ${apiCharge10}`);
console.log(`✓ PASSED: 1 call = $${apiCharge10.toFixed(2)}\n`);

console.log('=============================');
console.log('ALL TESTS PASSED! ✓');
console.log('=============================');
