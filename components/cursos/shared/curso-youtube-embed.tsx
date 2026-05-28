import type { CursoYoutubeVideo } from "@/lib/types/curso-page";
import type { ReactNode } from "react";

type CursoYoutubeEmbedProps = {
  video: CursoYoutubeVideo;
  className?: string;
};

export function CursoYoutubeEmbed({ video, className }: CursoYoutubeEmbedProps): ReactNode {
  return (
    <div
      className={
        className ??
        "aspect-video w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/40 shadow-[0_16px_48px_rgba(8,32,42,0.12)]"
      }
    >
      <iframe
        src={`https://www.youtube.com/embed/${video.videoId}`}
        title={video.title}
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
