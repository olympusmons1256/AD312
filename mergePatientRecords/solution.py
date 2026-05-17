class PatientNode:
    def __init__(self, ssn, name, age, next=None):
        self.ssn = ssn
        self.name = name
        self.age = age
        self.next = next

    def __repr__(self):
        return f"PatientNode(ssn={self.ssn}, name={self.name}, age={self.age})"


def mergePatientLists(list1, list2):
    dummy = PatientNode(0, "", 0)
    tail = dummy

    while list1 is not None and list2 is not None:
        if list1.ssn <= list2.ssn:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next

    tail.next = list1 if list1 is not None else list2
    return dummy.next
