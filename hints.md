# Stone Game VI - Hints and Approach

## Thought Process

This is a **Game Theory** problem that can be solved using a **Greedy Algorithm**. The key insight is understanding what it means to play "optimally" when both players have different valuations for the same stones.

## Key Insight: Combined Value Strategy

### The "Swing" Concept
When a player picks a stone with value `A` for Alice and `B` for Bob:
- Alice gains `A` points and Bob loses the opportunity to gain `B` points
- Bob gains `B` points and Alice loses the opportunity to gain `A` points
- The total "swing" in score difference is `A + B`

### Why Combined Value Matters
Both players will prioritize stones that create the maximum swing in their favor. Since they're playing optimally, they'll both follow the same strategy: **pick stones with the highest combined value first**.

## Recommended Approach: Greedy Algorithm

### Algorithm Steps

1. **Calculate Combined Values**: For each stone `i`, compute `combined[i] = aliceValues[i] + bobValues[i]`
2. **Sort by Combined Value**: Create pairs of (stone_index, combined_value) and sort in descending order
3. **Simulate Optimal Play**: 
   - Alice picks stones at positions 0, 2, 4... (even indices)
   - Bob picks stones at positions 1, 3, 5... (odd indices)
4. **Calculate Final Scores**: Sum up the respective values for each player
5. **Determine Winner**: Compare final scores

### Pseudocode

```
function stoneGameVI(aliceValues, bobValues):
    n = length of arrays
    
    // Create stones with their combined values
    stones = []
    for i from 0 to n-1:
        stones.push({
            index: i,
            aliceValue: aliceValues[i],
            bobValue: bobValues[i],
            combinedValue: aliceValues[i] + bobValues[i]
        })
    
    // Sort by combined value (descending)
    stones.sort((a, b) => b.combinedValue - a.combinedValue)
    
    aliceScore = 0
    bobScore = 0
    
    // Simulate optimal play
    for turn from 0 to n-1:
        if turn % 2 == 0:  // Alice's turn
            aliceScore += stones[turn].aliceValue
        else:              // Bob's turn
            bobScore += stones[turn].bobValue
    
    // Return result
    if aliceScore > bobScore: return 1
    if bobScore > aliceScore: return -1
    return 0
```

## Alternative Approaches

### 1. Dynamic Programming (Overkill)
- **Approach**: Use DP to explore all possible game states
- **Time**: O(2^n), **Space**: O(2^n) 
- **Pros**: Guaranteed optimal solution
- **Cons**: Exponential complexity, unnecessary for this problem

### 2. Minimax Algorithm (Complex)
- **Approach**: Use game tree with alpha-beta pruning
- **Time**: O(n!), **Space**: O(n)
- **Pros**: Classic game theory approach
- **Cons**: Much more complex than needed, poor performance

### 3. Mathematical Proof (Advanced)
- **Approach**: Prove that greedy approach is optimal
- **Pros**: Elegant mathematical solution
- **Cons**: Requires advanced game theory knowledge

## Why Greedy Works: Mathematical Proof

### Proof Sketch
1. **Assumption**: Suppose there exists an optimal strategy that doesn't follow the greedy approach
2. **Contradiction**: Show that swapping any two stones in the picking order (where combined values are out of order) never decreases the current player's advantage
3. **Conclusion**: The greedy strategy is optimal

### Detailed Reasoning
If Alice deviates from picking the highest combined-value stone:
- She gains fewer points than optimal
- She allows Bob to potentially pick a higher combined-value stone
- The "swing" works against her

The same logic applies to Bob, making the greedy approach optimal for both players.

## Example Walkthrough

### Input: `aliceValues = [2,4,3]`, `bobValues = [1,6,7]`

**Step 1: Calculate Combined Values**
- Stone 0: Combined = 2 + 1 = 3
- Stone 1: Combined = 4 + 6 = 10 ⭐
- Stone 2: Combined = 3 + 7 = 10 ⭐

**Step 2: Sort by Combined Value**
Sorted order: [Stone 1 (10), Stone 2 (10), Stone 0 (3)]

**Step 3: Simulate Optimal Play**
- Turn 1: Alice picks Stone 1 → Alice gets 4 points
- Turn 2: Bob picks Stone 2 → Bob gets 7 points  
- Turn 3: Alice picks Stone 0 → Alice gets 2 points

**Step 4: Final Scores**
- Alice: 4 + 2 = 6 points
- Bob: 7 points
- Result: Bob wins (-1)

## Time and Space Complexity

### Greedy Solution
- **Time Complexity**: O(n log n)
  - Creating stone objects: O(n)
  - Sorting by combined value: O(n log n)
  - Simulating game: O(n)
  - Total: O(n log n)

- **Space Complexity**: O(n)
  - Stone objects array: O(n)
  - No additional space needed

### Optimization Notes
- **Early termination**: Not applicable since all stones must be picked
- **In-place sorting**: Could reduce constant factors but not asymptotic complexity
- **Counting sort**: Not beneficial due to large value range (combined values up to 200)

## Common Pitfalls

1. **Greedy on individual values**: Sorting by Alice's or Bob's values alone is suboptimal
2. **Ignoring opportunity cost**: Not considering what the opponent loses
3. **Wrong turn simulation**: Forgetting that Alice goes first (even indices)
4. **Tie-breaking issues**: When combined values are equal (though it doesn't affect the result)
5. **Integer overflow**: Not an issue given the constraints, but worth considering in general

## Edge Case Considerations

- **All equal values**: Result will be a draw
- **Single stone**: Alice always wins  
- **Two stones**: Simple case to verify algorithm
- **Large arrays**: Algorithm scales well with O(n log n) complexity