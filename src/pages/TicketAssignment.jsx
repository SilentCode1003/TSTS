import names from '../data/names.json'
import clients from '../data/clients.json'
import priorities from '../data/priority.json'
import tickets from '../data/tickets.json'
import { useForm } from 'react-hook-form'
import TicketAssignmentTable from '../components/TicketAssignmentTable'

function TicketAssignment() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (e) => {
    console.log(e)

    reset()
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
      <div className="flex flex-col gap-12">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-[2fr_6fr_4fr] gap-4 items-center">
            <label htmlFor="name" className="font-bold">
              Name:{' '}
            </label>
            <select
              list="name"
              className={`py-2 px-4 w-full border bg-gray-100 rounded-sm text-gray-900 ${
                errors.name && 'border-red-500'
              }`}
              {...register('name', { required: true, value: '' })}
            >
              {names.map((name) => (
                <option key={name.id} value={name.name}>
                  {name.name}
                </option>
              ))}
            </select>
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>

          <div className="grid grid-cols-[2fr_6fr_4fr] gap-4 items-center">
            <label htmlFor="client" className="font-bold">
              Store/Client:{' '}
            </label>
            <select
              list="client"
              name="client"
              className={`py-2 px-4 w-full border bg-gray-100 rounded-sm text-gray-900 ${
                errors.client && 'border-red-500'
              }`}
              {...register('client', { required: true, value: '' })}
            >
              {clients.map((client) => (
                <option key={client.id} value={client.name}>
                  {client.name}
                </option>
              ))}
            </select>
            {errors.client && (
              <span className="text-red-500">Store/Client is required</span>
            )}
          </div>

          <div className="grid grid-cols-[2fr_6fr_4fr] gap-4 items-center">
            <label htmlFor="priority" className="font-bold">
              Priority:{' '}
            </label>
            <select
              list="priority"
              name="priority"
              className={`py-2 px-4 w-full border bg-gray-100 rounded-sm text-gray-900 ${
                errors.priority && 'border-red-500'
              }`}
              {...register('priority', { required: true, value: '' })}
            >
              {priorities.map((priority) => (
                <option key={priority.id} value={priority.level}>
                  {priority.level}
                </option>
              ))}
            </select>
            {errors.priority && (
              <span className="text-red-500">Priority is required</span>
            )}
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
              className={`py-2 px-4 w-full border bg-gray-100 rounded-sm text-gray-900 ${
                errors.description && 'border-red-500'
              }`}
              {...register('description', { required: true })}
            ></textarea>
            {errors.description && (
              <span className="text-red-500">Description is required</span>
            )}
          </div>

          <div className="grid place-items-center">
            <button className="w-1/4 py-4 px-2 bg-red-500 text-white rounded-md hover:bg-red-700 text-xl font-bold">
              Assign
            </button>
          </div>
        </form>

        <TicketAssignmentTable tickets={tickets} />
      </div>
    </div>
  )
}

export default TicketAssignment
