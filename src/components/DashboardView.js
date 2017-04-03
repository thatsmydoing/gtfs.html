import React from 'react';

import StatsView from '../components/StatsView';
import ErrorList from '../components/ErrorList';

export default function DashboardView({feed}) {
  return (
    <div className="dashboard">
      <div className="stats-column">
        <h3>Statistics</h3>
        <StatsView feed={feed} />
      </div>
      <div className="errors-column">
        <h3>Errors</h3>
        <ErrorList feed={feed} />
      </div>
    </div>
  )
}
