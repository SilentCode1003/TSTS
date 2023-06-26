import renameKeys from './renameKeys'

/**
 * This function is used to create a table filter
 * @param {*} obj The object state from the frontend
 * @returns The converted object that can be used by the API
 */
const columnVisibilityToFilterData = (obj) => {
  if (Object.keys(obj).length === 0) {
    const defaultObj = {
      isticketid: '1',
      issubject: '1',
      isconcern: '1',
      isissue: '1',
      isrequestername: '1',
      isrequesteremail: '1',
      isdescription: '1',
      ispriority: '1',
      isticketstatus: '1',
      isdatecreated: '1',
      isduedate: '1',
      isstatusdetail: '1',
      isassignto: '1',
      isdepartment: '1',
      isattachement: '1',
      iscomment: '1',
    }

    return defaultObj
  }

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
