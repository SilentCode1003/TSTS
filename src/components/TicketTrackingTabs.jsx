import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  ButtonGroup,
  Divider,
  HStack,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import TicketTrackingCheckboxes from './TicketTrackingCheckboxes'

const filterProfilesData = [
  {
    id: 1,
    filtername: 'Profile 1',
    filterdata: {
      ticketid: true,
      subject: true,
      concern: true,
      issue: true,
      requestername: true,
      requesteremail: true,
      description: true,
      priority: true,
      ticketstatus: true,
      datecreated: true,
      duedate: true,
      statusdetail: true,
      assignedto: true,
      department: true,
      attachement: true,
      comment: true,
      actions: true,
    },
  },
  {
    id: 2,
    filtername: 'Profile 2',
    filterdata: {
      ticketid: true,
      subject: false,
      concern: false,
      issue: false,
      requestername: false,
      requesteremail: false,
      description: false,
      priority: false,
      ticketstatus: false,
      datecreated: false,
      duedate: false,
      statusdetail: false,
      assignedto: false,
      department: false,
      attachement: false,
      comment: false,
      actions: false,
    },
  },
]

const TicketTrackingTabs = ({
  table,
  columnVisibility,
  setColumnVisibility,
}) => {
  const [filterProfiles, setFilterProfiles] = useState(filterProfilesData)
  const [currentFilter, setCurrentFilter] = useState(filterProfiles[1])
  const [selectValue, setSelectValue] = useState('')

  const handleChange = (e) => {
    const selectedFilter = filterProfiles.find(
      (filter) => filter.id === +e.target.value
    )

    setCurrentFilter(selectedFilter)
    setSelectValue(e.target.value)
    setColumnVisibility(selectedFilter.filterdata)
  }

  const handleApply = () => {
    // TODO: save to db
    // setColumnVisibility(currentFilter.filterdata)
  }

  const handleAddProfile = () => {
    const newProfile = {
      id: filterProfiles.length + 1,
      filtername: 'New Profile',
      filterdata: {
        ticketid: true,
        subject: false,
        concern: false,
        issue: true,
        requestername: true,
        requesteremail: true,
        description: true,
        priority: false,
        ticketstatus: false,
        datecreated: false,
        duedate: false,
        statusdetail: false,
        assignedto: false,
        department: false,
        attachement: false,
        comment: false,
        actions: false,
      },
    }

    setFilterProfiles((prev) => [...prev, newProfile])
    setSelectValue(newProfile.id)
    setCurrentFilter(newProfile)
    setColumnVisibility(newProfile.filterdata)
  }

  const handleProfileSave = () => {
    const objIndex = filterProfiles.findIndex((obj) => obj.id == selectValue)
    filterProfiles[objIndex].filterdata = columnVisibility
    const updatedProfile = filterProfiles

    setFilterProfiles(updatedProfile)
  }

  useEffect(() => {
    setSelectValue(currentFilter.id)
    setColumnVisibility(currentFilter.filterdata)
  }, [])

  return (
    <Tabs
      h="350px"
      overflowY="auto"
      overflowX="hidden"
      variant="enclosed"
      isFitted
    >
      <TabList position="sticky" top="0" background="white" zIndex="70">
        <Tab>Select Profile</Tab>
        <Tab>Create/Edit profile</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <VStack spacing="4" divider={<Divider />}>
            <Select onChange={handleChange} value={selectValue}>
              {filterProfiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.filtername}
                </option>
              ))}
            </Select>

            <VStack>
              <Button colorScheme="purple" onClick={handleApply}>
                Apply
              </Button>
              <Button colorScheme="purple" variant="outline">
                Create
              </Button>
              <Button colorScheme="purple" variant="ghost">
                Edit
              </Button>
            </VStack>
          </VStack>
        </TabPanel>

        <TabPanel>
          <VStack spacing="4" divider={<Divider />}>
            <HStack w="100%" spacing="8" justifyContent="space-between">
              <Select onChange={handleChange} value={selectValue}>
                {filterProfiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profile.filtername}
                  </option>
                ))}
              </Select>

              <Button leftIcon={<AddIcon />} onClick={handleAddProfile}>
                Add
              </Button>
            </HStack>

            <TicketTrackingCheckboxes table={table} />

            <ButtonGroup>
              <Button colorScheme="purple" onClick={handleProfileSave}>
                Save Changes
              </Button>
            </ButtonGroup>
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default TicketTrackingTabs
