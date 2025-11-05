import { WorkingProviders } from '../providers-working';

export default function WorkingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WorkingProviders>{children}</WorkingProviders>;
}