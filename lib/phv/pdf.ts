// Generuje PDF raportu PHV w przeglądarce. Dane nie opuszczają urządzenia:
// html2canvas i jsPDF działają lokalnie, bez żadnego zapytania sieciowego.

const MARGIN_MM = 12;
const GAP_MM = 4;
const SCALE = 2;

export async function openReportPdf(root: HTMLElement, fileName: string): Promise<void> {
  // Okno trzeba otworzyć od razu w obsłudze kliknięcia, inaczej Safari zablokuje je po generowaniu.
  const win = window.open("", "_blank");

  try {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas-pro"), import("jspdf")]);

    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const contentW = pageW - MARGIN_MM * 2;
    const maxY = pageH - MARGIN_MM;

    let y = MARGIN_MM;
    const blocks = Array.from(root.children).filter((el): el is HTMLElement => el instanceof HTMLElement && el.tagName !== "STYLE");

    for (const block of blocks) {
      const canvas = await html2canvas(block, {
        scale: SCALE,
        backgroundColor: "#ffffff",
        useCORS: true,
        ignoreElements: (el) => el.hasAttribute("data-pdf-hide"),
      });
      if (!canvas.width || !canvas.height) continue;

      const mmPerPx = contentW / canvas.width;
      const blockH = canvas.height * mmPerPx;

      // Blok mieści się na reszcie strony albo na całej nowej stronie: nie dzielimy go.
      if (blockH <= maxY - y || blockH <= pageH - MARGIN_MM * 2) {
        if (blockH > maxY - y) {
          doc.addPage();
          y = MARGIN_MM;
        }
        doc.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", MARGIN_MM, y, contentW, blockH);
        y += blockH + GAP_MM;
        continue;
      }

      // Blok dłuższy niż strona: tniemy na kawałki.
      if (y > MARGIN_MM) {
        doc.addPage();
        y = MARGIN_MM;
      }
      const slicePx = Math.floor((pageH - MARGIN_MM * 2) / mmPerPx);
      for (let top = 0; top < canvas.height; top += slicePx) {
        const h = Math.min(slicePx, canvas.height - top);
        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = h;
        const ctx = slice.getContext("2d");
        if (!ctx) throw new Error("canvas");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, slice.width, slice.height);
        ctx.drawImage(canvas, 0, top, canvas.width, h, 0, 0, canvas.width, h);
        if (top > 0) {
          doc.addPage();
          y = MARGIN_MM;
        }
        doc.addImage(slice.toDataURL("image/jpeg", 0.92), "JPEG", MARGIN_MM, y, contentW, h * mmPerPx);
        y += h * mmPerPx + GAP_MM;
      }
    }

    const url = URL.createObjectURL(doc.output("blob"));
    if (win) {
      win.location.href = url;
    } else {
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    window.setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000);
  } catch (err) {
    win?.close();
    throw err;
  }
}
