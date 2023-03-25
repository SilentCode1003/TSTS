import namesData from '../data/names.json'
import clientsData from '../data/clients.json'
import prioritiesData from '../data/priority.json'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function TicketAssignment() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const names = namesData
  const clients = clientsData
  const priorities = prioritiesData

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
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-[2fr_4fr_6fr] gap-4 items-center">
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

          <div className="grid grid-cols-[2fr_4fr_6fr] gap-4 items-center">
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

          <div className="grid grid-cols-[2fr_4fr_6fr] gap-4 items-center">
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
