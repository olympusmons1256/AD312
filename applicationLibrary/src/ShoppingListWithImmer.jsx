import { useState } from 'react'
import { useImmer } from 'use-immer'

function ShoppingListWithImmer() {
  const [shoppingList, updateShoppingList] = useImmer([
    {
      id: 1,
      name: 'Milk',
      quantity: 1,
      details: {
        category: 'Dairy',
        notes: '2% preferred'
      }
    }
  ])

  const [nameInput, setNameInput] = useState('')
  const [quantityInput, setQuantityInput] = useState(1)
  const [categoryInput, setCategoryInput] = useState('General')
  const [notesInput, setNotesInput] = useState('')
  const [noteDrafts, setNoteDrafts] = useState({})

  const addItem = () => {
    const trimmedName = nameInput.trim()

    if (!trimmedName) {
      return
    }

    updateShoppingList((draft) => {
      draft.push({
        id: Date.now(),
        name: trimmedName,
        quantity: Number(quantityInput) || 1,
        details: {
          category: categoryInput.trim() || 'General',
          notes: notesInput.trim()
        }
      })
    })

    setNameInput('')
    setQuantityInput(1)
    setCategoryInput('General')
    setNotesInput('')
  }

  const updateItem = (itemId, updates) => {
    updateShoppingList((draft) => {
      const item = draft.find((entry) => entry.id === itemId)

      if (!item) {
        return
      }

      if (updates.name !== undefined) {
        item.name = updates.name
      }

      if (updates.quantity !== undefined) {
        item.quantity = updates.quantity
      }

      if (updates.details?.category !== undefined) {
        item.details.category = updates.details.category
      }

      if (updates.details?.notes !== undefined) {
        item.details.notes = updates.details.notes
      }
    })
  }

  const removeItem = (itemId) => {
    updateShoppingList((draft) => {
      const index = draft.findIndex((entry) => entry.id === itemId)

      if (index !== -1) {
        draft.splice(index, 1)
      }
    })

    setNoteDrafts((prevDrafts) => {
      const nextDrafts = { ...prevDrafts }
      delete nextDrafts[itemId]
      return nextDrafts
    })
  }

  return (
    <section className="shopping-card">
      <h2>Shopping List with `useImmer`</h2>

      <div className="shopping-form-grid">
        <input
          type="text"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          placeholder="Item name"
        />
        <input
          type="number"
          min="1"
          value={quantityInput}
          onChange={(event) => setQuantityInput(event.target.value)}
          placeholder="Quantity"
        />
        <input
          type="text"
          value={categoryInput}
          onChange={(event) => setCategoryInput(event.target.value)}
          placeholder="Category"
        />
        <input
          type="text"
          value={notesInput}
          onChange={(event) => setNotesInput(event.target.value)}
          placeholder="Notes"
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      {shoppingList.length === 0 ? (
        <p className="shopping-empty">No items yet.</p>
      ) : (
        <ul className="shopping-list">
          {shoppingList.map((item) => (
            <li key={item.id} className="shopping-item">
              <div>
                <p className="shopping-item-title">
                  {item.name} (Qty: {item.quantity})
                </p>
                <p className="shopping-item-meta">Category: {item.details.category}</p>
                <p className="shopping-item-meta">Notes: {item.details.notes || '—'}</p>
              </div>

              <div className="shopping-actions">
                <button
                  onClick={() =>
                    updateItem(item.id, {
                      quantity: item.quantity + 1
                    })
                  }
                >
                  +1 Qty
                </button>

                <input
                  type="text"
                  value={noteDrafts[item.id] ?? ''}
                  onChange={(event) =>
                    setNoteDrafts((prevDrafts) => ({
                      ...prevDrafts,
                      [item.id]: event.target.value
                    }))
                  }
                  placeholder="New note"
                />

                <button
                  onClick={() =>
                    updateItem(item.id, {
                      details: {
                        notes: (noteDrafts[item.id] ?? '').trim()
                      }
                    })
                  }
                >
                  Update Note
                </button>

                <button className="danger-btn" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ShoppingListWithImmer