// InvoicePrinter Module
// Handles formatting and printing invoices to the console

class InvoicePrinter {
    // Formats a number as currency (USD)
    formatCurrency(amount) {
        return `$${amount.toFixed(2)}`;
    }

    // Prints a formatted invoice for a valid customer
    printInvoice(invoice) {
        const { customerId, breakdown, total } = invoice;

        console.log(`Invoice for Customer: ${customerId}`);
        console.log('-----------------------------');
        console.log(
            `API Calls: ${breakdown.apiCalls.quantity} calls -> ${this.formatCurrency(breakdown.apiCalls.charge)}`
        );
        console.log(
            `Storage: ${breakdown.storage.quantity} GB -> ${this.formatCurrency(breakdown.storage.charge)}`
        );
        console.log(
            `Compute Time: ${breakdown.compute.quantity} minutes -> ${this.formatCurrency(breakdown.compute.charge)}`
        );
        console.log('-----------------------------');
        console.log(`Total Due: ${this.formatCurrency(total)}`);
        console.log(''); // Empty line for spacing
    }

    // Prints a warning for an invalid customer entry
    printInvalidEntry(invalidEntry) {
        const { entry, reason } = invalidEntry;
        const customerId = entry.CustomerId || 'UNKNOWN';

        console.log(
            `Skipped invalid entry: ${reason} for CustomerId: ${customerId}`
        );
        console.log(''); // Empty line for spacing
    }

    // Prints a summary of processing results
    printSummary(validCount, invalidCount) {
        console.log('=============================');
        console.log('PROCESSING SUMMARY');
        console.log('=============================');
        console.log(`Valid invoices generated: ${validCount}`);
        console.log(`Invalid entries skipped: ${invalidCount}`);
        console.log('=============================');
    }
}

module.exports = InvoicePrinter;
