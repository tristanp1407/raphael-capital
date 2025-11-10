// Collections
import project from './project'
import sector from './sector'
import teamMember from './collections/teamMember'
import brandLogo from './collections/brandLogo'

// Global Singletons
import siteSettings from './singletons/siteSettings'
import footerContent from './singletons/footerContent'
import contactInfo from './singletons/contactInfo'
import investmentHighlights from './singletons/investmentHighlights'

// Page Singletons
import homePage from './pages/homePage'
import aboutPage from './pages/aboutPage'
import trackRecordPage from './pages/trackRecordPage'
import requirementsPage from './pages/requirementsPage'
import contactPage from './pages/contactPage'

export const schemaTypes = [
  // Collections
  project,
  sector,
  teamMember,
  brandLogo,

  // Global Singletons
  siteSettings,
  footerContent,
  contactInfo,
  investmentHighlights,

  // Page Singletons
  homePage,
  aboutPage,
  trackRecordPage,
  requirementsPage,
  contactPage,
]
