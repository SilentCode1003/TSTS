import namesData from '../data/names.json'
import clientsData from '../data/clients.json'
import prioritiesData from '../data/priority.json'
import { useState } from 'react'

function TicketAssignment() {
  const names = namesData
  const clients = clientsData
  const priorities = prioritiesData
  const [input, setInput] = useState({
    name: '',
    client: '',
    priority: '',
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(input)
  }

  const handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAddButton = () => {
    console.log('Add')
  }

  const handleSubmitButton = () => {
    console.log('Submit')
  }

  const handleRequestButton = () => {
    console.log('Request')
  }

  return (
    <div className="p-8 bg-gray-50-200">
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-[2fr_4fr_6fr] gap-1">
            <label htmlFor="name" className="font-bold">
              Name:{' '}
            </label>
            <input
              list="name"
              name="name"
              className="py-1 px-2 rounded bg-gray-300 text-gray-900"
              value={input.name}
              onChange={handleInputChange}
            />
            <datalist id="name">
              {names.map((name) => (
                <option key={name.id} value={name.name}>
                  {name.name}
                </option>
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-[2fr_4fr_6fr] gap-1">
            <label htmlFor="client" className="font-bold">
              Store/Client:{' '}
            </label>
            <input
              list="client"
              name="client"
              className="py-1 px-2 rounded bg-gray-300 text-gray-900"
              value={input.client}
              onChange={handleInputChange}
            />
            <datalist id="client">
              {clients.map((client) => (
                <option key={client.id} value={client.name}>
                  {client.name}
                </option>
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-[2fr_4fr_6fr] gap-1">
            <label htmlFor="priority" className="font-bold">
              Priority:{' '}
            </label>
            <input
              list="priority"
              name="priority"
              className="py-1 px-2 rounded bg-gray-300 text-gray-900"
              value={input.priority}
              onChange={handleInputChange}
            />
            <datalist id="priority">
              {priorities.map((priority) => (
                <option key={priority.id} value={priority.level}>
                  {priority.level}
                </option>
              ))}
            </datalist>
          </div>

          <div className="grid gap-4">
            <p>
              <label htmlFor="description" className="font-bold">
                Description:{' '}
              </label>
            </p>
            <textarea
              name="description"
              id="description"
              cols="90"
              rows="10"
              className="py-1 px-2 rounded bg-gray-300 text-gray-900"
              value={input.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="grid grid-cols-4 gap-10">
            <button className="py-4 px-2 bg-red-500 text-white rounded-md hover:bg-red-700">
              Assign
            </button>
            <button
              type="button"
              onClick={handleAddButton}
              className="py-4 px-2 bg-teal-500 text-white rounded-md hover:bg-teal-700"
            >
              Add
            </button>
            <button
              type="button"
              onClick={handleSubmitButton}
              className="py-4 px-2  bg-fuchsia-500 text-white rounded-md hover:bg-fuchsia-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleRequestButton}
              className="py-4 px-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-700"
            >
              Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TicketAssignment
