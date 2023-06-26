import renameKeys from './renameKeys'

/**
 * This function converts filter data from the API to the visibility state of the table
 * @param {*} obj The object from api with its properties containing either 1 or 0
 * @returns {*} The object that can be used as the state for the table
 */
const filterDataToColumnVisibility = (obj) => {
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

export default filterDataToColumnVisibility
