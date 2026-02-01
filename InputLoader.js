// InputLoader Module
// Handles loading and validating customer usage data from JSON files

const fs = require('fs');
const { REQUIRED_FIELDS } = require('./constants');

class InputLoader {
    // Loads data from a JSON file
    loadData(filePath) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(fileContent);

            if (!Array.isArray(data)) {
                throw new Error('JSON file must contain an array of customer entries');
            }

            return data;
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error(`File not found: ${filePath}`);
            } else if (error instanceof SyntaxError) {
                throw new Error(`Invalid JSON format in file: ${filePath}`);
            }
            throw error;
        }
    }

    // Validates a single customer entry
    validateEntry(entry) {
        // Check if entry is an object
        if (!entry || typeof entry !== 'object') {
            return { isValid: false, reason: 'Entry is not a valid object' };
        }

        // Validate CustomerId
        if (!entry[REQUIRED_FIELDS.CUSTOMER_ID] ||
            typeof entry[REQUIRED_FIELDS.CUSTOMER_ID] !== 'string') {
            return {
                isValid: false,
                reason: `Missing or invalid ${REQUIRED_FIELDS.CUSTOMER_ID}`
            };
        }

        // Validate API_Calls
        if (entry[REQUIRED_FIELDS.API_CALLS] === undefined ||
            entry[REQUIRED_FIELDS.API_CALLS] === null ||
            typeof entry[REQUIRED_FIELDS.API_CALLS] !== 'number' ||
            isNaN(entry[REQUIRED_FIELDS.API_CALLS])) {
            return {
                isValid: false,
                reason: `Missing or invalid ${REQUIRED_FIELDS.API_CALLS}`
            };
        }

        // Validate Storage_GB
        if (entry[REQUIRED_FIELDS.STORAGE_GB] === undefined ||
            entry[REQUIRED_FIELDS.STORAGE_GB] === null ||
            typeof entry[REQUIRED_FIELDS.STORAGE_GB] !== 'number' ||
            isNaN(entry[REQUIRED_FIELDS.STORAGE_GB])) {
            return {
                isValid: false,
                reason: `Missing or invalid ${REQUIRED_FIELDS.STORAGE_GB}`
            };
        }

        // Validate Compute_Minutes
        if (entry[REQUIRED_FIELDS.COMPUTE_MINUTES] === undefined ||
            entry[REQUIRED_FIELDS.COMPUTE_MINUTES] === null ||
            typeof entry[REQUIRED_FIELDS.COMPUTE_MINUTES] !== 'number' ||
            isNaN(entry[REQUIRED_FIELDS.COMPUTE_MINUTES])) {
            return {
                isValid: false,
                reason: `Missing or invalid ${REQUIRED_FIELDS.COMPUTE_MINUTES}`
            };
        }

        return { isValid: true };
    }

    // Separates valid entries from invalid ones
    separateValidFromInvalid(data) {
        const valid = [];
        const invalid = [];

        data.forEach((entry) => {
            const validation = this.validateEntry(entry);

            if (validation.isValid) {
                valid.push(entry);
            } else {
                invalid.push({
                    entry,
                    reason: validation.reason
                });
            }
        });

        return { valid, invalid };
    }
}

module.exports = InputLoader;
