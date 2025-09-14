# Stone Game VI - Solution

## Step-by-Step Explanation

### Understanding the Problem
This is a **game theory** problem where two players have different valuations for the same stones. The key insight is that when a player picks a stone, they not only gain points but also **deny the opponent** the opportunity to gain points from that stone.

### The Optimal Strategy: Greedy by Combined Value

The solution uses a **greedy algorithm** based on the combined value of stones. Here's why this works:

1. **Dual Impact**: Taking a stone has two effects:
   - **Positive**: You gain your valuation of the stone
   - **Negative for opponent**: They lose their opportunity to gain their valuation

2. **Maximum Swing**: The total impact on the score difference is the sum of both values
3. **Optimal Play**: Both players will prioritize stones that maximize this swing

### Algorithm Implementation

```javascript
function stoneGameVI(aliceValues, bobValues) {
    const n = aliceValues.length;
    
    // Step 1: Create stones with combined values
    const stones = aliceValues.map((aliceVal, i) => ({
        index: i,
        aliceValue: aliceVal,
        bobValue: bobValues[i],
        combinedValue: aliceVal + bobValues[i]  // Key insight!
    }));
    
    // Step 2: Sort by combined value (descending)
    stones.sort((a, b) => b.combinedValue - a.combinedValue);
    
    // Step 3: Simulate optimal play
    let aliceScore = 0;
    let bobScore = 0;
    
    for (let turn = 0; turn < n; turn++) {
        const stone = stones[turn];
        if (turn % 2 === 0) {
            // Alice's turn (even indices: 0, 2, 4...)
            aliceScore += stone.aliceValue;
        } else {
            // Bob's turn (odd indices: 1, 3, 5...)
            bobScore += stone.bobValue;
        }
    }
    
    // Step 4: Determine winner
    if (aliceScore > bobScore) return 1;      // Alice wins
    if (bobScore > aliceScore) return -1;     // Bob wins
    return 0;                                 // Draw
}
```

## Dry Run Example: `aliceValues = [1,3]`, `bobValues = [2,1]`

Let's trace through the algorithm step by step:

### Step 1: Create stones with combined values

```
Stone 0: aliceValue=1, bobValue=2, combinedValue=1+2=3
Stone 1: aliceValue=3, bobValue=1, combinedValue=3+1=4
```

### Step 2: Sort by combined value (descending)

```
Before sorting: [Stone 0 (combined=3), Stone 1 (combined=4)]
After sorting:  [Stone 1 (combined=4), Stone 0 (combined=3)]
```

### Step 3: Simulate optimal play

