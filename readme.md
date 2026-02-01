# Console-Based Usage Invoicing System

A clean, maintainable Node.js console application that calculates usage-based charges for customers. It reads usage data from a JSON file, validates the input, applies tiered pricing logic, and generates detailed text-based invoices.

## 🚀 Features

*   **Robust Input Handling:** Validates JSON input for required fields and correct data types. Skips and reports malformed entries without crashing.
*   **Tiered Pricing Calculation:**
    *   **API Calls:** Tiered rates (Standard vs. Volume).
    *   **Storage:** Linear pricing per GB.
    *   **Compute Time:** Linear pricing per minute.
*   **Detailed Output:** Prints formatted invoices for valid customers and descriptive warnings for invalid entries.
*   **Modular Architecture:** Separation of concerns using distinct classes for Loading, Calculation, and Printing.
*   **Flexible Execution:** Accepts custom input file paths via command-line arguments.
*   **No External Dependencies:** Built using standard Node.js libraries (except for dev/testing tools if applicable).

## 📂 Project Structure

```
usage-invoicing_nodejs-JS/
├── index.js                # Entry point: Orchestrates the flow
├── InputLoader.js          # Handles file reading and data validation
├── InvoiceCalculator.js    # Business logic for pricing rules
├── InvoicePrinter.js       # Handles console formatting and output
├── constants.js            # Centralized configuration for pricing rates
├── InvoiceCalculator.test.js # Unit tests for calculation logic
├── usage-data.json         # Default sample dataset
├── usage-data-spec.json    # Edge-case dataset for testing
├── problem.txt             # Original problem statement
└── HOW_TO_RUN.txt          # Quick start guide
```

## 🛠️ Prerequisites

*   [Node.js](https://nodejs.org/) (Version 12.x or higher recommended)

## 📥 Installation

1.  Clone this repository or navigate to the project folder:

2.  Install dependencies (if any):
    ```bash
    npm install
    ```
 
## 💻 Usage

### 1. Run with Default Data
Process the default `usage-data.json` file included in the root directory:
```bash
node index.js
```

### 2. Run with Custom Data
Specify a path to your own JSON file:
```bash
node index.js ./my-custom-data.json
```

### 3. Run Tests
Execute the unit tests to verify calculation logic:
```bash
npm test
# OR
node InvoiceCalculator.test.js
```

## 📊 Pricing Model

The application uses the following rates defined in `constants.js`:

| Service | Rate |
| :--- | :--- |
| **API Calls** | First 10,000 calls: **$0.01** / call<br>Additional calls: **$0.008** / call |
| **Storage** | **$0.25** per GB |
| **Compute Time** | **$0.05** per minute |

## 📝 Input Format

The input file must be a JSON array containing customer usage objects:

```json
[
  {
    "CustomerId": "CUST001",
    "API_Calls": 8500,
    "Storage_GB": 45.5,
    "Compute_Minutes": 150
  }
]
```

**Required Fields:**
*   `CustomerId` (String)
*   `API_Calls` (Number, >= 0)
*   `Storage_GB` (Number, >= 0)
*   `Compute_Minutes` (Number, >= 0)

## 🔍 Example Output

```text
=============================
USAGE-BASED INVOICING SYSTEM
=============================
Reading data from: usage-data.json

--- INVALID ENTRIES ---

Skipped invalid entry: Missing or invalid API_Calls for CustomerId: CUST_BAD1

--- VALID INVOICES ---

Invoice for Customer: CUST001
-----------------------------
API Calls: 8500 calls -> $85.00
Storage: 45.5 GB -> $11.38
Compute Time: 150 minutes -> $7.50
-----------------------------
Total Due: $103.88

=============================
PROCESSING SUMMARY
=============================
Valid invoices generated: 1
Invalid entries skipped: 1
=============================
```
