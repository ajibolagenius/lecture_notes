import { useMemo, useState } from 'react';

export default function ExpensiveComponent({ numbers }) {
    // Without useMemo, this slowSort runs on EVERY render (even if only 'count' changes)
    // With useMemo, it only runs when 'numbers' changes.
    const sortedNumbers = useMemo(() => {
        console.log("Sorting...");
        return numbers.sort((a, b) => a - b);
    }, [numbers]);

    return <div>{sortedNumbers.join(', ')}</div>;
}
