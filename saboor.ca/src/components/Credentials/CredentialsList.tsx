import { JSX } from '@builder.io/qwik/jsx-runtime';
import AWSCloudPractitioner from '~/components/images/credentials/aws-certified-cloud-practitioner.png?jsx';
export type Project = {
  title: string;
  href: string;
  date: string;
  description: string;
  image: JSX.Element;
  class: string;
  wip?: boolean;
}

export const Credentials: Project[] = [
  {
    title: 'AWS Certified Cloud Practitioner',
    href: 'https://www.credly.com/badges/d32dbf78-2b93-4724-b466-341f21aa766a/public_url',
    date: 'Issued Mar 11 2026',
    description: 'Validates foundational AWS fluency and essential cloud service identification.',
    image: <AWSCloudPractitioner class="w-14 h-14" />,
    class: 'lum-bg-blue-950/20 hover:lum-bg-blue-950',
  },
];