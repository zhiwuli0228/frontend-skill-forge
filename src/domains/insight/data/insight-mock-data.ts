export interface StatCard {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'flat';
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ReportItem {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface ExportItem {
  id: string;
  format: string;
  dateRange: string;
  createdAt: string;
  status: 'ready' | 'processing' | 'failed';
  downloadUrl: string;
}

export const statCards: StatCard[] = [
  { title: 'Total Tasks', value: '156', trend: '+12.5%', trendType: 'up' },
  { title: 'Active Skills', value: '24', trend: '+3', trendType: 'up' },
  { title: 'Workflows', value: '12', trend: '0', trendType: 'flat' },
  { title: 'Success Rate', value: '94.2%', trend: '+2.1%', trendType: 'up' },
];

export const taskTrendData: ChartDataPoint[] = [
  { label: 'Jan', value: 18 },
  { label: 'Feb', value: 24 },
  { label: 'Mar', value: 21 },
  { label: 'Apr', value: 30 },
  { label: 'May', value: 27 },
  { label: 'Jun', value: 36 },
];

export const skillUsageData: ChartDataPoint[] = [
  { label: 'Text', value: 45 },
  { label: 'Image', value: 30 },
  { label: 'Data', value: 20 },
  { label: 'Tool', value: 15 },
];

export const reports: ReportItem[] = [
  { id: '1', name: 'Monthly Performance Summary', type: 'Performance', date: '2026-06-01', status: 'completed' },
  { id: '2', name: 'Task Completion Analysis', type: 'Analysis', date: '2026-05-28', status: 'completed' },
  { id: '3', name: 'Skill Usage Breakdown', type: 'Usage', date: '2026-05-25', status: 'pending' },
  { id: '4', name: 'Error Rate Report', type: 'Error', date: '2026-05-20', status: 'completed' },
  { id: '5', name: 'Workflow Efficiency Review', type: 'Efficiency', date: '2026-05-18', status: 'failed' },
  { id: '6', name: 'User Activity Digest', type: 'Activity', date: '2026-05-15', status: 'completed' },
  { id: '7', name: 'Resource Utilization Report', type: 'Resource', date: '2026-05-10', status: 'pending' },
  { id: '8', name: 'Quarterly Trend Overview', type: 'Trend', date: '2026-05-05', status: 'completed' },
];

export const emptyReports: ReportItem[] = [];

export const exports: ExportItem[] = [
  { id: '1', format: 'CSV', dateRange: '2026-05-01 to 2026-05-31', createdAt: '2026-06-01 10:30', status: 'ready', downloadUrl: '#1' },
  { id: '2', format: 'JSON', dateRange: '2026-04-01 to 2026-04-30', createdAt: '2026-05-02 14:15', status: 'ready', downloadUrl: '#2' },
  { id: '3', format: 'PDF', dateRange: '2026-03-01 to 2026-03-31', createdAt: '2026-04-01 09:00', status: 'processing', downloadUrl: '' },
  { id: '4', format: 'CSV', dateRange: '2026-02-01 to 2026-02-28', createdAt: '2026-03-01 16:45', status: 'failed', downloadUrl: '' },
  { id: '5', format: 'JSON', dateRange: '2026-01-01 to 2026-01-31', createdAt: '2026-02-01 11:20', status: 'ready', downloadUrl: '#5' },
];

export const emptyExports: ExportItem[] = [];
