import random
import unittest
from solution import bubble_sort, bubble_sort_optimized, compare_performance


# ─── Shared helpers ──────────────────────────────────────────────────────────

def is_sorted_asc(arr):
    """Return True if arr is in non-decreasing order."""
    return all(arr[i] <= arr[i + 1] for i in range(len(arr) - 1))


# ─── Basic Bubble Sort ───────────────────────────────────────────────────────

class TestBubbleSortBasic(unittest.TestCase):

    # ── Normal cases ──────────────────────────────────────────────────────────

    def test_random_array(self):
        """
        Normal 1 – Randomly generated array.
        A 20-element list is seeded for reproducibility.
        Result must match Python's built-in sort (ground truth).
        """
        random.seed(99)
        arr = [random.randint(-100, 100) for _ in range(20)]
        expected = sorted(arr)
        result = bubble_sort(arr[:])
        self.assertEqual(result, expected,
            f"Random array mismatch.\n  Expected: {expected}\n  Got:      {result}")

    def test_already_sorted_ascending(self):
        """
        Normal 2 – Array already sorted in ascending order (best case).
        Basic sort must still make all n-1 passes and return the same order.
        """
        arr = [1, 3, 5, 7, 9, 11, 13]
        result = bubble_sort(arr[:])
        self.assertEqual(result, arr,
            f"Already-sorted array failed.\n  Expected: {arr}\n  Got:      {result}")
        self.assertTrue(is_sorted_asc(result))

    def test_descending_array(self):
        """
        Normal 3 – Array sorted in descending order (worst case for bubble sort).
        Every element must be moved across the full unsorted region.
        """
        arr = [9, 7, 5, 3, 1]
        expected = [1, 3, 5, 7, 9]
        result = bubble_sort(arr[:])
        self.assertEqual(result, expected,
            f"Descending array failed.\n  Expected: {expected}\n  Got:      {result}")

    # ── Edge cases ────────────────────────────────────────────────────────────

    def test_all_identical_elements(self):
        """
        Edge 1 – All elements are the same.
        No swaps should ever occur; result must equal the original.
        """
        arr = [7, 7, 7, 7, 7]
        result = bubble_sort(arr[:])
        self.assertEqual(result, arr,
            f"Uniform array failed.\n  Expected: {arr}\n  Got:      {result}")

    def test_empty_array(self):
        """
        Edge 2 – Empty array.
        The outer loop range(0 - 1) = range(-1) is empty, so nothing runs.
        Must return an empty list without raising an exception.
        """
        result = bubble_sort([])
        self.assertEqual(result, [],
            "Empty array should return [].")

    def test_single_element(self):
        """
        Edge 3 – Single-element array.
        A list of one element is trivially sorted; no comparisons are made.
        """
        result = bubble_sort([42])
        self.assertEqual(result, [42],
            "Single-element array should return itself.")


# ─── Optimized Bubble Sort ───────────────────────────────────────────────────

class TestBubbleSortOptimized(unittest.TestCase):

    # ── Normal cases ──────────────────────────────────────────────────────────

    def test_random_array(self):
        """
        Normal 1 – Randomly generated array.
        Optimized sort must produce the same result as the basic version.
        """
        random.seed(99)
        arr = [random.randint(-100, 100) for _ in range(20)]
        expected = sorted(arr)
        result = bubble_sort_optimized(arr[:])
        self.assertEqual(result, expected,
            f"Random array mismatch.\n  Expected: {expected}\n  Got:      {result}")

    def test_already_sorted_ascending(self):
        """
        Normal 2 – Already sorted array (best case).
        The optimized version detects zero swaps on the first pass and exits,
        reducing the best-case from O(n²) to O(n).
        """
        arr = [1, 3, 5, 7, 9, 11, 13]
        result = bubble_sort_optimized(arr[:])
        self.assertEqual(result, arr,
            f"Already-sorted array failed.\n  Expected: {arr}\n  Got:      {result}")
        self.assertTrue(is_sorted_asc(result))

    def test_descending_array(self):
        """
        Normal 3 – Descending array (worst case).
        No early exit is possible; optimized and basic produce identical results.
        """
        arr = [9, 7, 5, 3, 1]
        expected = [1, 3, 5, 7, 9]
        result = bubble_sort_optimized(arr[:])
        self.assertEqual(result, expected,
            f"Descending array failed.\n  Expected: {expected}\n  Got:      {result}")

    # ── Edge cases ────────────────────────────────────────────────────────────

    def test_all_identical_elements(self):
        """
        Edge 1 – All identical elements.
        First pass finds no swaps, so the early-exit flag fires immediately.
        Result must equal the original list.
        """
        arr = [4, 4, 4, 4, 4]
        result = bubble_sort_optimized(arr[:])
        self.assertEqual(result, arr,
            f"Uniform array failed.\n  Expected: {arr}\n  Got:      {result}")

    def test_empty_array(self):
        """
        Edge 2 – Empty array.
        Must return an empty list without raising an exception.
        """
        result = bubble_sort_optimized([])
        self.assertEqual(result, [],
            "Empty array should return [].")

    def test_single_element(self):
        """
        Edge 3 – Single-element array.
        Must return itself immediately; the inner loop body never executes.
        """
        result = bubble_sort_optimized([99])
        self.assertEqual(result, [99],
            "Single-element array should return itself.")


# ─── Performance comparison ──────────────────────────────────────────────────

class TestPerformanceComparison(unittest.TestCase):

    def test_performance_already_sorted(self):
        """
        Best-case scenario: 500-element already-sorted array.
        The optimized version exits after one pass (O(n));
        the basic version completes all n-1 passes (O(n²)).
        Both must return a correctly sorted list.
        """
        arr = list(range(500))
        compare_performance(arr, "Already sorted (500 elements)")
        self.assertEqual(bubble_sort(arr[:]), arr)
        self.assertEqual(bubble_sort_optimized(arr[:]), arr)

    def test_performance_descending(self):
        """
        Worst-case scenario: 500-element reverse-sorted array.
        Neither version can exit early; both complete all n-1 passes.
        Both must return the fully sorted list.
        """
        arr = list(range(500, 0, -1))
        expected = list(range(1, 501))
        compare_performance(arr, "Reverse sorted (500 elements)")
        self.assertEqual(bubble_sort(arr[:]), expected)
        self.assertEqual(bubble_sort_optimized(arr[:]), expected)


if __name__ == '__main__':
    unittest.main(verbosity=2)
