================================================================================
                    HOW TO RUN THE INVOICING APPLICATION
================================================================================

PREREQUISITES
-------------
- Node.js installed on your system


RUNNING THE APPLICATION
------------------------

Step 1: Choose a Run Option

Option A - Run with default data file:

    node index.js

    Uses 'usage-data.json' by default.


Option B - Run with specification test data:

    node index.js usage-data-spec.json


Option C - Run with your custom JSON file:

    node index.js path/to/your-file.json


Step 2: View the Results

The application will display:
    - Valid customer invoices with detailed charge breakdowns
    - Invalid entry warnings for malformed data
    - Processing summary with counts


RUNNING TESTS
-------------

To run the unit tests:

    npm test

Or directly:

    node InvoiceCalculator.test.js

Expected output: ALL TESTS PASSED!


EXAMPLE OUTPUT
--------------

=============================
USAGE-BASED INVOICING SYSTEM
=============================
Reading data from: usage-data.json

--- INVALID ENTRIES ---

Skipped invalid entry: Missing or invalid API_Calls for CustomerId: CUST_BAD1

--- VALID INVOICES ---

Invoice for Customer: CUST001
-----------------------------
API Calls: 9500 calls -> $95.00
Storage: 40 GB -> $10.00
Compute Time: 100 minutes -> $5.00
-----------------------------
Total Due: $110.00

Invoice for Customer: CUST002
-----------------------------
API Calls: 12000 calls -> $116.00
Storage: 60.5 GB -> $15.13
Compute Time: 240 minutes -> $12.00
-----------------------------
Total Due: $143.13

=============================
PROCESSING SUMMARY
=============================
Valid invoices generated: 3
Invalid entries skipped: 2
=============================


UNDERSTANDING THE OUTPUT
-------------------------

Valid Invoices Section:
    Each invoice shows:
    - Customer ID
    - API Calls count and charge (with tiered pricing)
    - Storage GB and charge
    - Compute minutes and charge
    - Total amount due

Invalid Entries Section:
    Shows entries that were skipped with the reason:
    - Missing required fields
    - Invalid data types (e.g., strings instead of numbers)
    - Null values

Processing Summary:
    Final count of:
    - Valid invoices generated
    - Invalid entries skipped


TROUBLESHOOTING
---------------

Issue                     Solution
-----                     --------
Cannot find module        Ensure you're in the correct directory:
                         c:\laragon\www\TB-Test3

File not found           Check your JSON file path is correct
                         (use relative or absolute paths)

Invalid JSON format      Verify JSON syntax - use a JSON validator
                         if needed

SyntaxError              Check that all JSON fields are properly
                         quoted and comma-separated


JSON DATA FORMAT
----------------

Your JSON file must contain an array of customer entries:

[
  {
    "CustomerId": "CUST001",
    "API_Calls": 8500,
    "Storage_GB": 45.5,
    "Compute_Minutes": 150
  }
]

Required fields:
    - CustomerId (string)
    - API_Calls (number)
    - Storage_GB (number)
    - Compute_Minutes (number)


PRICING INFORMATION
-------------------

Service              Rate
-------              ----
API Calls            First 10,000: $0.01/call
                     Above 10,000: $0.008/call

Storage              $0.25/GB

Compute Time         $0.05/minute


NEED MORE INFORMATION?
----------------------

See README.md for complete documentation including:
    - Detailed architecture explanation
    - Module descriptions
    - Full API reference
    - Contribution guidelines


================================================================================
                              END OF GUIDE
================================================================================
