import random
import time
from typing import Any, Callable


def insertion_sort(arr: list[int]) -> list[int]:
    """Sort a list in ascending order using stable in-place Insertion Sort."""
    for i in range(1, len(arr)):
        current = arr[i]
        j = i - 1

        # Strict '>' keeps equal elements in original order (stability).
        while j >= 0 and arr[j] > current:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = current

    return arr


def insertion_sort_by_key(items: list[Any], key: Callable[[Any], Any]) -> list[Any]:
    """Stable insertion sort for objects/tuples using a key function."""
    for i in range(1, len(items)):
        current = items[i]
        current_key = key(current)
        j = i - 1

        while j >= 0 and key(items[j]) > current_key:
            items[j + 1] = items[j]
            j -= 1

        items[j + 1] = current

    return items


def generate_test_arrays(size: int = 1000) -> dict[str, list[int]]:
    """Build arrays for best/worst/average-case experiments."""
    random.seed(312)
    nearly_sorted = list(range(size))
    # Introduce a few local disruptions to keep it "nearly sorted".
    for i in range(0, min(size - 1, 20), 2):
        nearly_sorted[i], nearly_sorted[i + 1] = nearly_sorted[i + 1], nearly_sorted[i]

    return {
        "small": [5, 2, 9, 1, 5, 6],
        "large_random": [random.randint(-10_000, 10_000) for _ in range(size)],
        "nearly_sorted": nearly_sorted,
        "reversed": list(range(size, 0, -1)),
    }


def average_runtime_seconds(size: int, trials: int = 5) -> float:
    """Average runtime for random arrays of a fixed size."""
    random.seed(100 + size)
    elapsed = 0.0

    for _ in range(trials):
        arr = [random.randint(-100_000, 100_000) for _ in range(size)]
        start = time.perf_counter()
        insertion_sort(arr)
        elapsed += (time.perf_counter() - start)

    return elapsed / trials
