import renameKeys from './renameKeys'

const columnVisibilityToFilterData = (obj) => {
  const newKeys = {
    ticketid: 'isticketid',
    subject: 'issubject',
    concern: 'isconcern',
    issue: 'isissue',
    requestername: 'isrequestername',
    requesteremail: 'isrequesteremail',
    description: 'isdescription',
    priority: 'ispriority',
    ticketstatus: 'isticketstatus',
    datecreated: 'isdatecreated',
    duedate: 'isduedate',
    statusdetail: 'isstatusdetail',
    assignedto: 'isassignto',
    department: 'isdepartment',
    attachement: 'isattachement',
    comment: 'iscomment',
  }

  const renamedObj = renameKeys(obj, newKeys)
  console.log(obj)
  const convertedObject = {}

  for (const key in renamedObj) {
    if (renamedObj.hasOwnProperty(key)) {
      const value = renamedObj[key]
      convertedObject[key] = value ? '1' : '0'
    }
  }

  return convertedObject
}

export default columnVisibilityToFilterData
