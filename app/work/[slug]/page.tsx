import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FLAGSHIP_PROJECTS, getProjectBySlug } from "@/content/projects";
import { buildMetadata, projectJsonLd } from "@/lib/seo";
import CaseStudyBody from "@/components/projects/CaseStudyBody";

export function generateStaticParams() {
  return FLAGSHIP_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: `${project.title} — Pradeepa Lakruwan`,
    description: project.tagline,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.flagship) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <CaseStudyBody project={project} />
    </>
  );
}
