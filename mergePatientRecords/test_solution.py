import unittest
from solution import mergePatientLists, PatientNode

def build_list(records):
    if not records:
        return None
    head = PatientNode(*records[0])
    current = head
    for ssn, name, age in records[1:]:
        current.next = PatientNode(ssn, name, age)
        current = current.next
    return head

def to_ssn_list(head):
    result = []
    while head:
        result.append(head.ssn)
        head = head.next
    return result

class TestNormalCases(unittest.TestCase):
    def test_merge_sorted_lists(self):
        list1 = build_list([(123456789, "Alice", 30), (456789012, "Bob", 25)])
        list2 = build_list([(234567890, "Charlie", 40), (567890123, "David", 35)])
        merged_head = mergePatientLists(list1, list2)
        merged_ssns = to_ssn_list(merged_head)
        print("Merged SSNs:", merged_ssns)
        self.assertEqual(merged_ssns, [123456789, 234567890, 456789012, 567890123])
    
    def test_merge_with_duplicates(self):
        list1 = build_list([(123456789, "Alice", 30), (456789012, "Bob", 25)])
        list2 = build_list([(123456789, "Alice", 30), (567890123, "David", 35)])
        merged_head = mergePatientLists(list1, list2)
        merged_ssns = to_ssn_list(merged_head)
        print("Merged SSNs with Duplicates:", merged_ssns)
        self.assertEqual(merged_ssns, [123456789, 123456789, 456789012, 567890123])
    
    def test_merge_empty_lists(self):
        list1 = None
        list2 = None
        merged_head = mergePatientLists(list1, list2)
        merged_ssns = to_ssn_list(merged_head)
        print("Merged SSNs with Empty Lists:", merged_ssns)
        self.assertEqual(merged_ssns, [])


class TestEdgeCases(unittest.TestCase):
    def test_merge_one_empty_list(self):
        list1 = build_list([(123456789, "Alice", 30), (456789012, "Bob", 25)])
        list2 = None
        merged_head = mergePatientLists(list1, list2)
        merged_ssns = to_ssn_list(merged_head)
        print("Merged SSNs with One Empty List:", merged_ssns)
        self.assertEqual(merged_ssns, [123456789, 456789012])

    def test_merge_lists_with_same_ssn(self):
        list1 = build_list([(135797531, "Alice", 30), (456789012, "Bob", 25)])
        list2 = build_list([(135797531, "Alice", 30), (456789012, "Bob", 25)])
        merged_head = mergePatientLists(list1, list2)
        merged_ssns = to_ssn_list(merged_head)
        print("Merged SSNs with Same SSN:", merged_ssns)
        self.assertEqual(merged_ssns, [135797531, 135797531, 456789012, 456789012])

    def test_merge_lists_with_overlapping_ssn(self):
        list1 = build_list([(123456789, "Alice", 30), (456789012, "Bob", 25)])
        list2 = build_list([(123456789, "Alice", 30), (567890123, "David", 35)])
        merged_head = mergePatientLists(list1, list2)
        merged_ssns = to_ssn_list(merged_head)
        print("Merged SSNs with Overlapping SSN:", merged_ssns)
        self.assertEqual(merged_ssns, [123456789, 123456789, 456789012, 567890123])


if __name__ == '__main__':
    unittest.main(verbosity=2)