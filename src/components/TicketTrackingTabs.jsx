import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  HStack,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useGetFilterProfiles } from '../api/ticket-tracking/getFilterProfiles'
import filterDataToColumnVisibility from '../utils/filterDataToColumnVisibility'
import TicketTrackingCheckboxes from './TicketTrackingCheckboxes'
import { useEffect } from 'react'
import { useAddFilterProfile } from '../api/ticket-tracking/addFilterProfile'
import columnVisibilityToFilterData from '../utils/ColumnVisibilityToFilterData'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useErrorToast, useSuccessToast } from '../hooks/useToastFeedback'

const TicketTrackingTabs = ({
  table,
  columnVisibility,
  setColumnVisibility,
}) => {
  const { currentUser } = useContext(AuthContext)
  const filterProfiles = useGetFilterProfiles()
  const addFilterProfile = useAddFilterProfile()
  const [selectValue, setSelectValue] = useState('')
  const [newFilterName, setNewFilterName] = useState('')

  const successToast = useSuccessToast({
    title: 'Success',
    description: 'Filter created successfully',
  })
  const errorToast = useErrorToast({
    title: 'Error',
    description: 'Something went wrong',
  })

  const handleChange = (e) => {
    setSelectValue(e.target.value)
  }

  const handleApply = () => {
    const selectedFilter = filterProfiles.data?.data.find(
      (filter) => filter.filtername === selectValue
    )
    const filterVisibility = filterDataToColumnVisibility(selectedFilter)

    setColumnVisibility(filterVisibility)
  }

  const handleAddProfile = async () => {
    if (!newFilterName) {
      return
    }

    const newFilterData = columnVisibilityToFilterData(columnVisibility)

    const newProfile = {
      filtername: newFilterName,
      createdby: currentUser.fullname,
      ...newFilterData,
    }

    try {
      const res = await addFilterProfile.mutateAsync(newProfile)
      successToast()
    } catch (e) {
      console.log(e)
      errorToast()
    }
  }

  useEffect(() => {
    const defaultFilter =
      filterProfiles.data?.data.find(
        (filter) => filter.status === 'INACTIVE'
      ) || ''
    const filterVisibility = filterDataToColumnVisibility(defaultFilter)
    console.log(filterVisibility)

    setSelectValue(defaultFilter.filtername)
    setColumnVisibility(filterVisibility)
  }, [filterProfiles.data])

  return (
    <Tabs
      maxH="350px"
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
              {filterProfiles.data?.data.length > 0 &&
                filterProfiles.data.data.map((profile) => (
                  <option key={profile.filtercode} value={profile.filtername}>
                    {profile.filtername}
                  </option>
                ))}
            </Select>

            <VStack>
              <Button colorScheme="purple" onClick={handleApply}>
                Apply
              </Button>
              {/* <Button colorScheme="purple" variant="outline">
                Create
              </Button>
              <Button colorScheme="purple" variant="ghost">
                Edit
              </Button> */}
            </VStack>
          </VStack>
        </TabPanel>

        <TabPanel>
          <VStack spacing="4" divider={<Divider />}>
            <FormControl>
              <Input
                list="filterProfiles"
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
              />
              <datalist id="filterProfiles">
                {filterProfiles.data?.data.length > 0 &&
                  filterProfiles.data.data.map((profile) => (
                    <option key={profile.filtercode} value={profile.filtername}>
                      {profile.filtername}
                    </option>
                  ))}
              </datalist>
            </FormControl>

            <TicketTrackingCheckboxes table={table} />

            <ButtonGroup>
              <Button colorScheme="purple" onClick={handleAddProfile}>
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
