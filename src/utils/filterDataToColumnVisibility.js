import renameKeys from './renameKeys'

const convertObject = (obj) => {
  const newKeys = {
    isticketid: 'ticketid',
    issubject: 'subject',
    isconcern: 'concern',
    isissue: 'issue',
    isrequestername: 'requestername',
    isrequesteremail: 'requesteremail',
    isdescription: 'description',
    ispriority: 'priority',
    isticketstatus: 'ticketstatus',
    isdatecreated: 'datecreated',
    isduedate: 'duedate',
    isstatusdetail: 'statusdetail',
    isassignto: 'assignedto',
    isdepartment: 'department',
    isattachement: 'attachement',
    iscomment: 'comment',
  }
  const renamedObj = renameKeys(obj, newKeys)
  delete renamedObj.filtername
  delete renamedObj.filtercode
  delete renamedObj.status
  delete renamedObj.status
  delete renamedObj.createdby
  delete renamedObj.createddate

  const convertedObject = {}

  for (const key in renamedObj) {
    if (renamedObj.hasOwnProperty(key)) {
      const value = renamedObj[key]
      convertedObject[key] = value === '1'
    }
  }

  return convertedObject
}

export default convertObject
