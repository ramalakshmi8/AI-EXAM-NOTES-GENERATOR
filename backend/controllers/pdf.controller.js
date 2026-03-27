

import PDFDocument from "pdfkit";

// 🔥 VERY IMPORTANT: Clean unwanted AI formatting
const cleanText = (text) => {
  return text
    ?.replace(/\+p\+p\+p/g, "") // remove weird tokens
    ?.replace(/[*#>-]/g, "")   // remove markdown
    ?.replace(/\n{2,}/g, "\n") // fix spacing
    ?.trim();
};

export const pdfDownload = async (req, res) => {
  try {
    const { result } = req.body;

    console.log("PDF BODY:", result); // 🔍 DEBUG

    // 🔥 VERY IMPORTANT: Validate input
    if (!result) {
      return res.status(400).json({ error: "No result provided" });
    }

    // 🔥 VERY IMPORTANT: Normalize data (handles both formats)
    const data = result?.data ? result.data : result;

    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const doc = new PDFDocument({ margin: 50 });

    // 🔥 VERY IMPORTANT: Set headers BEFORE streaming
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamNotesAI.pdf"'
    );

    doc.pipe(res);

    // ================= TITLE =================
    doc.fontSize(20).text("ExamNotes AI", { align: "center" });
    doc.moveDown();

    // ================= IMPORTANCE =================
    // 🔥 VERY IMPORTANT: Fix star rendering
    const starCount = (data?.importance?.match(/⭐/g) || []).length;
    doc.fontSize(14).text(`Importance: ${"★".repeat(starCount) || "N/A"}`);
    doc.moveDown();

    // ================= SUB TOPICS =================
    if (data?.subTopics) {
      doc.fontSize(16).text("Sub Topics");
      doc.moveDown(0.5);

      Object.entries(data.subTopics).forEach(([star, topics]) => {
        doc.fontSize(13).text(`${star} Priority:`);

        topics?.forEach((t) => {
          doc.fontSize(12).text(`• ${cleanText(t)}`); // 🔥 CLEAN TEXT
        });

        doc.moveDown(0.5);
      });
    }

    doc.moveDown();

    // ================= NOTES =================
    if (data?.notes) {
      doc.fontSize(16).text("Notes");
      doc.moveDown(0.5);

      // 🔥 VERY IMPORTANT: Clean text before rendering
      doc.fontSize(12).text(cleanText(data.notes));
    }

    doc.moveDown();

    // ================= REVISION POINTS =================
    if (data?.revisionPoints?.length) {
      doc.fontSize(16).text("Revision Points");
      doc.moveDown(0.5);

      data.revisionPoints.forEach((p) => {
        doc.fontSize(12).text(`• ${cleanText(p)}`); // 🔥 CLEAN TEXT
      });
    }

    doc.moveDown();

    // ================= QUESTIONS =================
    if (data?.questions) {
      doc.fontSize(16).text("Important Questions");
      doc.moveDown(0.5);

      doc.fontSize(13).text("Short Questions");
      data.questions.short?.forEach((q) =>
        doc.fontSize(12).text(`• ${cleanText(q)}`)
      );

      doc.moveDown(0.5);

      doc.fontSize(13).text("Long Questions");
      data.questions.long?.forEach((q) =>
        doc.fontSize(12).text(`• ${cleanText(q)}`)
      );

      doc.moveDown(0.5);

      doc.fontSize(13).text("Diagram Questions");
      doc
        .fontSize(12)
        .text(cleanText(data.questions.diagram) || "N/A");
    }

    // 🔥 VERY IMPORTANT: End stream ONLY once
    doc.end();

  } catch (error) {
    console.error("PDF generation error:", error);

    // 🔥 VERY IMPORTANT: Prevent crash if stream already started
    if (!res.headersSent) {
      return res.status(500).json({ error: "PDF generation failed" });
    }
  }
};

