import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  FileText, 
  Loader2, 
  ChevronDown,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
}

interface PageRenderItem {
  pageNumber: number;
  canvas: HTMLCanvasElement | null;
  width: number;
  height: number;
}

export const ResumeModal: React.FC = () => {
  const { isResumeModalOpen, setIsResumeModalOpen, data } = usePortfolio();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.2);
  const [currentPageInView, setCurrentPageInView] = useState<number>(1);
  const [useIframeFallback, setUseIframeFallback] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);

  // Preserve scroll position and lock background scroll when opening/closing
  useEffect(() => {
    if (!isResumeModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsResumeModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isResumeModalOpen, setIsResumeModalOpen]);

  // Adjust default scale for mobile screens
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) {
        setScale(0.85);
      } else if (window.innerWidth < 1024) {
        setScale(1.05);
      } else {
        setScale(1.25);
      }
    }
  }, [isResumeModalOpen]);

  // Load PDF Document
  useEffect(() => {
    if (!isResumeModalOpen) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: data.resumeDownloadUrl || '/resume/Sooraj_KK_Resume.pdf',
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/cmaps/',
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (!isMounted) return;

        pdfDocRef.current = doc;
        setNumPages(doc.numPages);
        setLoading(false);
      } catch (err: unknown) {
        console.error('Failed to load PDF using PDF.js:', err);
        if (isMounted) {
          setError('Unable to initialize interactive viewer. Using embedded viewer.');
          setUseIframeFallback(true);
          setLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      isMounted = false;
      if (pdfDocRef.current) {
        pdfDocRef.current.cleanup();
        pdfDocRef.current = null;
      }
    };
  }, [isResumeModalOpen, data.resumeDownloadUrl]);

  // Render individual page to canvas
  const renderPage = useCallback(
    async (pageNumber: number, canvas: HTMLCanvasElement, containerWidth: number) => {
      if (!pdfDocRef.current) return;

      try {
        const page = await pdfDocRef.current.getPage(pageNumber);
        
        // Base viewport at 1.0 scale
        const unscaledViewport = page.getViewport({ scale: 1 });
        
        // Calculate responsive scale
        let targetScale = scale;
        // On mobile, if scale * unscaledViewport.width > available width, fit to available width
        if (containerWidth > 0 && unscaledViewport.width * scale > containerWidth - 32) {
          targetScale = Math.min(scale, (containerWidth - 32) / unscaledViewport.width);
        }

        const viewport = page.getViewport({ scale: targetScale });
        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const renderContext = {
          canvas: canvas,
          canvasContext: ctx,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        console.error(`Error rendering page ${pageNumber}:`, err);
      }
    },
    [scale]
  );

  // Trigger render of all pages when numPages, scale, or container changes
  useEffect(() => {
    if (!isResumeModalOpen || loading || !numPages || useIframeFallback) return;

    const containerWidth = containerRef.current?.clientWidth || window.innerWidth;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const pageContainer = pageRefs.current[pageNum - 1];
      if (pageContainer) {
        const canvas = pageContainer.querySelector('canvas');
        if (canvas) {
          renderPage(pageNum, canvas, containerWidth);
        }
      }
    }
  }, [isResumeModalOpen, loading, numPages, scale, renderPage, useIframeFallback]);

  // Track scroll position to update current page indicator
  const handleScroll = () => {
    if (!containerRef.current || numPages <= 1) return;
    const scrollTop = containerRef.current.scrollTop;
    const containerHeight = containerRef.current.clientHeight;

    let activePage = 1;
    for (let i = 0; i < pageRefs.current.length; i++) {
      const el = pageRefs.current[i];
      if (el) {
        const top = el.offsetTop - 120;
        if (scrollTop >= top) {
          activePage = i + 1;
        }
      }
    }
    setCurrentPageInView(activePage);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6));
  };

  const handleResetZoom = () => {
    if (window.innerWidth < 640) {
      setScale(0.85);
    } else if (window.innerWidth < 1024) {
      setScale(1.05);
    } else {
      setScale(1.25);
    }
  };

  const scrollToPage = (pageNum: number) => {
    const el = pageRefs.current[pageNum - 1];
    if (el && containerRef.current) {
      containerRef.current.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  if (!isResumeModalOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsResumeModalOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-10 w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border ${
            isLight
              ? 'bg-slate-100 border-slate-300 text-slate-800 shadow-slate-900/30'
              : 'bg-[#0b1329] border-slate-700/80 text-white shadow-black/80'
          }`}
        >
          {/* Top Bar Header */}
          <div className={`px-4 sm:px-6 py-3.5 border-b flex items-center justify-between gap-3 shrink-0 ${
            isLight
              ? 'bg-white/95 border-slate-200'
              : 'bg-[#101A33]/95 border-slate-800'
          }`}>
            {/* Title & Document Badge */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-gradient-to-r from-[#2196F3]/15 to-[#F0445B]/15 border border-[#2196F3]/30 text-[#2196F3] shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h2 
                  id="resume-modal-title" 
                  className={`text-sm sm:text-base font-bold truncate flex items-center gap-2 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  <span>{data.name} &mdash; Official Resume</span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    PDF Document
                  </span>
                </h2>
                <p className={`text-xs truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {numPages > 0 ? `Showing all ${numPages} pages` : 'Loading document...'}
                  {numPages > 1 && (
                    <span className="ml-2 font-mono text-[11px] text-[#2196F3]">
                      (Viewing Page {currentPageInView} of {numPages})
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Viewer Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Page quick jumps on tablet/desktop */}
              {numPages > 1 && !useIframeFallback && (
                <div className="hidden md:flex items-center gap-1 mr-2 px-1.5 py-1 rounded-lg border text-xs font-mono font-medium bg-slate-800/40 border-slate-700/60">
                  {Array.from({ length: numPages }).map((_, idx) => {
                    const page = idx + 1;
                    const isActive = currentPageInView === page;
                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => scrollToPage(page)}
                        className={`px-2 py-0.5 rounded text-xs transition-colors ${
                          isActive
                            ? 'bg-gradient-to-r from-[#2196F3] to-[#F0445B] text-white shadow-xs font-bold'
                            : isLight
                              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                              : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
                        }`}
                        title={`Jump to page ${page}`}
                      >
                        P.{page}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Zoom Controls (hidden on fallback) */}
              {!useIframeFallback && (
                <div className={`hidden sm:flex items-center border rounded-lg p-0.5 ${
                  isLight ? 'bg-slate-200/70 border-slate-300' : 'bg-slate-800/60 border-slate-700/60'
                }`}>
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    title="Zoom Out"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="px-2 py-1 text-[11px] font-mono text-slate-400 hover:text-white rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    title="Fit to Width / Reset Zoom"
                  >
                    {Math.round(scale * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    title="Zoom In"
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                  </button>
                </div>
              )}

              {/* Optional Download button in viewer header for convenience */}
              <a
                href={data.resumeDownloadUrl || '/resume/Sooraj_KK_Resume.pdf'}
                download={data.resumeFileName || 'Sooraj_KK_Resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border-slate-700'
                }`}
                title="Download original PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#2196F3]" />
                <span className="hidden sm:inline">Download</span>
              </a>

              {/* Clearly visible Close (✕) Button */}
              <button
                type="button"
                onClick={() => setIsResumeModalOpen(false)}
                className="inline-flex items-center justify-center p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Close resume viewer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Viewer Body (Scrollable container for all pages) */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className={`flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-6 flex flex-col items-center ${
              isLight ? 'bg-slate-200/70' : 'bg-[#080d1d]'
            }`}
          >
            {/* Loading state */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
                <Loader2 className="w-8 h-8 text-[#2196F3] animate-spin" />
                <p className={`text-sm font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Loading resume pages...
                </p>
                <p className="text-xs text-slate-400">
                  Displaying high-fidelity multi-page document
                </p>
              </div>
            )}

            {/* Error & fallback state */}
            {error && (
              <div className="w-full max-w-xl mx-auto my-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setUseIframeFallback(true)}
                  className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold text-[11px]"
                >
                  Use Native Frame
                </button>
              </div>
            )}

            {/* Interactive Multi-page Canvas Rendering */}
            {!loading && !useIframeFallback && numPages > 0 && (
              <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-full pb-8">
                {Array.from({ length: numPages }).map((_, idx) => {
                  const pageNumber = idx + 1;
                  return (
                    <div
                      key={pageNumber}
                      ref={(el) => {
                        pageRefs.current[idx] = el;
                      }}
                      className="flex flex-col items-center group"
                    >
                      {/* Page Header Indicator */}
                      <div className="w-full flex items-center justify-between px-2 mb-2 text-[11px] font-mono text-slate-400 max-w-[850px]">
                        <span className="flex items-center gap-1.5 font-semibold text-slate-400">
                          <span className="w-2 h-2 rounded-full bg-[#2196F3]"></span>
                          Page {pageNumber} of {numPages}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                          Scroll to read &bull; Sooraj KK
                        </span>
                      </div>

                      {/* Canvas Card */}
                      <div className={`relative rounded-xl overflow-hidden shadow-2xl transition-all border ${
                        isLight 
                          ? 'bg-white border-slate-300 shadow-slate-400/40' 
                          : 'bg-white border-slate-700 shadow-black/80'
                      }`}>
                        <canvas 
                          className="block max-w-full h-auto cursor-default"
                          aria-label={`Resume Page ${pageNumber}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Embedded Native Frame Fallback */}
            {useIframeFallback && (
              <div className="w-full h-full flex flex-col min-h-[500px]">
                <iframe
                  src={`${data.resumeDownloadUrl || '/resume/Sooraj_KK_Resume.pdf'}#toolbar=1&navpanes=0&scrollbar=1&page=1&view=FitH`}
                  className="w-full flex-1 rounded-xl border border-slate-700 bg-white"
                  title="Sooraj KK Resume PDF Viewer"
                />
              </div>
            )}
          </div>

          {/* Bottom helper bar */}
          <div className={`px-4 sm:px-6 py-2.5 border-t text-xs flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 ${
            isLight
              ? 'bg-white/95 border-slate-200 text-slate-600'
              : 'bg-[#101A33]/95 border-slate-800 text-slate-400'
          }`}>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>All pages loaded from original resume document.</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px]">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">Esc</kbd> or click (✕) to return to portfolio
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
