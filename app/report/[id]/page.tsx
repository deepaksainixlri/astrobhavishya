import ReportContent from './ReportContent';

export async function generateStaticParams() {
  return [
    { id: 'demo-report-123' },
    { id: 'demo-report-456' },
    { id: 'demo-report-789' },
  ];
}

export default function ReportPage({ params }: { params: { id: string } }) {
  return <ReportContent id={params.id} />;
}
