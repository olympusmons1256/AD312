# 1. Standard Selection Sort — Ascending Order
def selection_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    
    for i in range(n - 1):          # each iteration places one more element into its final position
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j       # record the index of the new minimum
        
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]

    return arr

# 2. Enhancement A — Selection Sort in Descending Order
def selection_sort_descending(arr: list[int]) -> list[int]:
    n = len(arr)

    for i in range(n - 1):
        max_index = i               # assume current position holds the max

        for j in range(i + 1, n):

            if arr[j] > arr[max_index]:
                max_index = j

        if max_index != i:
            arr[i], arr[max_index] = arr[max_index], arr[i]

    return arr