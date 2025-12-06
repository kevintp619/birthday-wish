"use client";
import GoodBye from './GoodBye';

interface GoodbyeClientProps {
  personName: string;
}

export default function GoodbyeClient({ personName }: GoodbyeClientProps) {
  return <GoodBye personName={personName} />;
}
