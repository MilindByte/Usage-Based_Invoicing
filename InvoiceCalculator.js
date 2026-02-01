// InvoiceCalculator Module
// Handles all pricing calculations for customer usage

const { PRICING } = require('./constants');

class InvoiceCalculator {
    // Calculates API call charges with tiered pricing
    calculateAPICharges(apiCalls) {
        if (apiCalls <= PRICING.API_TIER1_LIMIT) {
            // All calls at tier 1 rate
            return apiCalls * PRICING.API_TIER1_RATE;
        } else {
            // First 10,000 at tier 1, remainder at tier 2
            const tier1Charges = PRICING.API_TIER1_LIMIT * PRICING.API_TIER1_RATE;
            const tier2Calls = apiCalls - PRICING.API_TIER1_LIMIT;
            const tier2Charges = tier2Calls * PRICING.API_TIER2_RATE;
            return tier1Charges + tier2Charges;
        }
    }

    // Calculates storage charges
    calculateStorageCharges(storageGB) {
        return storageGB * PRICING.STORAGE_RATE;
    }

    // Calculates compute time charges
    calculateComputeCharges(computeMinutes) {
        return computeMinutes * PRICING.COMPUTE_RATE;
    }

    // Calculates complete invoice for a customer entry
    calculateInvoice(entry) {
        const apiCharges = this.calculateAPICharges(entry.API_Calls);
        const storageCharges = this.calculateStorageCharges(entry.Storage_GB);
        const computeCharges = this.calculateComputeCharges(entry.Compute_Minutes);
        const totalCharges = apiCharges + storageCharges + computeCharges;

        return {
            customerId: entry.CustomerId,
            breakdown: {
                apiCalls: {
                    quantity: entry.API_Calls,
                    charge: apiCharges
                },
                storage: {
                    quantity: entry.Storage_GB,
                    charge: storageCharges
                },
                compute: {
                    quantity: entry.Compute_Minutes,
                    charge: computeCharges
                }
            },
            total: totalCharges
        };
    }
}

module.exports = InvoiceCalculator;
