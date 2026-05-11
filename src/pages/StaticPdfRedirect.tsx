import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { units } from "@/data/units";
import NotFound from "./NotFound";

const StaticPdfRedirect = () => {
  const { unitNumber, chapterNumber } = useParams();

  const unitIndex = Number(unitNumber) - 1;
  const chapterIndex = Number(chapterNumber) - 1;
  const unit = units[unitIndex];
  const filename = unit?.chapterPdfs?.[chapterIndex]?.[0];
  const targetUrl = filename ? `/MTH166/${encodeURI(filename)}` : null;

  useEffect(() => {
    if (!targetUrl) {
      return;
    }

    window.location.replace(targetUrl);
  }, [targetUrl]);

  if (!unitNumber || !chapterNumber || !unit || !filename) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
        <p className="text-sm text-muted-foreground mb-4">Redirecting to the requested static PDF...</p>
        <p className="text-base text-foreground">
          If your browser does not redirect automatically, please wait or try opening the link again.
        </p>
      </div>
    </div>
  );
};

export default StaticPdfRedirect;
