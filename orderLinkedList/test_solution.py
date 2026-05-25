import unittest
from solution import Order, OrderLinkedList


def build_list(*records) -> OrderLinkedList:
    oll = OrderLinkedList()
    for order_id, customer, items, total in records:
        oll.append(Order(order_id, customer, items, total))
    return oll


def order_ids(oll: OrderLinkedList) -> list:
    return [o.order_id for o in oll.to_list()]


class TestNormalCases(unittest.TestCase):

    def test_append_and_display_order_preserved(self):
        all = build_list(
            (1, "Alice", "Laptop", 999.99),
            (2, "Bob", "Smartphone", 499.99),
            (3, "Charlie", "Headphones", 199.99)
        )
        ids = order_ids(all)
        for o in all.to_list():
            print(o)
        self.assertEqual(ids, [1, 2, 3])

    def test_reverse_moves_last_order_to_front(self):
        all = build_list(
            (1, "Alice", "Monitor", 349.99),
            (2, "Bob", "Mouse", 29.99),
            (3, "Charlie", "webcam", 89.99)
        )
        all.reverse()
        ids = order_ids(all)
        print("Reversed order IDs:", ids)
        self.assertEqual(ids, [3, 2, 1])

    def test_double_reverse_restores_original_order(self):
        all = build_list(
            (1, "Alice", "chair", 199.99),
            (2, "Bob", "Desk", 299.99),
            (3, "Charlie", "Lamp", 49.99)
        )
        all.reverse()
        all.reverse()
        ids = order_ids(all)
        print("Double reversed order IDs:", ids)
        self.assertEqual(ids, [1, 2, 3])

class TestEdgeCases(unittest.TestCase):

    def test_reverse_empty_list(self):
        all = OrderLinkedList()
        all.reverse()
        ids = order_ids(all)
        print("Reversed empty list IDs:", ids)
        self.assertEqual(ids, [])

    def test_reverse_single_order(self):
        all = build_list((1, "Alice", "Tablet", 299.99))
        all.reverse()
        ids = order_ids(all)
        print("Reversed single order IDs:", ids)
        self.assertEqual(ids, [1])

    def test_reverse_two_orders(self):
        all = build_list(
            (1, "Alice", "Printer", 149.99),
            (2, "Bob", "Scanner", 89.99)
        )
        all.reverse()
        ids = order_ids(all)
        print("Reversed two orders IDs:", ids)
        self.assertEqual(ids, [2, 1])

if __name__ == "__main__":
    unittest.main(verbosity=5)