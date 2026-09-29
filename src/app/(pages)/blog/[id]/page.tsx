import { permanentRedirect } from "next/navigation";

const legacySlugs: Record<string, string> = {
  "dont-bully-me-campaign": "xfrple26m2zu5fd",
  "the-digital-literacy-project": "4pl0x8grg1er9qv",
  "big-smile-project": "j3fhhgfmav8nrwr",
  "community-outreach-empowerment": "0oazw62uxxbfenh",
};

export default function BlogPost({ params }: { params: { id: string } }) {
  permanentRedirect(`/projects/${encodeURIComponent(legacySlugs[params.id] || params.id)}`);
}
