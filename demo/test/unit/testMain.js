// Import the needed assertions
let assertEqual = unit.assertEqual;

unit.test({
    // This is the category or function being tested
    "sum()":
    {
        /* A description of what the function is supposed to do
         *  given the inputs
         */
        "1 + 2 should equal 3": () => {
            /* An erroneous expected value (4) is used
             * to show what happens when
             * expected value != actual value
             */
            assertEqual(4, sum(1, 2));
        },
        "1 + -2 should equal -1": () => {
            assertEqual(-1, sum(1, -2));
        },
    },

    "subtract()": {
        "5 - 5 should equal 0": () => {
            assertEqual(0, subtract(5, 5));
        },
    },
    "multiply()":
    {
        "3 * 5 should equal 15": () => {
            assertEqual(15, multiply(3, 5));
        },
    },

    "divide()": {
        "49 / 7 should equal 7": () => {
            assertEqual(7, divide(49, 7));
        },
        "9 / 9 should equal 1": () => {
            // Another erroneous expected value
            assertEqual(0, divide(9, 9));
        },
    }
});