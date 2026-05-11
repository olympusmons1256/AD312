class HealthNode:
    def __init__(self, value, next_node=None):
        self.value = value
        self.next = next_node

def _reverse(node):
    prev = None
    current = node
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    return prev

def isHealthRecordSymmetric(head):
    if head is None or head.next is None:
        return True
    
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    second_half_head = _reverse(slow)
    restore_head = second_half_head

    left = head
    right = second_half_head
    is_symmetric = True
    while right:
        if left.value != right.value:
            is_symmetric = False
            break
        left = left.next
        right = right.next

    _reverse(restore_head)  # Restore the original list
    return is_symmetric