**Turn 0 (Alice's turn):**
- Alice picks Stone 1 (first in sorted order)
- Alice gains 3 points
- aliceScore = 3, bobScore = 0

**Turn 1 (Bob's turn):**
- Bob picks Stone 0 (second in sorted order)  
- Bob gains 2 points
- aliceScore = 3, bobScore = 2

### Step 4: Determine winner

- Alice: 3 points
- Bob: 2 points
- Alice wins → return 1 ✅

## Why This Strategy is Optimal

### Mathematical Proof Sketch

**Claim**: The greedy strategy (picking stones by highest combined value) is optimal.

**Proof by Exchange Argument**:
1. Suppose there's an optimal solution that doesn't follow the greedy order
2. Find the first position where this solution deviates from greedy
3. Show that swapping to follow greedy order never makes the result worse
4. Apply this exchange argument repeatedly to reach the greedy solution

**Intuitive Explanation**:
- When Alice picks a stone worth `A` to her and `B` to Bob, the score difference changes by `+A`
- But Bob also loses the opportunity to gain `B` points
- The total "swing" in Alice's favor is effectively `A + B`
- Both players will prioritize maximizing this swing

## Complete JavaScript Solution

```javascript
/**
 * Determines the winner of Stone Game VI
 * @param {number[]} aliceValues - Alice's valuation of each stone
 * @param {number[]} bobValues - Bob's valuation of each stone  
 * @return {number} 1 if Alice wins, -1 if Bob wins, 0 if draw
 */
function stoneGameVI(aliceValues, bobValues) {
    const n = aliceValues.length;
    
    // Create stone objects with all relevant information
    const stones = [];
    for (let i = 0; i < n; i++) {
        stones.push({
            originalIndex: i,
            aliceValue: aliceValues[i],
            bobValue: bobValues[i],
            combinedValue: aliceValues[i] + bobValues[i]
        });
    }
    
    // Sort by combined value in descending order
    // If combined values are equal, order doesn't matter for the final result
    stones.sort((a, b) => {
        if (b.combinedValue !== a.combinedValue) {
            return b.combinedValue - a.combinedValue;
        }
        // Optional: tie-breaking by original index for consistency
        return a.originalIndex - b.originalIndex;
    });
    
    let aliceScore = 0;
    let bobScore = 0;
    
    // Simulate the game with optimal play
    for (let turn = 0; turn < n; turn++) {
        const currentStone = stones[turn];
        
        if (turn % 2 === 0) {
            // Alice's turn (she goes first)
            aliceScore += currentStone.aliceValue;
        } else {
            // Bob's turn
            bobScore += currentStone.bobValue;
        }
    }
    
    // Determine and return the winner
    if (aliceScore > bobScore) {
        return 1;   // Alice wins
    } else if (bobScore > aliceScore) {
        return -1;  // Bob wins  
    } else {
        return 0;   // Draw
    }
}

// Helper function for testing
function runGameAnalysis(aliceValues, bobValues) {
    const result = stoneGameVI(aliceValues, bobValues);
    
    // Additional analysis for debugging/visualization
    const stones = aliceValues.map((val, i) => ({
        index: i,
        aliceValue: val,
        bobValue: bobValues[i],
        combinedValue: val + bobValues[i]
    }));
    
    stones.sort((a, b) => b.combinedValue - a.combinedValue);
    
    let aliceScore = 0, bobScore = 0;
    const moves = [];
    
    for (let turn = 0; turn < stones.length; turn++) {
        const stone = stones[turn];
        const player = turn % 2 === 0 ? 'Alice' : 'Bob';
        const points = turn % 2 === 0 ? stone.aliceValue : stone.bobValue;
        
        if (turn % 2 === 0) {
            aliceScore += points;
        } else {
            bobScore += points;
        }
        
        moves.push({
            turn: turn + 1,
            player,
            stoneIndex: stone.index,
            pointsGained: points,
            combinedValue: stone.combinedValue
        });
    }
    
    return {
        result,
        aliceScore,
        bobScore,
        moves,
        explanation: result === 1 ? 'Alice wins' : result === -1 ? 'Bob wins' : 'Draw'
    };
}
```

## Dry Run of Example 3: `aliceValues = [2,4,3]`, `bobValues = [1,6,7]`

### Step-by-step execution:

**Initial Setup:**
```
Stone 0: aliceValue=2, bobValue=1, combinedValue=3
Stone 1: aliceValue=4, bobValue=6, combinedValue=10  
Stone 2: aliceValue=3, bobValue=7, combinedValue=10
```

**After Sorting by Combined Value:**
```
Sorted: [Stone 1 (10), Stone 2 (10), Stone 0 (3)]
```
*Note: Stone 1 and 2 have equal combined values, so their relative order may vary*

**Game Simulation:**
- **Turn 0 (Alice)**: Picks Stone 1 → Alice gets 4 points
- **Turn 1 (Bob)**: Picks Stone 2 → Bob gets 7 points  
- **Turn 2 (Alice)**: Picks Stone 0 → Alice gets 2 points

**Final Scores:**
- Alice: 4 + 2 = 6 points
- Bob: 7 points  
- Bob wins → return -1 ✅

## Time and Space Complexity Analysis

### Time Complexity: O(n log n)
- **Stone creation**: O(n) to create stone objects
- **Sorting**: O(n log n) to sort by combined values
- **Game simulation**: O(n) to simulate optimal play
- **Total**: O(n log n)

### Space Complexity: O(n)
- **Stone objects**: O(n) space for storing stone information
- **Sorting**: O(log n) additional space for sorting (in most implementations)
- **Variables**: O(1) for scores and counters
- **Total**: O(n)

## Edge Cases Handled

1. **Single stone (n=1)**: Alice automatically wins
2. **Two stones**: Simple case, algorithm works correctly  
3. **All equal combined values**: Order doesn't affect final result
4. **Maximum constraints**: Handles up to 10^5 stones efficiently
5. **Equal final scores**: Correctly returns 0 for draw
6. **Extreme value differences**: Algorithm remains optimal

## Correctness Proof

The greedy algorithm is optimal because:

1. **Local Optimality**: At each step, picking the stone with highest combined value maximizes the swing in the current player's favor
2. **Global Optimality**: The exchange argument shows that any deviation from this strategy can be improved
3. **No Backtracking Needed**: Since all stones must eventually be picked, there's no benefit to saving high-value stones for later