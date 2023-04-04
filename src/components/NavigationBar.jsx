import {
  MdAssignmentAdd,
  MdChat,
  MdLightbulb,
  MdNewspaper,
  MdReport,
  MdSettings,
  MdTrackChanges,
} from 'react-icons/md'
import NavigationLinks from './NavigationLinks'

export const adminItems = [
  {
    name: 'Ticket Assignment',
    url: '/ticket-assignment',
    icon: <MdAssignmentAdd className="text-xl inline-block" />,
  },
  {
    name: 'Ticket Tracking',
    url: '/ticket-tracking',
    icon: <MdTrackChanges className="text-xl inline-block" />,
  },
  {
    name: 'Knowledge Base',
    url: '/knowledge-base',
    icon: <MdLightbulb className="text-xl inline-block" />,
  },
  {
    name: 'Reporting',
    url: '/reporting',
    icon: <MdReport className="text-xl inline-block" />,
  },
  {
    name: 'Communication',
    url: '/communication',
    icon: <MdChat className="text-xl inline-block" />,
  },
  {
    name: 'Automation',
    url: '/automation',
    icon: <MdSettings className="text-xl inline-block" />,
  },
]

export const clientItems = [
  {
    name: 'Ticket Submission',
    url: '/client/ticket-submission',
    icon: <MdNewspaper className="text-xl inline-block" />,
  },
  {
    name: 'Communication',
    url: '/client/communication',
    icon: <MdChat className="text-xl inline-block" />,
  },
]

function NavigationBar({ isAdmin, setNavIsCollapsed }) {
  return (
    <div className="h-screen bg-red-500 grid grid-rows-[2fr_2fr_8fr] gap-8 sticky top-0 left-0 overflow-y-auto">
      <div className="p-1 sm:p-4 flex flex-col sm:flex-row gap-4 items-center">
        <img src="" alt="" width="100" height="100" />
        <p>5L Solutions</p>
      </div>

      <div className="p-1 sm:p-4 flex items-center justify-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <img src="" alt="" width="80" height="80" />
        </div>
      </div>

      <div>
        <NavigationLinks items={isAdmin ? adminItems : clientItems} />
      </div>
    </div>
  )
}

export default NavigationBar
