
---

## Stone Game VI

### Requirements

* Alice and Bob take turns picking stones, Alice goes first.
* Each stone has two values: `aliceValues[i]` (Alice’s points) and `bobValues[i]` (Bob’s points).
* Players know both arrays and will play **optimally** to maximize their final score difference.
* After all stones are taken:

  * Return **1** if Alice has more points.
  * Return **-1** if Bob has more points.
  * Return **0** if points are equal (draw).

### Edge Cases & Constraints

* **Single stone** → Alice takes it and wins automatically.
* **Equal arrays** → Perfect draw if both play optimally.
* **All stones favor one player** → That player will definitely win.
* **Draw scenarios** → When final scores are equal.
* **Performance** → Must handle up to `n = 10^5`.
* **Constraints** →

  * `n == aliceValues.length == bobValues.length`
  * `1 <= n <= 10^5`
  * `1 <= aliceValues[i], bobValues[i] <= 100`

### data-testid Attributes

* `alice-values-input` → Input for Alice’s stone values.
* `bob-values-input` → Input for Bob’s stone values.
* `calculate-button` → Button to calculate winner.
* `reset-button` → Button to reset form.
* `result-display` → Shows final result (Alice win / Bob win / Draw).
* `error-message` → Displays input validation errors.
* `stones-visualization` → Shows stones and order in which they are chosen.

---

