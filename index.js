// Main Application Entry Point
// Console-Based Usage-Based Invoicing System

const InputLoader = require('./InputLoader');
const InvoiceCalculator = require('./InvoiceCalculator');
const InvoicePrinter = require('./InvoicePrinter');

// Initialize modules
const loader = new InputLoader();
const calculator = new InvoiceCalculator();
const printer = new InvoicePrinter();

// Main application function
function main() {
    try {
        // Get file path from command-line arguments or use default
        const args = process.argv.slice(2);
        const filePath = args.length > 0 ? args[0] : 'usage-data.json';

        console.log('=============================');
        console.log('USAGE-BASED INVOICING SYSTEM');
        console.log('=============================');
        console.log(`Reading data from: ${filePath}`);
        console.log('');

        // Load and validate data
        const rawData = loader.loadData(filePath);
        const { valid, invalid } = loader.separateValidFromInvalid(rawData);

        // Print invalid entries first
        if (invalid.length > 0) {
            console.log('--- INVALID ENTRIES ---');
            console.log('');
            invalid.forEach(invalidEntry => {
                printer.printInvalidEntry(invalidEntry);
            });
        }

        // Process and print valid invoices
        if (valid.length > 0) {
            console.log('--- VALID INVOICES ---');
            console.log('');
            valid.forEach(entry => {
                const invoice = calculator.calculateInvoice(entry);
                printer.printInvoice(invoice);
            });
        }

        // Print summary
        printer.printSummary(valid.length, invalid.length);

    } catch (error) {
        console.error('ERROR:', error.message);
        console.error('');
        console.error('Usage: node index.js [path-to-json-file]');
        console.error('Example: node index.js usage-data.json');
        process.exit(1);
    }
}

// Run the application
main();
