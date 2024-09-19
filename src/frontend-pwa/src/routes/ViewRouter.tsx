/**
 * @summary Router to different views
 * @author Dallas Richmond
 */
import { Routes, Route } from 'react-router-dom';

import Home from '../views/Home/Home';
import Report from '../views/Report/Report';
import Settings from '../views/Settings/Settings';
import AboutContact from '../views/AboutContact/AboutContact';
import Eula from '../views/Eula/Eula';
import LocationInformation from '../views/LocationInformation/LocationInformation';
import NotFound from '../views/NotFound/NotFound';
import ReportHistory from '../views/ReportHistory/ReportHistory';
import Advisory from '../views/Advisory/Advisory';
import WhatsNew from '../views/WhatsNew/WhatsNew';

export default function ViewRouter() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/eula" Component={Eula} />
      <Route path="/report" Component={Report} />
      <Route path="/settings" Component={Settings} />
      <Route path="/settings/about" Component={AboutContact} />
      <Route path="/settings/changelog" Component={WhatsNew} />
      <Route path="/location/:service/:locale" Component={LocationInformation} />
      <Route path="/report/history" Component={ReportHistory} />
      <Route path="/advisories" Component={Advisory} />
      <Route path="*" Component={NotFound} />
    </Routes>
  );
}
