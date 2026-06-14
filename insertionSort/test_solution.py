import random
import unittest

from solution import insertion_sort, insertion_sort_by_key


class TestInsertionSort(unittest.TestCase):

    def test_small_array(self):
        arr = [5, 2, 9, 1, 5, 6]
        self.assertEqual(insertion_sort(arr[:]), sorted(arr))

    def test_large_array(self):
        random.seed(42)
        arr = [random.randint(-10_000, 10_000) for _ in range(2000)]
        self.assertEqual(insertion_sort(arr[:]), sorted(arr))

    def test_nearly_sorted_array(self):
        arr = list(range(200))
        arr[120], arr[121] = arr[121], arr[120]
        arr[150], arr[151] = arr[151], arr[150]
        self.assertEqual(insertion_sort(arr[:]), sorted(arr))

    def test_reversed_array(self):
        arr = list(range(200, 0, -1))
        self.assertEqual(insertion_sort(arr[:]), sorted(arr))

    def test_stability_with_tuples(self):
        data = [
            (3, "A"),
            (1, "B"),
            (2, "C"),
            (1, "D"),
            (2, "E"),
            (1, "F"),
        ]
        result = insertion_sort_by_key(data[:], key=lambda x: x[0])

        self.assertEqual(result, [(1, "B"), (1, "D"), (1, "F"), (2, "C"), (2, "E"), (3, "A")])


if __name__ == "__main__":
    unittest.main(verbosity=2)
