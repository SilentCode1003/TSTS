import { useState } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import reportsData from '../data/reports.json'

function Reporting() {
  const [reports, setReports] = useState(reportsData)

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
