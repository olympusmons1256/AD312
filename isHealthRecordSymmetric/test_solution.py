import unittest
from solution import isHealthRecordSymmetric, HealthNode

def build_list(values):
    if not values:
        return None
    head = HealthNode(values[0])
    current = head
    for v in values[1:]:
        current.next = HealthNode(v)
        current = current.next
    return head

class TestIsHealthRecordSymmetric(unittest.TestCase):
    def test_empty_list(self):
        self.assertTrue(isHealthRecordSymmetric(None))

    def test_single_node(self):
        head = HealthNode(1)
        self.assertTrue(isHealthRecordSymmetric(head))

    def test_symmetric_list(self):
        head = build_list([1, 2, 3, 2, 1])
        result = isHealthRecordSymmetric(head)
        print("Symmetric List Result:", result)
        self.assertTrue(result)

    def test_asymmetric_list(self):
        head = build_list([1, 2, 3, 4, 5])
        result = isHealthRecordSymmetric(head)
        print("Asymmetric List Result:", result)
        self.assertFalse(result)

    def test_even_length_symmetric(self):
        head = build_list([1, 2, 2, 1])
        result = isHealthRecordSymmetric(head)
        print("Even Length Symmetric List Result:", result)
        self.assertTrue(result)
    def test_even_length_asymmetric(self):
        head = build_list([1, 2, 3, 4])
        result = isHealthRecordSymmetric(head)
        print("Even Length Asymmetric List Result:", result)
        self.assertFalse(result)

    def test_empty_list(self):
        head = None
        result = isHealthRecordSymmetric(head)
        print("Empty List Result:", result)
        self.assertTrue(result)
if __name__ == '__main__':
    unittest.main(verbosity=2)