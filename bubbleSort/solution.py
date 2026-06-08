import time


# ─── 1. Basic Bubble Sort ────────────────────────────────────────────────────
#
# Strategy: repeatedly step through the list comparing adjacent pairs.
# If a pair is out of order, swap them. After each full pass the largest
# unsorted element has "bubbled up" to its correct position at the end.
# Repeat for n-1 passes to guarantee a fully sorted list.

def bubble_sort(arr: list[int]) -> list[int]:
    n = len(arr)

    for i in range(n - 1):
        # After each pass i, the last i elements are already in their final
        # positions, so the inner loop can stop i steps earlier each time.
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                # Swap: the larger element moves one step to the right.
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

    return arr


# ─── 2. Optimized Bubble Sort ────────────────────────────────────────────────
#
# Enhancement: track whether any swap occurred during a pass.
# If a complete pass finishes with zero swaps, the list is already sorted
# and we can exit early — no further passes are needed.
# This reduces the best-case (already-sorted input) from O(n²) to O(n).

def bubble_sort_optimized(arr: list[int]) -> list[int]:
    n = len(arr)

    for i in range(n - 1):
        swapped = False  # reset the flag at the start of every pass

        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True  # at least one swap happened this pass

        # Early exit: if no swaps occurred the list is fully sorted.
        if not swapped:
            break

    return arr


# ─── 3. Performance comparison helper ───────────────────────────────────────
#
# Runs both versions on the same input and prints wall-clock timing so the
# early-exit benefit of the optimized version is visible in test output.

def compare_performance(arr: list[int], label: str) -> None:
    copy_basic = arr[:]
    copy_opt   = arr[:]

    start = time.perf_counter()
    bubble_sort(copy_basic)
    basic_time = time.perf_counter() - start

    start = time.perf_counter()
    bubble_sort_optimized(copy_opt)
    opt_time = time.perf_counter() - start

    print(f"\n  [{label}]")
    print(f"    Basic     : {basic_time:.8f}s")
    print(f"    Optimized : {opt_time:.8f}s")
    if basic_time > 0:
        print(f"    Speedup   : {basic_time / opt_time:.2f}x" if opt_time > 0 else "    Speedup   : N/A")
