// Pricing constants for the usage-based invoicing system

const PRICING = {
    // API Calls - Tiered pricing
    API_TIER1_LIMIT: 10000,
    API_TIER1_RATE: 0.01,    // First 10,000 calls
    API_TIER2_RATE: 0.008,   // Above 10,000 calls

    // Storage - Linear pricing
    STORAGE_RATE: 0.25,      // Per GB

    // Compute - Linear pricing
    COMPUTE_RATE: 0.05       // Per minute
};

// Required fields for customer data validation
const REQUIRED_FIELDS = {
    CUSTOMER_ID: 'CustomerId',
    API_CALLS: 'API_Calls',
    STORAGE_GB: 'Storage_GB',
    COMPUTE_MINUTES: 'Compute_Minutes'
};

module.exports = {
    PRICING,
    REQUIRED_FIELDS
};
