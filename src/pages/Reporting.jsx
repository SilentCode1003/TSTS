import { useState } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

function Reporting() {
  const [reports, setReports] = useState([
    {
      id: 1,
      date: '2022-01-01',
      ticketVolume: 50,
      resolutionTime: 24,
      customerSatisfaction: 8,
    },
    {
      id: 2,
      date: '2022-01-01',
      ticketVolume: 45,
      resolutionTime: 26,
      customerSatisfaction: 9,
    },
    {
      id: 3,
      date: '2022-01-03',
      ticketVolume: 60,
      resolutionTime: 8,
      customerSatisfaction: 9,
    },
  ])

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.setFont('Helvetica')
    autoTable(doc, { html: '#reports-table' })
    doc.save('reports-table.pdf')
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      <p className="text-2xl md:text-4xl font-bold text-center">Reporting</p>
      <button
        onClick={exportPDF}
        className="py-4 px-8 mx-auto bg-red-500 hover:bg-red-700 rounded-md font-bold text-white"
      >
        Download Table
      </button>
      <div className="w-full overflow-x-auto">
        <table id="reports-table" className="w-full table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Ticket Volume
              </th>
              <th scope="col" className="px-6 py-3">
                Resolution Time (hours)
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Satisfaction (0-10)
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-gray-200">
                <td className="p-1 text-center text-xs">{report.date}</td>
                <td className="p-1 text-center text-xs">
                  {report.ticketVolume}
                </td>
                <td className="p-1 text-center text-xs">
                  {report.resolutionTime}
                </td>
                <td className="p-1 text-center text-xs">
                  {report.customerSatisfaction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Reporting
