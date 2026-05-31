import random
import unittest
from solution import selection_sort, selection_sort_descending, stable_selection_sort


#helpers
def is_sorted_asc(arr):
    """Return True if arr is sorted in non-decreasing order."""
    return all(arr[i] <= arr[i + 1] for i in range(len(arr) - 1))


def is_sorted_desc(arr):
    """Return True if arr is sorted in non-increasing order."""
    return all(arr[i] >= arr[i + 1] for i in range(len(arr) - 1))


# Tests for selection_sort (ascending)
class TestSelectionSortAscending(unittest.TestCase):

    def test_random_array(self):
        """
        Case 1 – Randomly generated array.
        A 20-element list is seeded for reproducibility, then sorted.
        The result must match Python's built-in sort.
        """
        random.seed(42)
        arr = [random.randint(-100, 100) for _ in range(20)]
        expected = sorted(arr)          # ground truth
        result = selection_sort(arr[:]) # pass a copy so arr is unchanged
        self.assertEqual(result, expected, f"Random array failed: got {result}")

    def test_already_sorted(self):
        """
        Case 2 – Array already sorted in ascending order.
        The algorithm must handle this without error and return the same order.
        """
        arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        result = selection_sort(arr[:])
        self.assertEqual(result, arr, f"Already-sorted array failed: got {result}")
        self.assertTrue(is_sorted_asc(result))

    def test_reverse_sorted(self):
        """
        Case 3 – Array sorted in descending order (worst-case scenario).
        Every pass must perform a swap to move the minimum to the front.
        """
        arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
        expected = list(range(1, 11))
        result = selection_sort(arr[:])
        self.assertEqual(result, expected, f"Reverse-sorted array failed: got {result}")


# Tests for selection_sort_descending
class TestSelectionSortDescending(unittest.TestCase):

    def test_basic_descending(self):
        """Unsorted array must be returned in descending order."""
        arr = [3, 1, 4, 1, 5, 9, 2, 6]
        expected = sorted(arr, reverse=True)
        result = selection_sort_descending(arr[:])
        self.assertEqual(result, expected, f"Descending sort failed: got {result}")

    def test_already_descending(self):
        """Array already in descending order must remain unchanged."""
        arr = [9, 7, 5, 3, 1]
        result = selection_sort_descending(arr[:])
        self.assertEqual(result, arr)
        self.assertTrue(is_sorted_desc(result))

    def test_ascending_input_descending_sort(self):
        """Ascending input must be fully reversed."""
        arr = list(range(1, 8))
        result = selection_sort_descending(arr[:])
        self.assertEqual(result, list(range(7, 0, -1)))


if __name__ == "__main__":
    unittest.main(verbosity=2)
