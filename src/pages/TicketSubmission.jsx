import { useForm } from 'react-hook-form'

const invalidInputClass = 'border border-red-500'
const invalidTextClass = 'text-red-500'

function TicketSubmission() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="w-auto h-screen p-8 flex flex-col gap-8 overflow-y-auto">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Ticket Submission
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        <div className="p-4 rounded border flex flex-col gap-2 bg-gray-50">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              {...register('name', { required: true })}
              className={`py-2 px-4 w-full border bg-gray-100 rounded-sm text-gray-900 ${
                errors.name && invalidInputClass
              }`}
            />
            <p className={errors.name && invalidTextClass}>
              {errors.name && 'Name is required'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="category">Category: </label>
            <select
              id="category"
              {...register('category', { required: true })}
              className={`py-2 px-4 w-full border bg-gray-100 rounded-sm text-gray-900 ${
                errors.category && invalidInputClass
              }`}
            >
              <option value="">Please select a category</option>
              <option value="general">General</option>
              <option value="software">Software</option>
              <option value="hardware">Hardware</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <p className={errors.name && invalidTextClass}>
            {errors.category && 'Category is required'}
          </p>

          <div className="flex flex-col gap-4">
            <label htmlFor="description">Description: </label>
            <textarea
              cols="60"
              rows="5"
              id="description"
              {...register('description', { required: true })}
              className={`py-2 px-4 w-full border bg-gray-100 rounded-sm text-gray-900 resize-none ${
                errors.description && invalidInputClass
              }`}
            ></textarea>
            <p className={errors.name && invalidTextClass}>
              {errors.description && 'Description is required'}
            </p>
          </div>

          <div>
            <label htmlFor="files">
              Upload Files
              <input type="file" id="files" multiple {...register('files')} />
            </label>
          </div>

          <div className="flex items-center justify-center">
            <button className="min-w-[9rem] w-1/4 py-4 px-2 bg-red-500 text-white rounded-md hover:bg-red-700 text-base md:text-xl font-bold">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default TicketSubmission
