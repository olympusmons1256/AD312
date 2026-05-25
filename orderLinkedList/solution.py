class Order:

    def __init__(self, order_id, customer_name, items, total):
        self.order_id = order_id
        self.customer_name = customer_name
        self.items = items
        self.total = total 

    def __repr__(self):
        return (
            f"Order(id={self.order_id}, customer='{self.customer_name}', items={self.items}, total={self.total})"
        )
    
class Node:

    def __init__(self, order):
        self.order = order
        self.next = None

    def __repr__(self):
        return f"Node({self.order})"
    
class OrderLinkedList:
    def __init__(self):
        self.head = None

    def append(self, order):
        new_node = Node(order)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next is not None:
            current = current.next
        current.next = new_node

    def display(self):
        current = self.head
        if current is None:
            print("The order list is empty.")
            return
        index = 1
        while current is not None:
            print(f"Order {index}: {current.order}")
            current = current.next
            index += 1

    def reverse(self):
        prev = None
        current = self.head
        while current is not None:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        self.head = prev

    def to_list(self):
        result = []
        current = self.head
        while current is not None:
            result.append(current.order)
            current = current.next
        return result
    
    def __len__(self):
        count = 0
        current = self.head
        while current is not None:
            count += 1
            current = current.next
        return count