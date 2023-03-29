import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TicketAssignmentTable from '../components/TicketAssignmentTable'
import clients from '../data/clients.json'
import names from '../data/names.json'
import priorities from '../data/priority.json'
import tickets from '../data/tickets.json'

function TicketAssignment() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles]

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)
      }
    })

    setUploadedFiles(uploaded)
  }

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles)
  }

  const onSubmit = (e) => {
    console.log(e)
    console.log(uploadedFiles)

    reset()
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      <p className="text-2xl md:text-4xl font-bold text-center">
        Ticket Assignment
      </p>
      <div className="flex flex-col gap-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          <div className="p-4 rounded border flex flex-col gap-4 bg-gray-50">
            <div className="flex items-center gap-4">
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
            </div>
            {errors.name && (
              <p className=" text-red-500 text-right">Name is required</p>
            )}

            <div className="flex items-center gap-4">
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
            </div>
            {errors.client && (
              <p className=" text-red-500 text-right">
                Store/Client is required
              </p>
            )}

            <div className="flex items-center gap-4">
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
            </div>
            {errors.priority && (
              <p className=" text-red-500 text-right">Priority is required</p>
            )}

            <div className="grid gap-4">
              <p>
                <label htmlFor="description" className="font-bold">
                  Description:{' '}
                </label>
              </p>
              <textarea
                name="description"
                id="description"
                rows="8"
                className={`py-2 px-4 w-full border bg-gray-100 rounded-sm text-gray-900 ${
                  errors.description && 'border-red-500'
                } resize-none`}
                {...register('description', { required: true })}
              ></textarea>
              {errors.description && (
                <p className=" text-red-500 text-right">
                  Description is required
                </p>
              )}
            </div>

            <div className="flex flex-col items-start gap-4">
              <p className="font-bold">Attachments: </p>
              <input
                type="file"
                name="file"
                multiple
                onChange={handleFileEvent}
              />

              {uploadedFiles.length < 1 ? (
                'No files selected'
              ) : (
                <ul className="flex flex-col gap-2 list-none">
                  <p>File(s) selected: </p>
                  <button
                    onClick={() => setUploadedFiles([])}
                    className="border border-gray-500 hover:bg-gray-100 rounded"
                  >
                    Clear all
                  </button>
                  {uploadedFiles.map((file) => (
                    <li key={file.name} className="text-sm font-semibold">
                      {file.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid place-items-center">
              <button className="w-1/4 py-4 px-2 bg-red-500 text-white rounded-md hover:bg-red-700 text-xl font-bold">
                Assign
              </button>
            </div>
          </div>
        </form>

        <TicketAssignmentTable tickets={tickets} />
      </div>
    </div>
  )
}

export default TicketAssignment
